// const createHandler = require("azure-function-express").createHandler;
const express = require("express");
const passport = require('passport');

var BearerStrategy = require("passport-azure-ad").BearerStrategy;

// Modify the below three lines to suit your environment
var tenantID = "1fc72ce8-044a-4c09-a439-e1de5c187753";
var clientID = "7daf3aab-96d4-4a72-a76f-5ea433bf0707";
var appIdURI = "https://funcapi.velosticsdev.onmicrosoft.com";

var options = {
    identityMetadata: "https://login.microsoftonline.com/" + tenantID + "/v2.0/.well-known/openid-configuration",
    clientID: clientID,
    allowMultiAudiencesInToken: false,
    // issuer: "https://sts.windows.net/" + tenantID + "/",
    // audience: appIdURI,
    validateIssuer: false,
    loggingLevel: "info",
    passReqToCallback: true,
    loggingNoPII: false,

};

var bearerStrategy = new BearerStrategy(options, function (iss, sub, profile, accessToken, refreshToken, done) {
    console.log(iss, sub, profile, accessToken, refreshToken, done);
    done(null, {}, accessToken);
});

const app = express();

app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ "extended": true }));
app.use(passport.initialize());
passport.use(bearerStrategy);

// This is where your API methods are exposed
app.get(
    "/api",
    passport.authenticate("oauth-bearer"),
    function (req, res) {
        var claims = req.authInfo;
        console.log("Validated claims: ", JSON.stringify(claims));
        console.log("body text: ", JSON.stringify(req.body));
        res.status(200).json(claims);
    }
);

module.exports = app;