Nigel
=====

Nigel is a small, light, *respectful* Online Personalisation Engine.

Online Personalisation is a technique for displaying different page content (messages, images, adverts etc.) to visitors based upon their behaviour on a web site.

Most online personalisation engines follow the same model: Collect every scrap of a visitor's data in a big central database, process it on the server and send the results back to the visitor. While this *may* be technically efficient (I don't necacerily think it is), recent years have highlighted how these large databases of data are open to abuse by surveilance agencies and regularly targeted by criminal hackers.

Nigel is different.

Unlike every other behaviour driven engine out there, Nigel does not store your data in a central database where it can be abused/stolen. Visitor data is only ever collected in the browser's local storage, never anywhere else.

This is safer for everyone involved.


How To Use
----------

Personalisation is composed of three parts:

* Segments - Site visitors may be assigned to none, one or more Segments depending upon their behaviour on the site
* Content - The Content to display
* Placeholders - Sections of the page that may display different Content to visitors in different Segments

Segments are defined by specifying a name and a test function. If the test function returns true, the visitor is assigned to the segment, if false they are not. The complete set of visitor data (see below) is passed to the test function, so we can define segments against it.

```JavaScript
// Returning visitors have more than one session
Nigel.segments.add("returning-visitor", function(d){
    return d.session_count > 1;
});
```

Content is regular mark-up defined within `script` tags. It remains "hidden" until displayed in a placeholder.

```HTML
<!-- Welcome message for returning visitors -->
<script id="msg-returning-visitor" type="text/x-nigel-template">
    <h1>Hello Repeat Visitor</h1>
</script>
```

Placeholders are defined by specifying the id of an element in the page and an ordered array of mappings between segments and content. If a visitor if assigned to a segment, the corresponding content is displayed in the placeholder. If a visitor is assigned to multiple segments, the content corresponding to the first matching segment is displayed. If a visitor is assigned to no matching segments the existing content in the placeholder is displayed by default. The value for `segment` must match a defined segment and the value for `content` must match the id of a content element.

```HTML
<!-- Welcome message placeholder, default message for new visitors -->
<div id="welcome-message">
    <h1>Hello New Visitor</h1>
</div>
```

```JavaScript
// Personalise welcome message to returning visitors
Nigel.placeholders.add("welcome-message", [
    {'segment':"returning-visitor", 'content':"msg-returning-visitor"},
]);
```

See `demo.html` for a basic working example.


Visitor Data
------------

Visitor data is stored in a three-tiered structure. To view the currently stored data in your browser console run `Nigel.visitor_data.get()` or look in the Local Storage section of your developer tools.

### Top-Level Object

```JSON
{
  "sessions":{ ... },
  "last_session_id":"14a2133d",
  "total_page_view_count":3,
  "session_count":2
}
```

* `sessions` - An object, where each key is a session id and each item is a `session` object.
* `last_session_id`  - The id of the last active session. Data is appended to this session if it is still active, if not a new session is created.
* `session_count` - The total number of sessions for this visitor.
* `total_page_view_count` - The total number of page views across all sessions.

### A Session Object

```JSON
{
  "page_views":[ ... ],
  "sc_color":24,
  "sc_height":1080,
  "sc_width":1920,
  "useragent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36",
  "lang":"en-GB",
  "page_view_count":1,
  "start_time":"2015-12-21T14:44:06.113Z",
  "end_time":"2015-12-21T14:44:06.113Z",
  "total_duration":0,
  "av_time_per_page":0
}
```

* `page_views` - An array of `page_view` objects
* `sc_color` - The screen colour
* `sc_height` - The screen height
* `sc_width` - The screen width
* `useragent` - The User Agent string
* `lang` - The language ISO code
* `page_view_count` - The total number of page views in this session
* `start_time` - The timestamp of the first page view in the session
* `end_time` - The timestamp of the last page view in the session
* `total_duration` - The duration of the session (`end_time - start_time`)
* `av_time_per_page` - The average time per page for the session (`total_duration / page_view_count`)

### A Page View Object

```JSON
{
  "url":"http://localhost:8000/demo.html",
  "ref_url":"",
  "title":"Document",
  "timestamp":"2015-12-21T14:44:06.113Z",
  "script_ver":"0.0.1"
}
```

* `url` - The full URL of the page
* `ref_url` - The URL of the referral page (if any)
* `title` - The title of the page
* `timestamp` - The time the page was viewed
* `script_ver` - The version of the Nigel script at the time the page was viewed


Tests
-----

Tests use QUnit and can be run by loading `tests.html` in a browser.