var express = require('express');
var Slack = require('node-slack');
var slackDoman = ''; 
var token = 'eqAJpc6Z6iyOI2gnMRFhkG65 ';
var slack = new Slack(domain,token);
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/incoming', function(req, res){
    var reply = slack.respond(req.body,function(hook){
        return {
            text: 'Test reply to ' + hook.user_name,
            username: 'Hotel'
        };
    });
    
    res.json(reply);
}

module.exports = router;
