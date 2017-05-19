import React from 'react';
import {URL} from '../oauth.js';

class Home extends React.Component{
  render() {
    return (
      <div>
        <h1>Hello from React home!</h1>
        {URL}
      <br/>
        <a href={URL} target="_blank">Sign In To Google</a>
      </div>
    );
  }
}

export default Home;
