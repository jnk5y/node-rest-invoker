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

var expectedAuth = null;
var file = path.join(__dirname,'pass.txt');
fs.readFile(file, function(err,data) {
        if(err == null) { expectedAuth = data.toString().trim(); }
        else { throw "Password file not found."; }
});

app.post('/:auth/:trigger/:action', function(req,res) {
	var auth = req.params.auth;
        var action = req.params.action;
        var trigger = req.params.trigger;

        if(auth == expectedAuth && expectedAuth != null) {

                res.setHeader('Content-Type', 'text/plain');
                res.end('authorized');
                console.log('authorized');

                file = path.join(__dirname,'scripts', trigger +'_trigger.py');

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
