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

app.get('/:trigger/:action', function(req,res) {
        var action = req.params.action;
        var trigger = req.params.trigger;
        const auth = {login: process.env.USERNAME, password: process.env.PASSWORD }

        var newauth = (req.headers.authorization || '').split(' ')[1] || '';
        newauth = new Buffer(newauth, 'base64').toString().split(':') || '';
        const login = newauth[0];
        const password = newauth[1];

        if (!login || !password || !auth.login || !auth.password || login !== auth.login || password !== auth.password) {
                res.status(401).send('Not Authorized.');
                console.log('Not Authorized');
                return;
        }
        else if (!auth.login || !auth.password) { throw "USERNAME and/or PASSWORD env variables not set."; }
        else {
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
})
	        
server = https.createServer(options, app).listen(port, function() {
	port = server.address().port;
});
