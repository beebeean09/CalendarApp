const express = require('express');
let path = require('path');
const router = express.Router();
const URL = require('./oauth');
let google = require('googleapis');
let calendar = google.calendar('v3');
let {listOfEvents} = require('./app.js');

router.get('/oauthcallback', function(req, res) {
  res.sendFile(path.join(__dirname + '/oauthIndex.html'));
});

router.get('/url', function(req, res) {
  res.send(URL);
});

router.get('/getCalendarEvents', function(req, res) {
  let events = listOfEvents;
  console.log(events);
  // console.log('REDIRECT REDIRECT');
  // res.send('Hello');
  // console.log(res);
  // console.log('oauth');
  // console.log(NEWOAUTH2CLIENT);
  // console.log('calendar');
  // // console.log(calendar.events.list);
  // console.log(calendar.events.list({
  //   auth: NEWOAUTH2CLIENT.oauth2Client,
  //   calendarId: 'primary'
  // }, function(err1, response) {
  //   console.log(response);

  //   let events = response.items;
  //   let listEvents = [];
  //   for (let i = 0; i < events.length; i++) {
  //     let event = events[i];
  //     let start = event.start.dateTime || event.start.date;
  //     listEvents.push([start, event.summary, event.attendees ? event.attendees : ""]);
  //   }
  //   res.send(listEvents);
  // }));
});

router.get('/greeting', function(req, res) {
  res.render('greeting', { name: 'Vivian Lee'});
});

module.exports = router;
