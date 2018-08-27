import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import { Loading } from '../partial';
import { getEndpoint } from '../util';

const formatCommitteeMembers = members => members.map(member => (
  <div item key={member.id} xs={12} sm={6} md={4} className="committee-container">
    <Link to={`/member/${member.id}`} className="committee-clickable">
      <div className="committee-image" style={{ backgroundImage: `url(${member.image})` }} />
      <h2 type="display1" component="h2">{member.name}</h2>
      <h2 type="headline" component="h3">{member.role}</h2>
    </Link>
  </div>
));

export default class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = { children: <Loading /> };
  }

  async componentWillMount() {
    const committee = await getEndpoint('/api/contentful/committee');
    const children = formatCommitteeMembers(committee);
    this.setState({ children });
  }

  render() {
    return (
      <div className="about gutter">
        <h2 type="display3" gutterBottom className="about-title">The Committee</h2>
        <div container spacing={0} alignItems="stretch" justify="space-between">
          {this.state.children}
        </div>
      </div>
    );
  }
}
