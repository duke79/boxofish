import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Widget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

class Project extends React.Component {
  render() {
    return (
      <div>
        <h2>Project</h2>
        <div className="App">
          <Widget />
        </div>
      </div>
    );
  }
}

export default Project