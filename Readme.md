## Steps to generate token

* Perform login and request a code by visiting the following URL
```bash
https://login.microsoftonline.com/1fc72ce8-044a-4c09-a439-e1de5c187753/oauth2/v2.0/authorize?client_id=7daf3aab-96d4-4a72-a76f-5ea433bf0707&scope=openid&response_type=code
```
* This will redirect your browser to a URL that looks like this, copy paste the “Code” part
```bash
http://localhost:3000/callback?
code=..longuglycode..&
session_state=<someguid>
```
* Create a POST request as follows with this code to request an access token
```bash
curl -X POST \
https://login.microsoftonline.com/1fc72ce8-044a-4c09-a439-e1de5c187753/oauth2/v2.0/token \
-H 'Content-Type: application/x-www-form-urlencoded' \
-H 'cache-control: no-cache' \
-d
'redirect_uri=http%3A%2F%2Flocalhost%3A30662&client_id=7daf3aab-96d4-4a72-a76f-5ea433bf0707&grant_type=authorization_code&code=<clientsecretgenerated>&client_secret=:56BpnayTKu5.gpnaRQxI9sOIC=HI.G2'
```
