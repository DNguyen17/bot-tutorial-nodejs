var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var responseID = 0;

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /[Ss]wiggity/,
      botRegex2 = /([sS]as)/,
      botRegex3 = /(do ((you)|(we)) have( my)* shirts*)|(is my shirt here)|(are the shirts here)/,
      botRegex4 = /[iI]s the ([wW][Ii]-{0,1}[Ff][Ii]) working/,
      botRegex5 = /([Bb]roke)|([Ff]ail)|(([Dd]oesn't)|([Nn]ot) [Ww]ork)/,
      botRegex6 = /(mlh)|(MLH)|([mM]ajor [Ll]eague [Hh]acking)/,
      botRegex7 = /[Ss]tickers/,
      botRegex8 = /[Ss]now/,
      botRegex9 = /[Mm]ade ((it)|((is)|(at)))/;

   
  if(request.text && botRegex.test(request.text)) {
  	responseID = 1;
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } 

  else if(botRegex2.test(request.text) && request.sender_type != "bot"){
  	responseID = 2;
  	this.res.writeHead(200);
  	postMessage();
  	this.res.end();
  } 

  else if(botRegex3.test(request.text)){
  	responseID = 3;
  	this.res.writeHead(200);
  	postMessage();
  	this.res.end();
  } 

  else if(botRegex4.test(request.text)){
  	responseID = 4;
  	this.res.writeHead(200);
  	postMessage();
  	this.res.end();
  } 

  else if(botRegex5.test(request.text)){
  	responseID = 5;
  	this.res.writeHead(200);
  	postMessage();
  	this.res.end();
  } 

  else if(botRegex6.test(request.text)){
  	responseID = 6;
  	this.res.writeHead(200);
  	postMessage();
  	this.res.end();
  } 

  else if(botRegex7.test(request.text)){
  	responseID = 7;
  	this.res.writeHead(200);
  	postMessage();
  	this.res.end();
  } 

  else if(botRegex8.test(request.text)){
  	responseID = 8;
  	this.res.writeHead(200);
  	postMessage();
  	this.res.end();
  } 
  
  else if (botRegex9.test(request.text) && request.sender_type != "bot") {
    responseID = 9;
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
  var names = ["Morgan Monzingo", "Logan Dorsey", "Danh Nguyen", "Edward Li", "Austin C Wells", "Jorge Valdez", "Gavin Pham", "Eric Straw", "Brandon"];
  
  if (responseID == 1) {
  	botResponse = "swooty"; 
  }

  else if (responseID == 2) {
  	botResponse = "But not as sassy as Austin";
  }

  else if (responseID == 3 || responseID == 4) {
  	botResponse = "lol no";
  }

  else if (responseID == 5) {
  	botResponse = "I blame @"+names[Math.floor(Math.random()*names.length)];
  }

  else if(responseID == 6) {
  	botResponse = "We do not speak of them here";
  }

  else if (responseID == 7) {
  	botResponse = "I LOVE STICKERS SO MUCH OMG";
  }

  else if (responseID == 8) {
  	botResponse = "Brace yourselves. Winter is coming.";
  }
  
  else if (responseID == 9) {
    botResponse = "No, I made it";
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