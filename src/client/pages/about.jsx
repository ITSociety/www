import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';

import Typography from 'material-ui/Typography';

import { Loading } from '../partial';
import { getEndpoint } from '../util';

const formatCommitteeMembers = members => members.map(member => (
  <Grid item key={member.id} xs={12} sm={6} md={4} className="committee-container">
    <Link to={`/member/${member.id}`} className="committee-clickable">
      <div className="committee-image" style={{ backgroundImage: `url(${member.image})` }} />
      <Typography type="display1" component="h2">{member.name}</Typography>
      <Typography type="headline" component="h3">{member.role}</Typography>
    </Link>
  </Grid>
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
        <Grid container spacing={0} alignItems="stretch" justify="space-between">
          {this.state.children}
        </Grid>
      </div>
    );
  }
}
