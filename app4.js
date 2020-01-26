var express = require('express'),
    app = express();
var passport = require('passport');
var AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy;

console.log(new AzureAdOAuth2Strategy({
  clientID: '7daf3aab-96d4-4a72-a76f-5ea433bf0707',
  clientSecret: ':56BpnayTKu5.gpnaRQxI9sOIC=HI.G2',
  callbackURL: 'http://localhost:30662/callback',
  resource: '00000002-0000-0000-c000-000000000000',
  tenant: '1fc72ce8-044a-4c09-a439-e1de5c187753'
},
function (accessToken, refresh_token, params, profile, done) {
  var waadProfile = profile || jwt.decode(params.id_token, '', true);
  console.log(waadProfile);
  done(err, waadProfile);
}));

passport.use(new AzureAdOAuth2Strategy({
  clientID: '7daf3aab-96d4-4a72-a76f-5ea433bf0707',
  clientSecret: ':56BpnayTKu5.gpnaRQxI9sOIC=HI.G2',
  callbackURL: 'http://localhost:30662/callback',
  resource: '00000002-0000-0000-c000-000000000000',
  tenant: '1fc72ce8-044a-4c09-a439-e1de5c187753'
},
function (accessToken, refresh_token, params, profile, done) {
  var waadProfile = profile || jwt.decode(params.id_token, '', true);
  done(err, waadProfile);
}));

app.get('/books', passport.authenticate('azure_ad_oauth2'), function(req, res) {
  console.log(AzureAdOAuth2Strategy);
  res.send('auth success')
})

var server = app.listen(3000)
console.log('Server listening on port 3000')