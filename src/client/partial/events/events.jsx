import { distanceInWords } from 'date-fns';
import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import Loading from '../loading';
import { getEndpoint, markdownToReact } from '../../util';

const parseEvents = events => events.map((event) => {
  const { name, details, start, id } = event;
  const startTime = new Date(start);
  const distance = distanceInWords((new Date()), startTime, { addSuffix: true });
  const parsed = markdownToReact(details);
  return (
    <div className="event-card-grid-item" key={name} item xs={12} sm={12} md={6}>
      <div className="event-card">
        <div>
          <h1 type="headline" component="h3">{name}</h1>
          <h1 type="body1" className="event-time">{distance}</h1>
          {parsed}
        </div>
        <div>
          <Link href={`/event/${id}`}>
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
});

class Events extends Component {
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
        <h1 type="display3" className="events-title">Events</h1>
        <div className="events-events">
          <div container spacing={40} alignItems="stretch" justify="space-around">
            {this.state.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
