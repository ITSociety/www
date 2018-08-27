import { h, Component } from 'preact';
import format from 'date-fns/format';

import { Loading, Map } from '../partial';
import { getEndpoint, markdownToReact } from '../util';


const parsePrice = num => (num > 0 ? `${num.toFixed(2)}` : 'Free!');

// use an normal function as we require
const generatePage = (info) => {
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
      <h2 type="display3" gutterBottom className="event-title">{name}</h2>
      <div className="event-timings">
        <span className="info">
          <i color="action">date_range</i>
          <h2 type="display1" className="event-date">{humanDate}</h2>
        </span>
        <span className="info">
          <i color="action">access_time</i>
          <h2 type="display1" className="event-date">{humanTime}</h2>
        </span>
      </div>
      <div className="event-cost">
        <i color="action">attach_money</i>
        <h2 type="display1" className="event-date">{parsedPrice}</h2>
      </div>
      <div className="event-detail-card">
        <div className="event-detail-card-container">
          <div>
            <div className="event-details">{parsedDetails}</div>
          </div>
          <div className="event-media-map">
            <Map location={loc} />
          </div>
        </div>
      </div>
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
      <div className="page">
        <Grid container spacing={40} alignItems="stretch" justify="space-around" className="gutter">
          {this.state.children}
        </Grid>
      </div>
    );
  }
}

