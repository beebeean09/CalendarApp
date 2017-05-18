let fs = require('fs');
let readline = require('readline');
let google = require('googleapis');
let googleAuth = require('google-auth-library');

let SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
let TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
let TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-googleCalendar.json';

fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }

  authorize(JSON.parse(content), listEvents);
});

function authorize(credentials, callback) {
  let clientSecret = credentials.installed.client_secret;
  let clientId = credentials.installed.client_id;
  let redirectUrl = credentials.installed.redirect_uris[0];
  let auth = new googleAuth();
  let oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  console.log(redirectUrl);
  console.log(credentials);


  //Check if we previously stored a token
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

function getNewToken(oauth2Client, callback) {
  let authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

function listEvents(auth) {
  console.log(auth);
  let calendar = google.calendar('v3');
  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    let events = response.items;
    if (events.length === 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  });
}
