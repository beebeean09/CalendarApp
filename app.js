let express = require('express');
let app = express();
let path = require('path');
let {OAUTH2CLIENT} = require('./oauth.js');
let bodyParser = require('body-parser');


app.get('/', function(req, res) {
  res.render('home');
});

app.use(express.static(__dirname + '/assets/styling.css'));
app.use('/api', require('./routes.js'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use of react components to render with express
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

let server = app.listen(3007, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Example app listening on port 3007!', host, port);
  console.log('http://localhost:3007/');
});

// Grab token and use the token to fetch events on Google calendar
app.get('/tokens', function (req, res) {
  let code = req.query.code;
  OAUTH2CLIENT.getToken(code, function (err, tokens) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    OAUTH2CLIENT.setCredentials(tokens);

    let google = require('googleapis');
    let calendar = google.calendar('v3');
    let listEvents = {};

    console.log('REDIRECT REDIRECT');
    console.log(calendar.events.list({
      auth: OAUTH2CLIENT,
      calendarId: 'primary'
    }, function(err1, response) {
      let events = response.items;
      for (let i = 1; i < events.length; i++) {
        let event = events[i];
        let startDate = event.start.dateTime || event.start.date;
        let endDate = event.end.dateTime || event.end.date;
        console.log(event);
        listEvents[`event${i}`] = {
          title: event.summary ? event.summary : "",
          description: event.description ? event.description : "",
          attendees: event.attendees ? event.attendees : "",
          startDate: startDate,
          endDate: endDate,
        };
      }
      res.send(listEvents);
    }));
  });
});
