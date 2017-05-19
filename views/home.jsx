import React from 'react';
import {URL} from '../oauth.js';

class Home extends React.Component{
  render() {
    const mainContainer = {
      fontFamily: 'arial',
      width: '100%',
      height: '400px',
      fontSize: '20px',
      textAlign: 'center',
      color: '#4d4b88'
    };
    const greetingContainer = {
      margin: '200px 0',
      fontSize: '15px'
    };
    const button = {
      border: '1px solid lightgrey',
      padding: '10px 15px',
      background: 'lightgrey',
      color: 'white'
    };
    const header = {
      margin: '10px 0'
    };
    const calendarContainer ={
      width: '100%'
    };
    const calendar = {
      alignItems: 'center',
    };

    return (
      <div style={mainContainer}>
        <div style={greetingContainer}>
          <h1 style={header}>Welcome!</h1>
          <h2 style={header}>Click the button below to log in to your account and sync up to your Google calendar!</h2>
          <div style={calendarContainer}>
            <img style={calendar}src ="http://www.racedepartment.com/images/rd_calext/calendar.png"/>
          </div>
          <a style={button} href={URL} target="_blank">Sign In To Google</a>
      </div>
      </div>
    );
  }
}

export default Home;
