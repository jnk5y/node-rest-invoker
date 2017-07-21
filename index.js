var express = require('express');

var app = express();

var spawn = require('child_process').spawn;

app.get('/invoke', function(req, res) {
  const ls = spawn('/opt/script.py');

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    res.json({response: `output: ${data}`});
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`invoked script exited with code ${code}`);
  });
})

app.listen(8888);
