import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';
import { distanceInWords } from 'date-fns';

import { Loading } from '../partial';
import { getEndpoint, markdownToReact } from '../util';

export default class PastEventsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { children: <Loading /> };
  }

  async componentWillMount() {
    const oldEvents = await getEndpoint('/api/contentful/events/past');
    const children = oldEvents.map(event => {
      const { id, name, start, details } = event;
      const startTime = new Date(start);
      const distance = distanceInWords((new Date()), startTime, { addSuffix: true });
      return (
        <Card className="old-event" key={id}>
          <CardContent>
            <h1>{name}</h1>
            <p>{distance}</p>
            <div>{markdownToReact(details)}</div>
          </CardContent>
        </Card>
      );
    });
    this.setState({ children });
  }

  render() {
    return (
      <div className="page dark-row">
        <Grid container spacing={40} alignItems="stretch" justify="space-around" className="gutter">
          {this.state.children}
        </Grid>
      </div>
    );
  }
}
