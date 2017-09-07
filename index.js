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
		var dataString = '';
                res.setHeader('Content-Type', 'text/plain');
                console.log('Authorized');

                var file = path.join(__dirname,'node-rest-scripts', trigger +'_trigger.py');

                fs.stat(file, function(err,stat) {
                        if(err == null) { 
				var output = spawn(file, [action]);
				//read output from python script
				output.stdout.on('data', function(data){
                                        dataString += data.toString();
                                });
                                output.stdout.on('end', function(){
                                        console.log(dataString);
                                        res.end(dataString);
                                });

			}
                        else { console.log('Trigger script not found. Did you remember to attach your trigger volume to the docker run command with -v /your/triggers/folder:/usr/src/app/node-rest-scripts:Z'); }
                });
	}
	else { 
		res.setHeader('Content-Type', 'text/plain');
		res.end('Not Authorized!');
		console.log('Not Authorized!');
	}

})
	        
server = https.createServer(options, app).listen(port, function() {
	port = server.address().port;
});
