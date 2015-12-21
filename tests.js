
// Element inwhich to create test DOM structures
var fixture = document.getElementById("qunit-fixture");

QUnit.test("Test Default Assertions", function(assert){
    var done = assert.async(1);
    setTimeout(function(){
        done(); 
    }, 10);

    assert.deepEqual([1,2,3], [1,2,3], "Test assert.deepEqual()");
    assert.notDeepEqual([3,2,1], [1,2,3], "Test assert.notDeepEqual()");

    assert.equal(1, "1",  "Test assert.equal()");
    assert.notEqual(1, 2, "Test assert.notEqual()");

    assert.ok(true, "Test assert.ok()");
    assert.notOk(false, "Test assert.notOk()");

    assert.propEqual({a:'A', b:'B'}, {a:'A', b:'B'}, "Test assert.propEqual()");
    assert.notPropEqual({a:'A', b:'B'}, {a:'a', b:'b'}, "Test assert.notPropEqual()");

    assert.strictEqual(1, 1, "Test assert.strictEqual()");
    assert.notStrictEqual(1, "1", "Test assert.notStrictEqual()");

    assert.throws(function(){ throw new Error("foo")}, "Test assert.throws()")
    assert.throws(function(){ throw new Error("foo")}, Error, "Test assert.throws()")
});


QUnit.test("Test Browser API Dependencies", function(assert){

    // Document
    assert.isObject(document, "document exists");
    assert.hasProperty('referrer', document, "document.referrer exists");
    assert.hasProperty('title', document, "document.title exists");
    assert.isString(document.referrer, "document.referrer must be string");
    assert.isString(document.title, "document.title must be string");
    assert.isFunction(document.getElementsByTagName, "document.getElementsByTagName() exists");
    assert.isFunction(document.createElement, "document.createElement() exists");
    
    // Window
    assert.isObject(window, "window exists");
    assert.hasProperty('href', window.location, "window.location.href exists");
    assert.hasProperty('language', window.navigator, "window.navigator.language exists");
    assert.hasProperty('colorDepth', window.screen, "window.screen.colorDepth exists");
    assert.hasProperty('height', window.screen, "window.screen.height exists");
    assert.hasProperty('width', window.screen, "window.screen.width exists");
    assert.hasProperty('userAgent', window.navigator, "window.navigator.userAgent exists");
    assert.isString(window.location.href, "window.location.href must be string");
    assert.isString(window.navigator.language, "window.navigator.language must be string");
    assert.isString(window.navigator.userAgent, "window.navigator.userAgent must be string");
    assert.isNumber(window.screen.colorDepth, "window.screen.colorDepth must be number");
    assert.isNumber(window.screen.height, "window.screen.height must be number");
    assert.isNumber(window.screen.width, "window.screen.width must be number");

    // Session Storage
    assert.isObject(sessionStorage, "sessionStorage exists");
    assert.isFunction(sessionStorage.setItem, "sessionStorage.setItem() exists");
    assert.isFunction(sessionStorage.getItem, "sessionStorage.getItem() exists");
    
    // Local Storage
    assert.isObject(localStorage, "localStorage exists");
    assert.isFunction(localStorage.setItem, "localStorage.setItem() exists");
    assert.isFunction(localStorage.getItem, "localStorage.getItem() exists");

    // JSON
    assert.isObject(JSON, "JSON exists");
    assert.isFunction(JSON.stringify, "JSON.stringify() exists");
    assert.isFunction(JSON.parse, "JSON.parse() exists");

    // Math
    assert.isObject(Math, "Math exists");
    assert.isFunction(Math.floor, "Math.floor() exists");
    assert.isFunction(Math.random, "Math.random() exists");

    // Date
    assert.isFunction(Date, "Date() exists");

    // Object
    assert.isFunction(Object, "Object() exists");
    assert.isFunction(Object.keys, "Object.keys exists");

    // Array
    assert.hasProperty('length', [], "Array.length exists");
    assert.isFunction([].indexOf, "Array.indexOf() exists");
    assert.isFunction([].push, "Array.push() exists");

    // String
    assert.isNumber("".length, "String.length exists");
    assert.isFunction("".indexOf, "String.indexOf() exists");
    assert.isFunction("".match, "String.match() exists");
    assert.isFunction("".startsWith, "String.startsWith() exists");
    assert.isFunction("".endsWith, "String.endsWith() exists");

    // DOM Node
    assert.isFunction(Node, "Node constructor exists");
    assert.hasProperty('ELEMENT_NODE', Node, "Node.ELEMENT_NODE exists");

    // DOM Node instance
    var node = document.getElementsByTagName('head')[0];
    assert.hasProperty('nodeType', node, "node.nodeType exists");
    assert.hasProperty('firstChild', node, "node.firstChild exists");
    assert.hasProperty('nextSibling', node, "node.nextSibling exists");
    assert.hasProperty('getAttribute', node, "node.getAttribute exists");
    assert.hasProperty('appendChild', node, "node.appendChild exists");
});


