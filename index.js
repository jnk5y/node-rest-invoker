#!/usr/bin/env node
'use strict';

var url = require('url');
var express = require('express');
var app = express();
var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');
var https = require('https');
var port = 8888;
var server;
var options = {
	key: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'privkey.pem')),	
	cert: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'fullchain.pem'))
};

app.get('/:clientKey/:trigger/:action', function(req,res) {
	var clientKey = req.params.clientKey;
        var action = req.params.action;
        var trigger = req.params.trigger;
	var serverKey = process.env.SERVER_KEY;
	
	if(serverKey == null) { throw "SERVER_KEY env variable not set."; }

        if(clientKey == serverKey) {

                res.setHeader('Content-Type', 'text/plain');
                res.end('Authorized');
                console.log('Authorized');

                var file = path.join(__dirname,'scripts', trigger +'_trigger.py');

                fs.stat(file, function(err,stat) {
                        if(err == null) { spawn(file, [action]); }
                        else { console.log('Trigger script not found'); }
                });
	}
	else { 
		res.setHeader('Content-Type', 'text/plain');
		res.end('Not authorized!');
		console.log('Not authorized!');
	}

})
	        
server = https.createServer(options, app).listen(port, function() {
	port = server.address().port;
});
