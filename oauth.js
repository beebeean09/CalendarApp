let google = require('googleapis');
let OAuth2 = google.auth.OAuth2;
let YOUR_CLIENT_ID = '260061288921-m0175r5mgu0j7h7scnbi8nhu6brbel7b.apps.googleusercontent.com';
let YOUR_CLIENT_SECRET = '2INqS1SZ1l_hId5TKXXRiQMb';
let YOUR_REDIRECT_URL = 'http://localhost:3007/api/oauthcallback';


const OAUTH2CLIENT = new OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

// generate a url that asks permissions for Google+ and Google Calendar scopes
let scopes = 'https://www.googleapis.com/auth/calendar.readonly';

const URL = OAUTH2CLIENT.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

module.exports = {URL, OAUTH2CLIENT};