QUnit.test("Test Application Global Object", function(assert){
    assert.isObject(Nigel, "App object exists");
    assert.isString(Nigel.version, "Nigel.version must be string");
    assert.isObject(Nigel.utils, "Nigel.utils exists");
    assert.isObject(Nigel.visitor_data, "Nigel.visitor_data exists");
});


QUnit.test("Test Nigel.opts", function(assert){
    assert.isObject(Nigel.opts, "Nigel.opts exists");
    assert.hasProperty('session_id_key', Nigel.opts, "Nigel.opts.session_id_key exists");
    assert.hasProperty('visitor_data_key', Nigel.opts, "Nigel.opts.visitor_data_key exists");
    assert.hasProperty('debug', Nigel.opts, "Nigel.opts.debug exists");
});


QUnit.test("Test Nigel.utils.error()", function(assert){
    assert.isFunction(Nigel.utils.error, "Nigel.utils.error() exists");

    assert.throws(function(){
        Nigel.utils.error("foo");
    }, Error, "Nigel.utils.error() throws Error");

    assert.throws(function(){
        Nigel.utils.error("foo");
    }, /foo/, "Nigel.utils.error() throws Error with custom message");
});


QUnit.test("Test Nigel.utils.in_array()", function(assert){
    assert.isFunction(Nigel.utils.in_array, "Nigel.utils.in_array() exists");
    
    var arr = [1, 2, true, "foo", undefined];
    assert.ok(Nigel.utils.in_array(arr, 1),         "Nigel.utils.in_array() returns true if element in array");
    assert.ok(Nigel.utils.in_array(arr, true),      "Nigel.utils.in_array() returns true if element in array");
    assert.ok(Nigel.utils.in_array(arr, "foo"),     "Nigel.utils.in_array() returns true if element in array");
    assert.ok(Nigel.utils.in_array(arr, undefined), "Nigel.utils.in_array() returns true if element in array");

    assert.notOk(Nigel.utils.in_array([], 1),         "Nigel.utils.in_array() returns false if element not in array");
    assert.notOk(Nigel.utils.in_array([], true),      "Nigel.utils.in_array() returns false if element not in array");
    assert.notOk(Nigel.utils.in_array([], "foo"),     "Nigel.utils.in_array() returns false if element not in array");
    assert.notOk(Nigel.utils.in_array([], undefined), "Nigel.utils.in_array() returns false if element not in array");
});


QUnit.test("Test Nigel.utils.rand_hex()", function(assert){
    assert.isFunction(Nigel.utils.rand_hex, "Nigel.utils.rand_hex() exists");
    
    assert.isString(Nigel.utils.rand_hex(), "Nigel.utils.rand_hex() returns string");
    assert.equal(Nigel.utils.rand_hex().length, 8, "Nigel.utils.rand_hex() returns an 8 character string");
    assert.notEqual(Nigel.utils.rand_hex(), Nigel.utils.rand_hex(), "Nigel.utils.rand_hex() returns different values on repeat calls");
});


