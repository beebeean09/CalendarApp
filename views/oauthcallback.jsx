import React from 'react';
import $ from 'jquery';

class Oauthcallback extends React.Component{
  render() {
    return (
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>Please Sign In</title>
            <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
            window.opener.postMessage(location.href, "*");
        </head>
        <body>
          <a href="http://localhost:3007/tokens?code=">Click Here To Go See Your Calendar!</a>
        </body>
      </html>
    );
  }
}

export default Oauthcallback;
