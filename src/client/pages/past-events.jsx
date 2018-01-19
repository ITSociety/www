import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';

import { Loading } from '../partial';
import { getEndpoint, markdownToReact } from '../util.jsx';

export default class PastEventsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { children: <Loading /> };
  }

  async componentWillMount() {
    const oldEvents = await getEndpoint('/api/contentful/events/past');
    const children = oldEvents.map(({
      id, name, start, details, image,
    }) => (
      <div>
        <h1>{name}</h1>
        <p>{start}</p>
        <Link to={`/past-event/${id}`}>Link</Link>
        <div>{markdownToReact(details)}</div>
      </div>
    ));
    // do some parsing and present nicely
    this.setState({ children });
  }

  render() {
    return (
      <div className="page">
        {this.state.children}
      </div>
    );
  }
}
