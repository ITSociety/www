import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

import { Loading } from '../partial';
import { getEndpoint } from '../util.jsx';

const parseEvents = () => <Loading />;

export default class PastEventsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { children: <Loading /> };
  }

  async componentWillMount() {
    const oldEvents = await getEndpoint('/api/contentful/events/past');
    const children = parseEvents(oldEvents);
    this.setState({ children }); // do some parsing and present nicely
  }

  render() {
    return (
      <Grid container spacing={0} alignItems="stretch" justify="space-around" className="gutter">
        <h1>todo</h1>
        {this.state.children}
      </Grid>
    );
  }
}
