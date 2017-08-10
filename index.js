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

var expectedUsername = 'johnkyrus';
var expectedPassword = 'CkOUdM7r1O';

app.get('/:trigger/:action', function(req,res) {
	var header = req.headers['authorization'] || '',
		token = header.split(/\s+/).pop() || '',
		auth = new Buffer(token, 'base64').toString(),
		parts = auth.split(/:/),
		username = parts[0],
		password = parts[1];

	if(username == expectedUsername && password == expectedPassword) {

		res.setHeader('Content-Type', 'text/plain');
		res.end('authorized');
		
		var action = req.params.action;
		var trigger = req.params.trigger;
		var file = path.join(__dirname,'scripts', trigger +'_trigger.py');//filename);
		
		fs.stat(file, function(err,stat) {
			if(err == null) { spawn(file, [action]); }
			else { console.log('trigger not found'); }
		});
	}
	else { 
		res.setHeader('Content-Type', 'text/plain');
		res.end('Not authorized!');
	}

})
	        
server = https.createServer(options, app).listen(port, function() {
	port = server.address().port;
});
