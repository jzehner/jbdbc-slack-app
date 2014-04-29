var express = require('express');
var Slack = require('node-slack');
var slackDomain = 'et-jbdbc'; 
//var slackToken = 'eqAJpc6Z6iyOI2gnMRFhkG65';
//Mobile
//var slackToken = 'MwfFA0lvXsvB6fQHkqIYklJr';
var slackToken = 'peaMT9FiqLHrYxyybld0jmYc';
var slack = new Slack(slackDomain,slackToken);
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/incoming', function(req, res){
    var reply = {};
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
            reply = slack.respond(req.body, function(hook){
                return {
                    text: 'Welcome to you',
                    username:'Hotel'
                }
            });
            break;
        default:
            break;
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
