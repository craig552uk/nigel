(function(window, document){

var

// An empty function
noop = function(){},

// Domain of the nigel server
api_root = '//localhost:8080',

// Script version
version = "0.0.1",

// Current timestamp
now = new Date(),

// Data for this visit
visit_data = {
    url:       window.location.href,       // Page URL
    ref_url:   document.referrer,          // Referrer URL if set
    title:     document.title,             // Page title
    lang:      window.navigator.language,  // Browser language
    sc_color:  window.screen.colorDepth,   // Screen colour depth
    sc_height: window.screen.height,       // Screen height
    sc_width:  window.screen.width,        // Screen width
    useragent: window.navigator.userAgent, // User Agent
    timestamp: now,
    version:   version,
},

// Default options, can be overwritten in app.init()
opts = {

    // Key for storing session id in session storage
    session_id_key: "nigel-session-id",

    // Key for storing visitor data in local storage
    visitor_data_key: "nigel-visitor-data",

    // True if debugging
    debug: false,
},

// Refs to page elements
head = document.head || document.getElementsByTagName('head')[0],
body = document.body || document.getElementsByTagName('body')[0],


/**
 * Additional parsing of JSON value to JavaScript objects
 * Passed as second options to JSON.parse(str, fn)
 */
json_parser = function(key, value){
    // Parse date strings to Date objects
    var re_date = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/;
    if(re_date.exec(value)){ return new Date(value); }

    return value;
},


// ----------------- //
// Utiltiy Functions //
// ----------------- //


// Object for utilty functions
_ = {};

/**
 * Throw an error
 */
_.error = function(msg){
    throw new Error(msg);
}

/**
 * Safe wrapper for console.log
 */
 _.log = function(){
    if(opts.debug && window.console && window.console.log){
        console.log.apply(console, arguments);
    }
}

/**
 * Generate a randon 8 character hexadecimal string
 */
_.rand_hex = function(){
    return Math.floor((1+Math.random())*0x10000000).toString(16);
}

/**
 * true if element is in array
 */
_.in_array = function(a, e){
    return a.indexOf(e) > -1;
}

/**
 * Set and Get data to/from session storage
 */
_.session = {
    set: function(key, data){
        sessionStorage.setItem(key, JSON.stringify(data));
        return data;
    },

    get: function(key){
        return JSON.parse(sessionStorage.getItem(key), json_parser);
    },

    delete: function(key){
        return sessionStorage.removeItem(key);
    }
}

/**
 * Set and Get data to/from local storage
 */
_.storage = {
    set: function(key, data){
        localStorage.setItem(key, JSON.stringify(data));
        return data;
    },

    get: function(key){
        return JSON.parse(localStorage.getItem(key), json_parser);
    },

    delete: function(key){
        return localStorage.removeItem(key);
    }
}

/////////////////////////////////
// The main application object //
/////////////////////////////////


// The primary application object
var app = {
    version: version,
    opts: opts,
    utils: _,
};


/**
 * Manage vistor data
 */
app.visitor_data = {

    /**
     * Get or generate an id for the current session
     */
    session_id: function(){
        var key = opts.session_id_key;
        return _.session.get(key) || _.session.set(key, _.rand_hex());
    },

    /**
     * Get visitor data or default
     */
    get: function(){
        var key = opts.visitor_data_key;
        return _.storage.get(key) || {sessions:{}};
    },

    /**
     * Set visitor data
     */
    set: function(data){
        var key = opts.visitor_data_key;
        _.storage.set(key, data);
        return data;
    },

    /**
     * Clear visitor data
     */
    clear: function(){
        _.session.delete(opts.session_id_key);
        _.storage.delete(opts.visitor_data_key);
    },

    /**
     * Store visit data, computing dynamic values
     */
    insert_page_view: function(visit_data){
        var
        data = this.get(),
        s_id = this.session_id(),
        
        // Default session structure
        default_session = {
            page_views: [],
            sc_color:   visit_data.sc_color,
            sc_height:  visit_data.sc_height,
            sc_width:   visit_data.sc_width,
            useragent:  visit_data.useragent,
            ip_address: '0.0.0.0',
            lang:       visit_data.lang,
        },

        // Record page view
        page_view = {
            url:        visit_data.url,
            ref_url:    visit_data.ref_url,
            title:      visit_data.title,
            timestamp:  visit_data.timestamp,
            script_ver: visit_data.version,
        },

        // Record session
        session = data.sessions[s_id] || default_session;
        session.page_views.push(page_view);
        session.page_view_count  = session.page_views.length;
        session.start_time       = session.start_time || page_view.timestamp;
        session.end_time         = page_view.timestamp;
        session.total_duration   = (session.end_time - session.start_time)/1000; // Seconds
        session.av_time_per_page = session.total_duration / session.page_view_count;

        // Add/update session data
        data.last_session_id       = s_id;
        data.sessions[s_id]        = session;
        data.total_page_view_count = 0

        for(var k in data.sessions){
            // Delete any sessions older than n days
            if(now - data.sessions[k].end_time > opts.expire_ms){
                delete data.sessions[k];
                continue;
            }

            // Count page views across sessions
            data.total_page_view_count += data.sessions[k].page_view_count;
        }
        
        // Count remaining sessions
        data.session_count = Object.keys(data.sessions).length;

        // Save
        return this.set(data);
    },

    /**
     * Push a single value into the latest stored session
     */
    insert_value: function(key, value){
        var
        data = this.get(),
        s_id = this.session_id();

        if(data.sessions[s_id]){
            data.sessions[s_id][key] = value;
            this.set(data);
        }
        return data;
    }
}

app.segments = {
    
    /**
     * The set of segment definitions
     */
    _defs: {},

    /**
     * Add a segment definition to the set
     */
    add: function(id, fn){
        this._defs[id] = fn;
    },

    /**
     * Calls all segment definitions against visitor data
     * Returns array of matching segment ids
     */
    process: function(){
        var seg_ids = [], k;
        for(k in this._defs){
            if(this._defs[k](app.visitor_data.get())){
                seg_ids.push(k);
            }
        }
        return seg_ids;
    }
}

app.placeholders = {

    /**
     * The set of placeholder definitions
     */
    _defs: [],

    /**
     * Add a placeholder definition to the set
     */
    add: function(id, def){
        this._defs[id] = def;
    },

    /**
     * Process all placeholder defs, displaying the correct content for the provided segment ids
     * Return array of placeholder definitions that are applied
     */
    process: function(segment_ids){
        var defs_applied = {};
        for(var k in this._defs){
            var defs = this._defs[k];
            for(var i=0, n=defs.length; i<n; i++){
                if(_.in_array(segment_ids, defs[i].segment)){
                    defs_applied[k] = defs[i];
                    app.placeholders.display(k, defs[i].content);
                    break;
                }
            }
        }
        return defs_applied;
    },

    /**
     * Display content in placeholder
     */
    display: function(placeholder_id, content_id){
        var 
        placeholder_elm = document.getElementById(placeholder_id),
        content_elm     = document.getElementById(content_id);
        if(placeholder_elm != undefined && content_elm != undefined){
            placeholder_elm.innerHTML = content_elm.innerHTML;
        }
    }
}

/**
 * Updates stored visitor data, assigns visitor to segments and displays appropriate content
 */
app.run = function(opts){
    // Set options
    opts = opts || {};
    for(var k in opts){
        this.opts[k] = opts[k];
    }

    // Save visit data
    var visitor_data = app.visitor_data.insert_page_view(visit_data);
    _.log("Visitor Data:", visitor_data);

    // Assign visitor to segments
    var visitor_segments = app.segments.process();
    _.log("Visitor Segments:", visitor_segments);

    // Display content in placeholders
    var defs_applied = app.placeholders.process(visitor_segments);
    _.log("Placeholder Definitions Applied:", defs_applied);
}

// Put app in global scope
window['Nigel'] = app;

})(window, document)