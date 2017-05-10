var request = require('request');


var jsdom = require("jsdom");
var window = jsdom.jsdom().defaultView;


var qs = require('querystring')
  , oauth =
    { callback: 'http://mysite.com/callback/'
    , consumer_key: "MQpJ97uWPyDn3qIskdIsBbaWI"
    , consumer_secret: "TnUga0FFB4Ht8ranl4gox4xMFeDhqkX6Wp9L3UxWK8JX67tTdA"
    };


request.get({url:'https://api.twitter.com/1.1/search/tweets.json?q=%23karaokeRoulette&result_type=recent', oauth:oauth}, 
  function (e, r, body) {

    console.dir(JSON.parse(body), {colors:true});

})




jsdom.env(
  '<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom!</a></p>',
  ["http://code.jquery.com/jquery.js"],
  function (err, window) {
    console.log("contents of a.the-link:", window.$("a.the-link").text());
  }
);
