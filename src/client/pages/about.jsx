import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import chunk from 'lodash/chunk';

import { Loading } from '../partial';
import { getEndpoint } from '../util';

const formatCommitteeMembers = chunked => chunked.map((members) => {
  const mapped = members.map(member => (
    <div key={member.id} className="committee-container col s12 m6">
      <div className="card hoverable">
        <div className="card-content">
          <Link href={`/member/${encodeURIComponent(member.name)}`} className="committee-clickable">
            <div className="committee-image" style={{ backgroundImage: `url(${member.image})` }} />
            <h2>{member.name}</h2>
            <h3>{member.role}</h3>
          </Link>
        </div>
      </div>
    </div>
  ));
  return <div className="row">{mapped}</div>;
});

class About extends Component {
  constructor(props) {
    super(props);
    this.state = { children: <Loading /> };
  }

  async componentWillMount() {
    const committee = await getEndpoint('/api/contentful/committee');
    const children = formatCommitteeMembers(chunk(committee, 2));
    this.setState({ children });
  }

  render() {
    return (
      <div className="about gutter page">
        <h2 className="about-title">The Committee</h2>
        <div>
          {this.state.children}
        </div>
      </div>
    );
  }
}

export default About;
