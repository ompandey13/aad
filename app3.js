var express = require('express'),
    app = express(),
    fs = require('fs'),
    aad = require('azure-ad-jwt');

app.get('/api', function(req, res) {
  var audience = 'http://localhost:30662'
  var authorization = req.headers['authorization']
  if (authorization) {
    var bearer = authorization.split(" ");
    var jwtToken = bearer[1];
    if (jwtToken) {
      aad.verify(jwtToken, { audience: audience}, function(err, result) {
        if (result) {
          fs.readFile(__dirname + "/" + "_data.json", 'utf8', function(err, data) {
            res.status(200).send(data)
          });
        } else {
          console.log(err);
          res.status(401).send('no valid token')
        }
      })
    } else {
      res.status(401).send('no token in header')
    }
  } else {
    res.status(401).send('no auth attr in header')
  }
})

var server = app.listen(3000)
console.log('Server listening on port 3000')