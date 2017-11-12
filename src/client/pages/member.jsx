import React, { Component } from 'react';
import { Loading } from '../partial';
import { getEndpoint, markdownToReact } from '../util.jsx';

const generatePage = member => {

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
    this.setState({ children });
  }
}
