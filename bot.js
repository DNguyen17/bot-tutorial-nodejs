var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var responseID = 0;


var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy$/,
      botRegex2 = /(sassy)|(sas)/;

  if(request.text && botRegex.test(request.text)) {
  	responseID = 1;
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } 

  if(request.text && botRegex2.test(request.text)){
  	responseID = 2;
  	this.res.writeHead(200);
  	this.res.end();
  } 

  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  if (responseID == 1) {
  	botResponse = "Logan, Hush"; //cool();
  }

  else if (responseID == 2) {
  	botResponse = "But no one is as sassy as Austin";
  }

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;