QUnit.test("Test Nigel.utils.sessionStorage Functions", function(assert){
    assert.isObject(Nigel.utils.session, "Nigel.utils.session exists");
    assert.isFunction(Nigel.utils.session.set, "Nigel.utils.session.set() exists");
    assert.isFunction(Nigel.utils.session.get, "Nigel.utils.session.get() exists");
    
    var key = 'test-123', data = {a:'a', b:'b'};

    // Remove item if it exists
    sessionStorage.removeItem(key);

    assert.deepEqual(Nigel.utils.session.set(key, data), data, "Nigel.utils.session.set() retuns submitted data");
    assert.deepEqual(sessionStorage.getItem(key), JSON.stringify(data), "Nigel.utils.session.set() stores data as JSON");
    assert.deepEqual(Nigel.utils.session.get(key), data, "Nigel.utils.session.get() returns stored data");

    // Clean up
    Nigel.utils.session.delete(key);
    assert.isNull(Nigel.utils.session.get(key), "Nigel.utils.session.get() returns null if nothing set");
});


QUnit.test("Test Nigel.utils.localStorage Functions", function(assert){
    assert.isObject(Nigel.utils.storage, "Nigel.utils.storage exists");
    assert.isFunction(Nigel.utils.storage.set, "Nigel.utils.storage.set() exists");
    assert.isFunction(Nigel.utils.storage.get, "Nigel.utils.storage.get() exists");
    
        var key = 'test-123', data = {a:'a', b:'b'};

    // Remove item if it exists
    localStorage.removeItem(key);

    assert.deepEqual(Nigel.utils.storage.set(key, data), data, "Nigel.utils.storage.set() retuns submitted data");
    assert.deepEqual(localStorage.getItem(key), JSON.stringify(data), "Nigel.utils.storage.set() stores data as JSON");
    assert.deepEqual(Nigel.utils.storage.get(key), data, "Nigel.utils.storage.get() returns stored data");

    // Clean up
    Nigel.utils.storage.delete(key);
    assert.isNull(Nigel.utils.storage.get(key), "Nigel.utils.storage.get() returns null if nothing set");
});


QUnit.test("Test Nigel.visitor_data.session_id()", function(assert){
    assert.isFunction(Nigel.visitor_data.session_id, "Nigel.visitor_data.session_id() exists");

    assert.isString(Nigel.visitor_data.session_id(), "Nigel.visitor_data.session_id() returns string");
    assert.equal(Nigel.visitor_data.session_id(), Nigel.visitor_data.session_id(), "Nigel.visitor_data.session_id() repeat calls return the same value");

    var old_id = Nigel.visitor_data.session_id();
    sessionStorage.removeItem(Nigel.opts.session_id_key);
    var new_id = Nigel.visitor_data.session_id();
    assert.notEqual(old_id, new_id, "Nigel.visitor_data.session_id() generates new id if session storage is empty");
});


QUnit.test("Test Nigel.visitor_data.get(), .set() and .delete()", function(assert){
    assert.isFunction(Nigel.visitor_data.get, "Nigel.visitor_data.get() exists");
    assert.isFunction(Nigel.visitor_data.set, "Nigel.visitor_data.set() exists");

    var key = Nigel.opts.visitor_data_key;

    Nigel.utils.storage.delete(key);
    assert.deepEqual(Nigel.visitor_data.get(), {sessions:{}}, "Nigel.visitor_data.get() returns default object if no data stored");

    var data = {sessions:{a:1, b:2, c:3}, foo:'bar'};
    assert.deepEqual(Nigel.visitor_data.set(data), data, "Nigel.visitor_data.set() returns submitted data");
    assert.deepEqual(localStorage.getItem(key), JSON.stringify(data), "Nigel.visitor_data.set() stored serialised data in local storage");
    assert.deepEqual(Nigel.visitor_data.get(), data, "Nigl.visitor_data.get() returns stored data");

    var session_id = Nigel.visitor_data.session_id();
    Nigel.visitor_data.clear();
    assert.notEqual(session_id, Nigel.visitor_data.session_id(), "Nigel.visitor_data.clear() resets session id in session storage");
    assert.deepEqual(Nigel.visitor_data.get(), {sessions:{}}, "Nigel.visitor_data.clear() resets visitor data in local storage");
});


