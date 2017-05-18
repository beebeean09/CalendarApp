let express = require('express');
let app = express();
let path = require('path');

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + '/static/*'));
// });

app.use(express.static('static'));

let server = app.listen(3007, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Example app listening on port 3007!', host, port);
    console.log('http://localhost:3007/');
});

let google = require('googleapis');
let OAuth2 = google.auth.OAuth2;
let YOUR_CLIENT_ID = '260061288921-m0175r5mgu0j7h7scnbi8nhu6brbel7b.apps.googleusercontent.com';
let YOUR_CLIENT_SECRET = '2INqS1SZ1l_hId5TKXXRiQMb';
let YOUR_REDIRECT_URL = 'http://localhost:3007/oauthcallback';


let oauth2Client = new OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

// generate a url that asks permissions for Google+ and Google Calendar scopes
let scopes = 'https://www.googleapis.com/auth/calendar.readonly';

let url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

app.get('/url', function (req, res) {
    res.send(url);
});

app.get('/tokens', function (req, res) {
  let calendar = google.calendar('v3');
  let code = req.query.code;
  console.log('req');
  console.log(req);

  oauth2Client.getToken(code, function (err, tokens) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    // console.log('tokens');
    // console.log(tokens);
    oauth2Client.setCredentials(tokens);
    // console.log(oauth2Client);
    // console.log('events');
    console.log(calendar.events.list({
      auth: oauth2Client,
      calendarId: 'primary'
    }, function(err1, response) {
      console.log(response.items);
    }));
    // console.log(listEvents(oauth2Client));
    res.send(tokens);
  });
});

// function listEvents(auth) {
//   let calendar = google.calendar('v3');
//   calendar.events.list({
//     auth: auth,
//     calendarId: 'primary',
//     timeMin: (new Date()).toISOString(),
//     maxResults: 10,
//     singleEvents: true,
//     orderBy: 'startTime'
//   }, function(err, response) {
//     if (err) {
//       console.log('The API returned an error: ' + err);
//       return;
//     }
//     return response;
//     // let events = response.items;
//     // if (events.length === 0) {
//     //   console.log('No upcoming events found.');
//     // } else {
//     //   console.log('Upcoming 10 events:');
//     //   for (let i = 0; i < events.length; i++) {
//     //     let event = events[i];
//     //     let start = event.start.dateTime || event.start.date;
//     //     console.log('%s - %s', start, event.summary);
//     //   }
//     }
//   );
// }

app.get('/getCalendarEvents', function(req, res) {
  let events = listEvents(oauth2Client);
  console.log(events);
  res.send(events);
});
