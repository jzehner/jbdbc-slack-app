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
            reply = slack.respond(req.body, function(hook){
                return { text: 'We will call you at ' + result[0],
                        username:'Hotel'
                       };
            });
        }
    }
    else{
        switch(req.body.trigger_word){
            case 'hi':
                reply = slack.respond(req.body,function(hook){
                    return {
                        text: 'Test reply to ' + hook.user_name,
                        username: 'Hotel'
                    };
                });
                break;
            case 'welcome':
                var data = {
                    "email":req.body.user_name,
                    "slackId":req.body.user_id   
                }
                request.post({url:"/fireEvent/beaconEntry", body:JSON.stringify(data)},function(e,r,b){

                });
                break;
            default:
                console.log(req.body);
                break;
        }
    }
    
    
    
    
    res.json(reply);
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
