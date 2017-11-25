import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import MediaQuery from 'react-responsive';
import Divider from 'material-ui/Divider';
import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';


import { listToLink } from '../util.jsx';

const Sidenav = ({ open, onClose, menuItems }) => (
  <Drawer open={open} onRequestClose={onClose}>
    <div
      tabIndex={0}
      role="button"
      onClick={onClose}
      onKeyDown={onClose}
    >
      {menuItems}
      <Divider />
    </div>
  </Drawer>
);


const Burger = ({ onClick }) => (
  <MediaQuery maxWidth={540}>
    <IconButton className="menu-button" aria-label="Menu" onClick={onClick}>
      <MenuIcon />
    </IconButton>
  </MediaQuery>
);

const menuItems = [
  { link: '/', title: 'Home', className: 'selected' },
  { link: 'https://membership.upsu.net/', title: 'UPSU' },
  { link: 'https://www.facebook.com/UoPItSociety/', title: 'Facebook' },
];


export default class Appbar extends Component {
  constructor(props) {
    super(props);
    this.state = { drawerOpen: false };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }

  render() {
    const { toggleDrawer, state } = this;
    const renderedMenuItems = listToLink(menuItems);
    const sideNavItems = <List className="sidenav">{renderedMenuItems}</List>;
    return (
      <div className={`appbar ${this.props.className}`}>
        <div className="appbar-inner gutter">
          <Burger onClick={this.toggleDrawer} />
          <Sidenav open={state.drawerOpen} onClose={toggleDrawer} menuItems={sideNavItems} />
          <ul className="menu-items">{renderedMenuItems}</ul>
        </div>
      </div>
    );
  }
}

Appbar.defaultProps = {
  className: '',
  children: [],
};
