import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

import { Loading } from '../partial';
import { getEndpoint, markdownToReact } from '../util.jsx';

export default class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = { children: <Loading /> };
  }

  async componentDidMount() {
    const committee = await getEndpoint('/api/contentful/committee');
    // do some parsing and present nicely
  }

  render() {
    return (
      <Grid container spacing={0} alignItems="stretch" justify="space-around" className="gutter">
        {this.state.children}
      </Grid>
    );
  }
}