QUnit.test("Test Nigel.visitor_data.insert_page_view()", function(assert){
    assert.isFunction(Nigel.visitor_data.insert_page_view, "Nigel.visitor_data.insert_page_view() exists");

    // Clear visitor data
    localStorage.removeItem(Nigel.opts.visitor_data_key);

    /* Generate mock pageview data */
    var pv_count = 0,
    mock_page_view = function(){
        // Sequential timestamps for each function call plus some random variance
        var ts = new Date();
        ts.setSeconds(ts.getSeconds() - 600 + (pv_count * 60) + Math.floor(Math.random()*60));

        return {
            url:       window.location.href,       // Page URL
            ref_url:   document.referrer,          // Referrer URL if set
            title:     document.title,             // Page title
            lang:      window.navigator.language,  // Browser language
            sc_color:  window.screen.colorDepth,   // Screen colour depth
            sc_height: window.screen.height,       // Screen height
            sc_width:  window.screen.width,        // Screen width
            useragent: window.navigator.userAgent, // User Agent
            timestamp: ts,
            version:   Nigel.version,
        };
    };

    // Insert page view into visitor data and store in pvs array
    var pvs = [];
    for(var i=0; i<5; i++){
        pvs.push(mock_page_view());
        Nigel.visitor_data.insert_page_view(pvs[i]);
    }

    // Get stored data
    var visitor_data = Nigel.visitor_data.get();

    assert.hasProperty('sessions', visitor_data, "visitor_data.sessions exists");
    assert.isObject(visitor_data.sessions, "visitor_data.sessions is object");
    
    assert.hasProperty('session_count', visitor_data, "visitor_data.session_count exists");
    assert.isNumber(visitor_data.session_count, "visitor_data.session_count is number");
    assert.equal(visitor_data.session_count, Object.keys(visitor_data.sessions).length, "visitor_data.session_count is number of stored sessions");
    
    assert.hasProperty('last_session_id', visitor_data, "visitor_data.last_session_id exists");
    assert.isString(visitor_data.last_session_id, "visitor_data.last_session_id is string");
    assert.hasProperty(visitor_data.last_session_id, visitor_data.sessions, "visitor_data.last_session_id is key in sessions object");

    assert.hasProperty('total_page_view_count', visitor_data, "visitor_data.total_page_view_count exists");
    assert.isNumber(visitor_data.total_page_view_count, "visitor_data.total_page_view_count is number");


    // Assert session data structure
    for(var i in visitor_data.sessions){
        var session = visitor_data.sessions[i];

        assert.hasProperty('page_views', session, "session.page_views exists");
        assert.isArray(session.page_views, "session.page_views is array");

        assert.hasProperty('page_view_count', session, "session.page_view_count exists");
        assert.isNumber(session.page_view_count, "session.page_view_count is number");
        assert.equal(session.page_view_count, session.page_views.length, "session.page_view_count is number of page views in session");
        
        assert.hasProperty('start_time', session, "session.start_time exists");
        assert.isDate(session.start_time, "session.start_time is date");
        
        assert.hasProperty('end_time', session, "session.end_time exists");
        assert.isDate(session.end_time, "session.end_time is date");
        
        assert.hasProperty('total_duration', session, "session.total_duration exists");
        assert.isNumber(session.total_duration, "session.total_duration is number");
        assert.equal(session.total_duration, (session.end_time-session.start_time)/1000, "session.total_duration is difference between start and end timestamps");

        assert.hasProperty('av_time_per_page', session, "session.av_time_per_page exists");
        assert.isNumber(session.av_time_per_page, "session.av_time_per_page is number");
        assert.equal(session.av_time_per_page, session.total_duration / session.page_view_count, "session.av_time_per_page is mean time per page in seconds");

        assert.hasProperty('sc_color', session, "session.sc_color exists");
        assert.isNumber(session.sc_color, "session.sc_color is number");
        assert.equal(session.sc_color, window.screen.colorDepth, "session.sc_color is screen color depth");
        
        assert.hasProperty('sc_height', session, "session.sc_height exists");
        assert.isNumber(session.sc_height, "session.sc_height is number");
        assert.equal(session.sc_height, window.screen.height, "session.sc_height is screen height");
        
        assert.hasProperty('sc_width', session, "session.sc_width exists");
        assert.isNumber(session.sc_width, "session.sc_width is number");
        assert.equal(session.sc_width, window.screen.width, "session.sc_width is screen width");
        
        assert.hasProperty('useragent', session, "session.useragent exists");
        assert.isString(session.useragent, "session.useragent is string");
        assert.equal(session.useragent, window.navigator.userAgent, "session.useragent is device user agent string");
        
        assert.hasProperty('ip_address', session, "session.ip_address exists");
        assert.isString(session.ip_address, "session.ip_address is string");
        assert.isNotNull(/^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/.exec(session.ip_address), "session.ip_address is valid ip address (test ipv4 only)");
        
        assert.hasProperty('lang', session, "session.lang exists");
        assert.isString(session.lang, "session.lang is string");
        assert.equal(session.lang, window.navigator.language, "session.lang is device language string");

        // Assert page view data structure
        for(var j=0; j<session.page_views.length; j++){
            var page_view = session.page_views[j];
            
            assert.hasProperty('url', page_view, "page_view.url exists");
            assert.isString(page_view.url, "page_view.url is string");
            assert.equal(page_view.url, window.location.href, "page_view.url is page url");
            
            assert.hasProperty('ref_url', page_view, "page_view.ref_url exists");
            assert.isString(page_view.ref_url, "page_view.ref_url is string");
            assert.equal(page_view.ref_url, document.referrer, "page_view.ref_url is page referral url");
            
            assert.hasProperty('title', page_view, "page_view.title exists");
            assert.isString(page_view.title, "page_view.title is string");
            assert.equal(page_view.title, document.title, "page_view.title is page title");
            
            assert.hasProperty('timestamp', page_view, "page_view.timestamp exists");
            assert.isDate(page_view.timestamp, "page_view.timestamp is date");
            
            assert.hasProperty('script_ver', page_view, "page_view.script_ver exists");
            assert.isString(page_view.script_ver, "page_view.script_ver is string");
            assert.equal(page_view.script_ver, Nigel.version, "page_view.script_ver is Nigel script version");
        }
    }
});


