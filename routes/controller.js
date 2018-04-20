var request = require('sync-request');
var express = require('express');
var OAuth = require('oauth');
var https = require('https');
var util = require('util');

var router = express.Router();

function getTweets(userName, callback){

  var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    '7z5FBYpvmnKfF06fgJ0JFZehU',
    'oSkWwlWTzSwu2mmQGzJssOkyqWm17rdLeTd5d6fJsS5wZpjzav',
    '1.0A',
    null,
    'HMAC-SHA1'
  );
    
  oauth.get(
    'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='+ userName +'&count=100',
    '985057938086809600-jOaBRNxbJpgNQskx7VTKKzGGKxLnflT', 
    'MAwRyPaVEgtupLwdPypwIXC0H0uxSnSNc91WYfqQHsMH8',       
    function (e, data, res){
      
      var tweets = null
      var status = null
      var error = null

      if (e) {
        console.error(e)
        error = e
        status = 'error'
      } else {
        status = 'ok'
        tweets = JSON.parse(data)
      }

      var result = {
        status: status,
        error: error,
        tweets: tweets,
        userName: userName
      }
      callback(result)      
    });

  }

  router.get('/getTwitterData', function(req, res, next) {

    var userName = req.query.userName

    getTweets(userName, function(data){     
      res.json(data)           
  }) 
})

module.exports = router;
