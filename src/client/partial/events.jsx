import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Loading from './loading.jsx';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { children: <Loading /> };
  }

  componentWillMount() {
    // fetch some data
  }

  render() {
    return (
      <div className="events gutter">
        <Typography type="display3" className="events-title">Events</Typography>
        <div className="events-events">
          {this.state.children}
        </div>
      </div>
    );
  }
}
