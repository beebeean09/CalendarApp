const express = require('express');
let path = require('path');
const router = express.Router();
const URL = require('./oauth');
let google = require('googleapis');
let calendar = google.calendar('v3');
let {listOfEvents} = require('./app.js');

router.get('/oauthcallback', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/oauthIndex.html'));
});

router.get('/getCalendarEvents', function(req, res) {
 // GET calendar-events request from database
 // then render on CalendarEvents component
});

module.exports = router;
