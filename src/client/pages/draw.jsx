import React, { Component } from 'react';
import openSocket from 'socket.io-client';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { FormGroup } from 'material-ui/Form';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';

const genList = numbers => (
  <List className="number-list">
    <li>
      <ul>
        <ListSubheader>Entries</ListSubheader>
        {numbers.map(number => (
          <ListItem key={number}>
            <ListItemText primary={`${number}`} />
          </ListItem>
        ))}
      </ul>
    </li>
  </List>
);

Array.prototype.random = function random() {
  const { length } = this;
  const rand = Math.floor(Math.random() * length);
  return this[rand];
};

export default class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = { numbers: [] };
    this.sendNumber = this.sendNumber.bind(this);
    this.showWinner = this.showWinner.bind(this);
    this.appendNumber = this.appendNumber.bind(this);
    this.socket = openSocket(window.location.origin);
    this.socket.on('numbers', this.appendNumber);
  }

  sendNumber(ev) {
    if (!ev.key || ev.key === 'Enter') {
      const { value: number } = this.input;
      this.socket.emit('number', number);
    }
  }

  appendNumber(nums) {
    const numbers = [...nums, ...this.state.numbers];
    this.setState({ numbers });
  }

  showWinner() {
    const winner = this.state.numbers.random();
    this.setState({ winner });
  }

  render() {
    return (
      <div className="draw gutter dark-row">
        <Typography type="display3" className="events-title">Prize Draw</Typography>
        <Card className="main-draw">
          <CardContent>
            <Grid container spacing={40} alignItems="stretch" justify="space-around">
              <div className="draw-numbers">
                <FormGroup>
                  <TextField
                    id="name"
                    label="UP Number"
                    onKeyUp={this.sendNumber}
                    margin="normal"
                    inputRef={input => this.input = input}
                  />
                  <Button variant="raised" color="secondary" onClick={this.sendNumber}>Submit</Button>
                  <Button variant="raised" color="secondary" onClick={this.showWinner}>Get Winner</Button>
                  <h1>{this.state.winner}</h1>
                </FormGroup>
                {genList(this.state.numbers)}
              </div>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}
