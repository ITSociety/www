import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import format from 'date-fns/format';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Icon from 'material-ui/Icon';

import { Loading, Map } from '../partial';
import { getEndpoint, markdownToReact } from '../util.jsx';


const parsePrice = num => (num > 0 ? `${num.toFixed(2)}` : 'Free!');

// use an normal function as we require
const generatePage = info => {
  const {
    name, details, location, price, timing,
  } = info;
  const eventDate = new Date(timing.start);
  const humanDate = format(eventDate, 'dddd Do MMMM YYYY');
  const humanTime = format(eventDate, 'hh:mm a');
  const parsedDetails = markdownToReact(details);
  const parsedPrice = parsePrice(price);
  // jesus
  const loc = { lat: location.lat, lng: location.lon };
  return (
    <div className="event">
      <Typography type="display3" gutterBottom className="event-title">{name}</Typography>
      <div className="event-timings">
        <Icon color="action">date_range</Icon>
        <Typography type="display1" className="event-date">{humanDate}</Typography>
        <Icon color="action">access_time</Icon>
        <Typography type="display1" className="event-date">{humanTime}</Typography>
      </div>
      <div className="event-cost">
        <Icon color="action">attach_money</Icon>
        <Typography type="display1" className="event-date">{parsedPrice}</Typography>
      </div>
      <Card className="event-detail-card">
        <div className="event-detail-card-container">
          <CardContent>
            <div className="event-details">{parsedDetails}</div>
          </CardContent>
          <CardMedia className="event-media-map">
            <Map location={loc} />
          </CardMedia>
        </div>
      </Card>
    </div>
  );
};

export default class EventPage extends Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.state = { children: <Loading /> };
  }

  async componentWillMount() {
    const url = `/api/contentful/event/${this.id}`;
    const eventInfo = await getEndpoint(url);
    const children = generatePage(eventInfo);
    this.setState({ children });
  }

  render() {
    return (
      <Grid container spacing={0} alignItems="stretch" justify="space-around" className="gutter">
        {this.state.children}
      </Grid>
    );
  }
}

