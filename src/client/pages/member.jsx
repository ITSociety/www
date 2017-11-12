import React, { Component } from 'react';
import { Loading } from '../partial';
import { getEndpoint, markdownToReact } from '../util.jsx';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Icon from 'material-ui/Icon';

const generatePage = member => {
  <div className='member'>
    
};


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
    // this.setState({ children });
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
