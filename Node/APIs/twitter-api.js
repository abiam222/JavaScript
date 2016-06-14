var request = require('request');

// var options = {
//   url: 'https://api.twitter.com/1.1/friends/ids.json',
//   qs: {
//     user_id: '185918461',

//   }
// }




// request(options, function(error, response, body) {
//   if (!error && response.statusCode == 200) {
//   //  console.log(body) // Show the HTML for the Google homepage.
//     console.dir(JSON.parse(body), {colors:true});
//   } else {
//     console.log( body );
//   }
// })



// OAuth1.0 - 3-legged server side flow (Twitter example) 
// step 1 
var qs = require('querystring')
  , oauth =
    { callback: 'http://mysite.com/callback/'
    , consumer_key: KEY
    , consumer_secret: KEY
    }
  , url = 'https://api.twitter.com/oauth/request_token'
  ;
request.get({url:'https://api.twitter.com/1.1/friends/ids.json?user_id=185918461&count=10', oauth:oauth}, function (e, r, body) {
  // Ideally, you would take the body in the response 
  // and construct a URL that a user clicks on (like a sign in button). 
  // The verifier is only available in the response after a user has 
  // verified with twitter that they are authorizing your app. 
    console.dir(JSON.parse(body), {colors:true});
  // step 2 
  // var req_data = qs.parse(body)
  // var uri = 'https://api.twitter.com/oauth/authenticate'
  //   + '?' + qs.stringify({oauth_token: req_data.oauth_token})
  // // redirect the user to the authorize uri 
 
  // // step 3 
  // // after the user is redirected back to your server 
  // var auth_data = qs.parse(body)
  //   , oauth =
  //     { consumer_key: 'ulfJOE44qQBgWFKGLLtbu0vss'
  //     , consumer_secret: 'tfZq9uLoPdoQ2X9Wccc9zeu6hfs6bxFvM4VzheE06rlYQLPqlX'
  //     , token: auth_data.oauth_token
  //     , token_secret: req_data.oauth_token_secret
  //     , verifier: auth_data.oauth_verifier
  //     }
  //   , url = 'https://api.twitter.com/oauth/access_token'
  //   ;
  // request.post({url:url, oauth:oauth}, function (e, r, body) {
  //   // ready to make signed requests on behalf of the user 
  //   var perm_data = qs.parse(body)
  //     , oauth =
  //       { consumer_key: 'ulfJOE44qQBgWFKGLLtbu0vss'
  //       , consumer_secret: 'tfZq9uLoPdoQ2X9Wccc9zeu6hfs6bxFvM4VzheE06rlYQLPqlX'
  //       , token: perm_data.oauth_token
  //       , token_secret: perm_data.oauth_token_secret
  //       }
  //     , url = 'https://api.twitter.com/1.1/users/show.json'
  //     , qs =
  //       { screen_name: perm_data.screen_name
  //       , user_id: perm_data.user_id
  //       }
  //     ;
  //   request.get({url:url, oauth:oauth, qs:qs, json:true}, function (e, r, user) {
  //     console.log(user)
  //   })
  // })
})