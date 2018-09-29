import { h, Component } from 'preact';

import { Loading } from '../partial';
import { getEndpoint, markdownToReact } from '../util';

const generatePage = member => (
  <div className="col s12 m8 push-m2">
    <div className="card">
      <div className="card-image">
        <img src={member.image} alt={member.name} />
        <span className="card-title">{member.name}</span>
      </div>
      <div className="card-content">
        {member.role}
        {markdownToReact(member.content)}
      </div>
    </div>
  </div>
);

export default class MemberPage extends Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.state = { children: <Loading /> };
  }

  async componentWillMount() {
    const memberInfo = await getEndpoint(`/api/contentful/committee/${this.name}`);
    const children = generatePage(memberInfo);
    this.setState({ children });
  }

  render() {
    return (
      <div className="page">
        <div className="gutter">
          <div className="row">
            {this.state.children}
          </div>
        </div>
      </div>
    );
  }
}
