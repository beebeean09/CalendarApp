## NOTES

- Express, NodeJS, React, MongoDB
  * Cache system implemented with mongoose under 'app/models/event.js'
- After running npm, there should be a home page where you can click to sync your events from your calendar. First, it authenticates whether you are logged in, then it brings you to another page with a button to click on, which is a url to fetch the events after retrieving the access token. It then renders all the filtered events on your calendar with title, description, attendees, start date, and end date.

### Obstacles

- learning NodeJS, Express, MongoDB
- Google Calendar API
- Oauth
- Figuring out a way to get the events data after getting the access token from authentication ('/tokens')
- At first, I was using Angular to fetch the code return after authentication, but the data I needed was return to the window, so I had to find another way to do it. I ultimately used jQuery to grab the info from the window and used it to redirect to the link for retrieving the access code (/views/oauthIndex.html)
- Overall, I learned a lot after this coding challenge! A lot of it was new and was on my list to tackle next. Unfortunately, I didn't get to work on saving it onto the actual database so that the info would persist.