QUnit.test("Test Nigel.visitor_data.insert_value()", function(assert){
    assert.isFunction(Nigel.visitor_data.insert_value, "Nigel.visitor_data.insert_value() exists");

    Nigel.visitor_data.insert_value('ip_address', '127.0.0.1');

    var data = Nigel.visitor_data.get();
    var s_id = Nigel.visitor_data.session_id();

    assert.equal(data.sessions[s_id].ip_address, '127.0.0.1');
});


QUnit.test("Test Nigel.segments", function(assert){
    assert.isObject(Nigel.segments, "Nigel.segments exists");
    assert.isObject(Nigel.segments._defs, "Nigel.segments._defs exists");
    assert.isFunction(Nigel.segments.add, "Nigel.segments.add() exists");
    assert.isFunction(Nigel.segments.process, "Nigel.segments.process() exists");
    
    Nigel.segments.add('foo', function(){ return true; })
    Nigel.segments.add('bar', function(){ return false; })

    assert.hasProperty('foo', Nigel.segments._defs);
    assert.hasProperty('bar', Nigel.segments._defs);
    assert.isFunction(Nigel.segments._defs.foo, "Nigel.segments.add() stores function");
    assert.isFunction(Nigel.segments._defs.bar, "Nigel.segments.add() stores function");
    assert.ok(Nigel.segments._defs.foo(), "Nigel.segments.add() stores correct function");
    assert.notOk(Nigel.segments._defs.bar(), "Nigel.segments.add() stores correct function");

    assert.deepEqual(['foo'], Nigel.segments.process());
});


