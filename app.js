let express = require('express');
let app = express();
let path = require('path');
let {OAUTH2CLIENT} = require('./oauth.js');

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + '/static/*'));
// });

// app.use(express.static('static'));

let server = app.listen(3007, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Example app listening on port 3007!', host, port);
    console.log('http://localhost:3007/');
});

// let google = require('googleapis');
// let OAuth2 = google.auth.OAuth2;
// let YOUR_CLIENT_ID = '260061288921-m0175r5mgu0j7h7scnbi8nhu6brbel7b.apps.googleusercontent.com';
// let YOUR_CLIENT_SECRET = '2INqS1SZ1l_hId5TKXXRiQMb';
// let YOUR_REDIRECT_URL = 'http://localhost:3007/oauthcallback';
//
//
// let oauth2Client = new OAuth2(
//   YOUR_CLIENT_ID,
//   YOUR_CLIENT_SECRET,
//   YOUR_REDIRECT_URL
// );
//
// // generate a url that asks permissions for Google+ and Google Calendar scopes
// let scopes = 'https://www.googleapis.com/auth/calendar.readonly';
//
// let url = oauth2Client.generateAuthUrl({
//   access_type: 'offline',
//   scope: scopes,
// });

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });
app.get('/', function(req, res) {
  res.render('home');
});

app.use('/api', require('./routes.js'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


//
// app.get('/oauthcallback', function(req, res) {
//   res.sendFile(path.join(__dirname + '/static/oauthcallback/index.html'));
// });
//
// app.get('/url', function (req, res) {
//   res.send(url);
// });
//

function getEvents(auth) {
  let google = require('googleapis');
  let calendar = google.calendar('v3');
  let listEvents = null;
  console.log('REDIRECT REDIRECT');
  console.log(calendar.events.list({
    auth: auth,
    calendarId: 'primary'
  }, function(err1, response) {
    // console.log(response.items);
    let tempList = [];
    let events = response.items;
    for (let i = 0; i < events.length; i++) {
      let event = events[i];
      let start = event.start.dateTime || event.start.date;
      tempList.push([start, event.summary, event.attendees ? event.attendees : ""]);
    }
    listEvents = tempList;
    console.log('listEvents');
    console.log(tempList);
    return;
  }));
}

//
app.get('/tokens', function (req, res) {
  let code = req.query.code;
  // console.log('req');
  // console.log(req);
  //
  // console.log('code');
  // console.log(code);
  OAUTH2CLIENT.getToken(code, function (err, tokens) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    // console.log('tokens');
    // console.log(tokens);
    // console.log(OAUTH2CLIENT);
    OAUTH2CLIENT.setCredentials(tokens);
    // console.log(OAUTH2CLIENT);
    let events = getEvents(OAUTH2CLIENT);
    console.log('events');
    console.log(events);
    res.send(events);
    // res.redirect('/api/getCalendarEvents', {events: events});
  });
});
