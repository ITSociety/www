import { h, Component } from 'preact';
import chunk from 'lodash/chunk';
import distanceInWords from 'date-fns/distance_in_words';
import { Link } from 'preact-router/match';

import Loading from '../loading';
import { getEndpoint, markdownToReact } from '../../util';

const parseEvents = group => group.map((events) => {
  const cols = events.map((event) => {
    const { eventName, additionalDetails, startTime, slug } = event.fields;
    const distance = distanceInWords((new Date()), new Date(startTime), { addSuffix: true });
    const parsed = markdownToReact(additionalDetails);
    return (
      <div className="col s12 m6">
        <div className="card">
          <div className="card-content">
            <span className="card-title">{eventName}</span>
            <span className="event-time">{distance}</span>
            {parsed}
          </div>
          <div className="card-action">
            <Link href={`/event/${slug}`}>Learn More</Link>
          </div>
        </div>
      </div>
    );
  });
  return <div className="row">{cols}</div>;
});

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { children: <Loading /> };
  }

  async componentWillMount() {
    const events = await getEndpoint('/api/contentful/events');
    if (events.length % 2 === 1) events.pop();
    const children = parseEvents(chunk(events, 2));
    this.setState({ children });
  }


  render() {
    return (
      <div className="events gutter">
        <h1 className="events-title">Events</h1>
        <div className="events-events">
          <div>
            {this.state.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
