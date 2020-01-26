 // Don't commit this file to your public repos. This config is for first-run
 exports.creds = {
     mongoose_auth_local: 'mongodb://test_aad:Passw0rd@ds263808.mlab.com:63808/test_aad', // Your mongo auth uri goes here
     // identityMetadata: 'https://login.microsoftonline.com/1fc72ce8-044a-4c09-a439-e1de5c187753/.well-known/openid-configuration', // This is customized for your tenant.
     identityMetadata: `https://login.microsoftonline.com/1fc72ce8-044a-4c09-a439-e1de5c187753.onmicrosoft.com/v2.0/.well-known/openid-configuration`,
     // You may use the common endpoint for multi-tenant scenarios
     // if you do, make sure you set validateIssuer to false and specify an audience
     // as you won't get this from the Identity Metadata
     //
	audience: 'http://localhost:30662',
    // identityMetadata: 'https://login.microsoftonline.com/common/.well-known/openid-configuration',
    validateIssuer: true, // if you have validation on, you cannot have users from multiple tenants sign in
 	passReqToCallback: false,
 	loggingLevel: 'info', // valid are 'info', 'warn', 'error'. Error always goes to stderr in Unix.
 	clientID: '7daf3aab-96d4-4a72-a76f-5ea433bf0707',
 	allowMultiAudiencesInToken: true,
 	// issuer: 'https://login.microsoftonline.com/1fc72ce8-044a-4c09-a439-e1de5c187753',
 	clientSecret: ':56BpnayTKu5.gpnaRQxI9sOIC=HI.G2',
 };
