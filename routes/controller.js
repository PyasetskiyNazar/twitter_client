var request = require('sync-request');
var express = require('express');
var oauth = require('oauth');
var https = require('https');
var util = require('util');

var router = express.Router();

function getTweets(userName, callback){

//  callback([])

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
    'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='+ userName +'&count=200',
    '985057938086809600-jOaBRNxbJpgNQskx7VTKKzGGKxLnflT', 
    'MAwRyPaVEgtupLwdPypwIXC0H0uxSnSNc91WYfqQHsMH8',       
    function (e, data, res){
      
      if (e) console.error(e)
      
      var tweets = JSON.parse(data)
  
      var result = {
        status: 'ok',
        error: null,
        tweets: tweets,
        userName: userName
      }

      callback(tweets)      
    });

}

router.get('/getTwitterData', function(req, res, next) {

  var userName = req.query.userName

  getTweets(userName, function(tweets){
    res.json(tweets)
  })
  
  
/*
  var userName = req.query.userName
  
  // TODO get tweets for userName

  var tweets = [  

    {
      TweetTitle: '123',
      Author: 'Trump',
      Content: 'Syria sucks'
    },
    {
      TweetTitle: 'another title',
      Author: 'Trump'
    },
  ]
  
  var queryResult = request('GET', 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='+ userName +'&count=20');
  
  var body = queryResult.body.toString()
  

 // res.json(tweets)
  res.json(body)
  
  //console.log(JSON.parse(res));
  */

})

router.get('/twitter', function(req, res, next) {
  var myObject = {
    Title: 'myControllerMethod',
    Age: null
  }

  res.json(myObject)
})

module.exports = router;
