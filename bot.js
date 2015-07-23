var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var responseID = 0;


var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /swiggity/,
      botRegex2 = /(sas)|(Sas)/,
      botRegex3 = /(do you have my shirt?)|(do you have my shirt)|(is my shirt here?)|(is my shirt here)|(are the shirts here?)|(are the shirts here)|(do we have shirts?)|(do we have shirts)/,
      botRegex4 = /(is the wifi working?)|(Is the WIFI working?)|(is the WIFI working?)/,
      botRegex5 = /(broke)|(fail)|(doesn't work)|(not work)/,
      botRegex6 = /(mlh)|(MLH)|(Major League Hacking)|(major league hacking)/,
      botRegex7 = /stickers/,
      botRegex8 = /snow/;
  if(request.text && botRegex.test(request.text)) {
  	responseID = 1;
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } 

  if(request.text && botRegex2.test(request.text)){
  	responseID = 2;
  	this.res.writeHead(200);
  	postMessage();
  	this.res.end();
  } 

  if(request.text && botRegex3.test(request.text)){
  	responseID = 3;
  	this.res.writeHead(200);
  	postMessage();
  	this.res.end();
  } 

  if(request.text && botRegex4.test(request.text)){
  	responseID = 4;
  	this.res.writeHead(200);
  	postMessage();
  	this.res.end();
  } 

  if(request.text && botRegex5.test(request.text)){
  	responseID = 5;
  	this.res.writeHead(200);
  	postMessage();
  	this.res.end();
  } 

  if(request.text && botRegex6.test(request.text)){
  	responseID = 6;
  	this.res.writeHead(200);
  	postMessage();
  	this.res.end();
  } 

  if(request.text && botRegex7.test(request.text)){
  	responseID = 7;
  	this.res.writeHead(200);
  	postMessage();
  	this.res.end();
  } 

  if(request.text && botRegex8.test(request.text)){
  	responseID = 8;
  	this.res.writeHead(200);
  	postMessage();
  	this.res.end();
  } 

  else {
    console.log("don't care");
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  if (responseID == 1) {
  	botResponse = "swooty"; //cool();
  }

  else if (responseID == 2) {
  	botResponse = "But no one is as sassy as Austin";
  }

  else if (responseID == 3 || responseID == 4) {
  	botResponse = "lol no";
  }

  else if (responseID == 5) {
  	botResponse = "I blame Logan...";
  }

  else if(responseID == 6) {
  	botResponse = "We do not speak of MLH here";
  }

  else if (responseID == 7) {
  	botReponse = "I LOVE STICKERS SO MUCH OMG";
  }

  else if (responseID == 8) {
  	botReponse = "Brace yourselves. Winter is coming.";
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