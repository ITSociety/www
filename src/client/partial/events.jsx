import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { distanceInWords } from 'date-fns';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';


import Loading from './loading.jsx';
import { getEndpoint, markdownToReact } from '../util.jsx';

const parseEvents = events => events.map(event => {
  const { eventName: name, additionalDetails, startTime } = event.fields;
  const start = new Date(startTime);
  const distance = distanceInWords((new Date()), start);
  const additional = markdownToReact(additionalDetails);
  const { id } = event.sys;
  return (
    <Grid className="event-card-grid-item" key={name} item xs={12} sm={6} md={6}>
      <Card className="event-card">
        <CardContent>
          <Typography type="headline" component="h3">{name}</Typography>
          <Typography type="body1" className="event-time">{distance}</Typography>
          {additional}
        </CardContent>
        <CardActions>
          <Link to={`/event/${id}`}>
            <Button dense color="primary">
            Learn More
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
});

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { children: <Loading /> };
    this.parseEvents = parseEvents.bind(this);
  }

  async componentWillMount() {
    const events = await getEndpoint('/api/contentful/events');
    if (events.length % 2 === 1) events.pop();
    const children = this.parseEvents(events);
    this.setState({ children });
  }


  render() {
    return (
      <div className="events gutter">
        <Typography type="display3" className="events-title">Events</Typography>
        <div className="events-events">
          <Grid container spacing={40} alignItems="stretch" justify="space-around">
            {this.state.children}
          </Grid>
        </div>
      </div>
    );
  }
}
