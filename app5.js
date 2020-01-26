var bunyan = require('bunyan');
var passport = require('passport');
var OIDCBearerStrategy = require('passport-azure-ad').BearerStrategy;
var express = require('express');
var app = express();

// We pass these options in to the ODICBearerStrategy.

// Our logger
var log = bunyan.createLogger({
    name: 'Microsoft OAuth2 Example Web Application',
         streams: [
        {
            stream: process.stderr,
            level: "error",
            name: "error"
        },
        {
            stream: process.stdout,
            level: "warn",
            name: "console"
        }, ]
});

var options = {
    // The URL of the metadata document for your app. We will put the keys for token validation from the URL found in the jwks_uri tag of the in the metadata.
    identityMetadata: 'https://login.microsoftonline.com/common/.well-known/openid-configuration', // This is customized for your tenant.,
    issuer: '',
    audience: 'http://localhost:30662',
    clientID: '7daf3aab-96d4-4a72-a76f-5ea433bf0707',
    validateIssuer: false,
    passReqToCallback: false,
    loggingLevel: 'info'
};

// array to hold logged in users and the current logged in user (owner)
var users = [];
var owner = null;

var oidcStrategy = new OIDCBearerStrategy(options,
    function(token, done) {
        log.info('verifying the user');
        log.info(token, 'was the token retreived');
        findById(token.sub, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                // "Auto-registration"
                log.info('User was added automatically as they were new. Their sub is: ', token.sub);
                users.push(token);
                owner = token.sub;
                return done(null, token);
            }
            owner = token.sub;
            return done(null, user, token);
        });
    }
);

console.log(oidcStrategy);

passport.use(oidcStrategy);

app.get('/api', passport.authenticate('oauth-bearer', {
  session: false
}), function(req, res) {
  console.log('auth success');
  res.send('auth success')
})

var server = app.listen(3000)
console.log('Server listening on port 3000')