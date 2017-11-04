import React from 'react';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import MediaQuery from 'react-responsive';

import { listToLink } from '../util.jsx';

const Burger = () => (
  <MediaQuery maxWidth={960}>
    <IconButton className="menu-button" aria-label="Menu">
      <MenuIcon />
    </IconButton>
  </MediaQuery>
);

const menuItems = [
  { link: '/', title: 'Home', className: 'selected' },
  { link: 'https://membership.upsu.net/', title: 'UPSU' },
  { link: 'https://www.facebook.com/UoPItSociety/', title: 'Facebook' },
];

const Appbar = ({ className }) => {
  // const renderedMenuItems = menuItems.map(item => (
  //   <li key={item.title} className={item.className || ''}>
  //     <a href={item.link}>{item.title}</a>
  //   </li>
  // ));
  const renderedMenuItems = listToLink(menuItems);

  return (
    <div className={`appbar ${className}`}>
      <div className="appbar-inner gutter">
        <Burger />
        <ul className="menu-items">{renderedMenuItems}</ul>
      </div>
    </div>
  );
};

Appbar.defaultProps = {
  className: '',
  children: [],
};

export default Appbar;
