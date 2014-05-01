var express = require('express');
var Slack = require('node-slack');
var request = require('request');
var slackDomain = 'et-jbdbc'; 
//var slackToken = 'eqAJpc6Z6iyOI2gnMRFhkG65';
//Mobile
var slackToken = 'MwfFA0lvXsvB6fQHkqIYklJr';
//var slackToken = 'peaMT9FiqLHrYxyybld0jmYc';
var slack = new Slack(slackDomain,slackToken);
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/incoming', function(req, res){
    var reply = {};
    
    if(req.body.text.indexOf("wake up call") > -1){
        var regex = /[0-9]{1,2}:??[0-9]{0,2}(?:am|pm)/
        var result = req.body.text.match(regex);
        if(result == null || result[0] == null){
            console.log("Could not find a time");
            console.log(req.body);
        }
        else{
            console.log("Setting up wake up call for " + result[0]);
            var triggerUrl = 'https://shielded-fortress-9160.herokuapp.com/fireEvent/keywordEntry';
            //var triggerUrl = 'http://localhost:3000/fireEvent/keywordEntry';
            var params = {
                "email":"jzehner@exacttarget.com",
                "slackId":"1234",
                "keyword":"WAKEUP",
                "value":result[0]
            }
            var headers = {
                'Content-Type':'application/json'
            }
            var options = {
                url: triggerUrl,
                method: 'POST',
                headers: headers,
                json: params
            }
            
            request(options, function(e,r,b){
                console.log("Error: " + e);
                console.log("Request: " + r.body);
                console.log("Body: " + b);
            });
            
            
        }
    }
    else if(req.body.text.indexOf("checkout") > -1){
        
            var triggerUrl = 'https://shielded-fortress-9160.herokuapp.com/fireEvent/keywordEntry';
            //var triggerUrl = 'http://localhost:3000/fireEvent/keywordEntry';
            var params = {
                "email":"jzehner@exacttarget.com",
                "slackId":"1234",
                "keyword":"CHECKOUT",
                "value":"value"
            }
            var headers = {
                'Content-Type':'application/json'
            }
            var options = {
                url: triggerUrl,
                method: 'POST',
                headers: headers,
                json: params
            }
            
            request(options, function(e,r,b){
                console.log("Error: " + e);
                console.log("Request: " + r.body);
                console.log("Body: " + b);
            });
        
    }
    else if(req.body.text.indexOf("coffee") > -1){
        reply = slack.respond(req.body,function(hook){
            return{
                text: "We have a Starbucks accross the street for the lobby",
                username: "Hilton Indy"
            }
        });
    }
    
    res.json(reply);
});

router.post('/fireEvent/keywordEntry', function(req, res){
    console.log("Hi");
    console.log(req.body);
});

router.post('/sendmessage', function(req, res){
    var post = slack.send({
        text: req.body.sendText,
        channel: '#' + req.body.sendChannel,
        username: req.body.sendUsername
        
    });
    
    console.log(req.body);
    
    res.send("Success");
});

module.exports = router;
