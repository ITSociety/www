import React, { Component } from 'react';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import { Loading } from '../partial';
import { getEndpoint, markdownToReact } from '../util';

const generatePage = member => (
  <div className="member">
    <Card className="member-card">
      <CardMedia image={member.image} className="member-image" />
      <div className="member-content-container">
        <CardContent className="member-content">
          <div className="member-headline">
            <Typography type="display1">{member.name}</Typography>
            <Typography type="headline" component="h2" color="secondary">
              {member.role}
            </Typography>
          </div>
          <div className="member-para">
            {markdownToReact(member.content)}
          </div>
        </CardContent>
      </div>
    </Card>
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