QUnit.test("Test Nigel.placeholders", function(assert){
    assert.isObject(Nigel.placeholders, "Nigel.placeholders exists");
    assert.isObject(Nigel.placeholders._defs, "Nigel.placeholders._defs exists");
    assert.isFunction(Nigel.placeholders.add, "Nigel.placeholders.add() exists");
    assert.isFunction(Nigel.placeholders.process, "Nigel.placeholders.process() exists");
    assert.isFunction(Nigel.placeholders.display, "Nigel.placeholders.display() exists");

    // Add dummy placeholders to DOM
    fixture.innerHTML = fixture.innerHTML + '<div id="ph-1">Default 1</div>';
    fixture.innerHTML = fixture.innerHTML + '<div id="ph-2">Default 2</div>';
    fixture.innerHTML = fixture.innerHTML + '<div id="ph-3">Default 3</div>';

    // Add dummy content to DOM
    fixture.innerHTML = fixture.innerHTML + '<div id="con-1">Content 1</div>';
    fixture.innerHTML = fixture.innerHTML + '<div id="con-2">Content 2</div>';
    
    // Define placeholders
    Nigel.placeholders.add('ph-1', [
        {'segment':"foo", 'content':"con-1"},
    ]);
    Nigel.placeholders.add('ph-2', [
        {'segment':"bar", 'content':"con-2"},
    ]);
    Nigel.placeholders.add('ph-3', [
        {'segment':"foo", 'content':"con-1"},
        {'segment':"bar", 'content':"con-2"},
    ]);

    // Process placeholders
    var r = Nigel.placeholders.process(['foo']);
    assert.deepEqual(r['ph-1'], {'segment':"foo", 'content':"con-1"}, "Nigel.placeholders.process() returns correct content");
    assert.deepEqual(r['ph-3'], {'segment':"foo", 'content':"con-1"}, "Nigel.placeholders.process() returns correct content");
    assert.equal(document.getElementById('ph-1').innerHTML, "Content 1", "Nigel.placeholders.display() sets correct content");
    assert.equal(document.getElementById('ph-2').innerHTML, "Default 2", "Nigel.placeholders.display() sets correct content");
    assert.equal(document.getElementById('ph-3').innerHTML, "Content 1", "Nigel.placeholders.display() sets correct content");

    // Reset content
    document.getElementById('ph-1').innerHTML = "Default 1";
    document.getElementById('ph-2').innerHTML = "Default 2";
    document.getElementById('ph-3').innerHTML = "Default 3";

    // Process placeholders again
    var r = Nigel.placeholders.process(['bar']);
    console.log(r);
    assert.deepEqual(r['ph-2'], {'segment':"bar", 'content':"con-2"}, "Nigel.placeholders.process() returns correct content");
    assert.deepEqual(r['ph-3'], {'segment':"bar", 'content':"con-2"}, "Nigel.placeholders.process() returns correct content");
    assert.equal(document.getElementById('ph-1').innerHTML, "Default 1", "Nigel.placeholders.display() sets correct content");
    assert.equal(document.getElementById('ph-2').innerHTML, "Content 2", "Nigel.placeholders.display() sets correct content");
    assert.equal(document.getElementById('ph-3').innerHTML, "Content 2", "Nigel.placeholders.display() sets correct content");
});