import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import { Loading } from '../partial';
import { getEndpoint, markdownToReact } from '../util.jsx';

const formatCommitteeMembers = members => members.map(member => (
  <div className="member" key={member.id}>
    <a href={`mailto:${member.email}`}><h1 className="member-name">{member.name}</h1></a>
    <h2>{member.role}</h2>
    <img src={member.image} alt={member.name} />
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
        <Typography type="display3" gutterBottom className="about-title">The Committee</Typography>
        <Grid container spacing={0} alignItems="stretch" justify="space-around" className="gutter">
          {this.state.children}
        </Grid>
      </div>
    );
  }
}
