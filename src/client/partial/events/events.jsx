import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { distanceInWords } from 'date-fns';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';


import Loading from '../loading.jsx';
import { getEndpoint, markdownToReact } from '../../util.jsx';

const parseEvents = events => events.map(event => {
  const {
    name, details, start, id,
  } = event;
  const startTime = new Date(start);
  const distance = distanceInWords((new Date()), startTime, { addSuffix: true });
  const parsed = markdownToReact(details);
  return (
    <Grid className="event-card-grid-item" key={name} item xs={12} sm={12} md={6}>
      <Card className="event-card">
        <CardContent>
          <Typography type="headline" component="h3">{name}</Typography>
          <Typography type="body1" className="event-time">{distance}</Typography>
          {parsed}
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
  }

  async componentWillMount() {
    const events = await getEndpoint('/api/contentful/events');
    if (events.length % 2 === 1) events.pop();
    const children = parseEvents(events);
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
