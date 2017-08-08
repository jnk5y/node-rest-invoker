#!/usr/bin/env node
'use strict';

var express = require('express');
var app = express();
var spawn = require('child_process').spawn;
var url = require('url');
var path = require('path');
var fs = require('fs');
var https = require('https');
var port = 8888;
var server;
var options = {
        key: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'privkey.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'fullchain.pem'))
};

// URL will look like - https://username:password@example.com:8888/trigger/action
// Works with curl but a browser doesn't pass the username and password header correctly
var expectedUsername = 'ENTER THE USERNAME YOU WANT TO USE';
var expectedPassword = 'ENTER THE PASSWORD YOU WANT TO USE';

app.get('/:trigger/:action', function(req,res) {
        var header = req.headers['authorization'] || '',
                token = header.split(/\s+/).pop() || '',
                auth = new Buffer(token, 'base64').toString(),
                parts = auth.split(/:/),
                username = parts[0],
                password = parts[1];

        if(username == expectedUsername && password == expectedPassword) {

                res.setHeader('Content-Type', 'text/plain');
                res.end('Authorized');

                var action = req.params.action;
                //console.log('action ='+action);
                var trigger = req.params.trigger;

                if (trigger == 'roku') {
                        spawn(path.join(__dirname,'scripts','roku_trigger.py'), [action]);
                        console.log('Roku Triggered');
                }
                else if (trigger == 'garage') {
                        spawn(path.join(__dirname,'scripts','pi_garage_trigger.py'), [action]);
                        console.log('Garage Triggered');
                }
        }
        else {
                res.setHeader('Content-Type', 'text/plain');
                res.end('Not Authorized!');
        }

})

server = https.createServer(options, app).listen(port, function() {
        port = server.address().port;
});
