var express = require('express');
var passport = require('passport');
var BearerStrategy = require("passport-azure-ad").BearerStrategy;

var options =  {
  identityMetadata: "https://login.microsoftonline.com/1fc72ce8-044a-4c09-a439-e1de5c187753/v2.0/.well-known/openid-configuration",
  clientID: "7daf3aab-96d4-4a72-a76f-5ea433bf0707",
  issuer: "https://sts.windows.net/1fc72ce8-044a-4c09-a439-e1de5c187753/",
  audience: "http://localhost:30662",
  loggingLevel: "info",
  passReqToCallback: false
};

var bearerStrategy = new BearerStrategy(options, function(token, done) {
  done(null, {}, token);
});

console.log(bearerStrategy);

var app = express();
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
passport.use(bearerStrategy);

// Enable CORS for * because this is a demo project
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// This is where your API methods are exposed
app.get(
  "/api",
  passport.authenticate("oauth-bearer", { session: false }),
  function(req, res) {
    var claims = req.authInfo;
    console.log("User info: ", req.user);
    console.log("Validated claims: ", claims);
    res.status(200).json({ name: claims["name"] });
  }
);

// Run this
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on port " + port);
});
