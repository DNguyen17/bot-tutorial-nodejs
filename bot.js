var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var responseID = 0;


var botID = process.env.BOT_ID;

var names = ["Logan", "Danh", "Jorge", "Morgan", "Gavin", "Austin", "Eric", "Brandon", "Edward"];

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /swiggity/,
      botRegex2 = /([sS]as)/,
      botRegex3 = /(do you have my shirt?*)|(is my shirt here?*)|(are the shirts here?*)|(do we have shirts?*)/,
      botRegex4 = /[iI]s the ((wifi)|(WIFI)) working\?*/,
      botRegex5 = /(broke)|(fail)|(doesn't work)|(not work)/,
      botRegex6 = /(mlh)|(MLH)|([Mm]ajor [Ll]eague [Hh]acking)/,
      botRegex7 = /(stickers)/,
      botRegex8 = /([sS]now)/;


  console.log(request);
  
  if(request.sender_type == "bot") {
  	responseID = 0;
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
   
  console.log

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
  	responseID = 0;
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  if (responseID == 1) {
  	botResponse = "swooty"; //cool();
  }

  else if (responseID == 2) {
  	botResponse = "But not as much as Austin";
  }

  else if (responseID == 3 || responseID == 4) {
  	botResponse = "lol no";
  }

  else if (responseID == 5) {
  	//var whositgonnabe = Math.floor(Math.random() * 9);
  	botResponse = 'I blame logan';
  }

  else if(responseID == 6) {
  	botResponse = "We do not speak of them here";
  }

  else if (responseID == 7) {
  	botReponse = "I LOVE STICKERS SO MUCH OMG";
  }

  else if (responseID == 8) {
  	botReponse = "Brace yourselves. Winter is coming.";
  }

  responseID = 0;

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