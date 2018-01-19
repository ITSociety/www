import React, { Component } from 'react';

import { Loading } from '../partial';
import { getEndpoint } from '../util.jsx';

export default class PastEvent extends Component {
  constructor(props) {
    super(props);
    this.eventID = props.match.params.id;
    this.state = { children: <Loading /> };
  }

  async componentWillMount() {
    const pageInfo = await getEndpoint(`/api/contentful/event/${this.eventID}`);
    // do something with pageinfo
    this.setState({ children: pageInfo });
  }
  render() {
    return this.state.children;
  }
}
