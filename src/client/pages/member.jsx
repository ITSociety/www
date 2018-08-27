import { h, Component } from 'preact';

import { Loading } from '../partial';
import { getEndpoint, markdownToReact } from '../util';

const generatePage = member => (
  <div className="member">
    <div className="member-card">
      <div image={member.image} className="member-image" />
      <div className="member-content-container">
        <div className="member-content">
          <div className="member-headline">
            <h2 type="display1">{member.name}</h2>
            <h2 type="headline" component="h2" color="secondary">
              {member.role}
            </h2>
          </div>
          <div className="member-para">
            {markdownToReact(member.content)}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default class MemberPage extends Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.state = { children: <Loading /> };
  }

  async componentWillMount() {
    const url = `/api/contentful/committee/${this.id}`;
    const memberInfo = await getEndpoint(url);
    console.log(memberInfo);
    const children = generatePage(memberInfo);
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
