exports.creds = {
    returnURL: process.env.RETURN_URL || 'http://localhost:30662/',
    redirectUrl: process.env.redirectUrl || 'http://localhost:30662/',
    identityMetadata: 'https://login.microsoftonline.com/common/.well-known/openid-configuration', // For using Microsoft you should never need to change this.
    clientID: process.env.CLIENT_ID || '7daf3aab-96d4-4a72-a76f-5ea433bf0707',
    clientSecret: process.env.CLIENT_SECRET || '6E@XBTvj]kFJojYpr3AMTcbTO_oHV/06', // if you are doing code or id_token code
    skipUserProfile: true, // for AzureAD should be set to true.
    responseType: 'id_token', // for login only flows use id_token. For accessing resources use `id_token code`
    responseMode: 'query', // For login only flows we should have token passed back to us in a POST
    scope: ['email', 'profile'] // additional scopes you may wish to pass
};