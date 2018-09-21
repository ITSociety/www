import { h, Component } from 'preact';
import format from 'date-fns/format';

import { Loading, Map } from '../partial';
import { getEndpoint, markdownToReact } from '../util';


const parsePrice = num => (num > 0 ? `${num.toFixed(2)}` : 'Free!');

// use an normal function as we require
const generatePage = (info) => {
  const { name, details, location, price, timing } = info;
  const parsedDetails = markdownToReact(details);
  const parsedPrice = parsePrice(price);

  const eventDate = new Date(timing.start);
  const humanDate = format(eventDate, 'dddd Do MMMM YYYY');
  const humanTime = format(eventDate, 'hh:mm a');
  // jesus
  location.lng = location.lon;
  delete location.lon;
  return (
    <div className="event">
      <div className="card horizontal">
        <div className="card-image">
          <Map location={location} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <h4 className="event-title">{name}</h4>
            <div className="event-timings">
              <span className="info">
                <i className="material-icons">date_range</i>
                <h6 className="event-date">{humanDate}</h6>
              </span>
              <span className="info">
                <i className="material-icons">access_time</i>
                <h6 className="event-date">{humanTime}</h6>
              </span>
            </div>
            <div className="event-cost">
              <i className="material-icons">attach_money</i>
              <h6 className="event-date">{parsedPrice}</h6>
            </div>
            <div className="event-detail-card">
              <div className="event-detail-card-container">
                <div>
                  <div className="event-details">{parsedDetails}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default class EventPage extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.state = { children: <Loading /> };
  }

  async componentDidMount() {
    const url = `/api/contentful/event/${this.id}`;
    const eventInfo = await getEndpoint(url);
    const children = generatePage(eventInfo);
    this.setState({ children });
  }

  render() {
    return (
      <div className="page">
        <div className="gutter">
          {this.state.children}
        </div>
      </div>
    );
  }
}

