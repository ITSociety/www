import { h } from 'preact';

import { listToLink } from '../util';


const menuItems = [
  { link: '/', title: 'Home', className: 'selected' },
  { link: 'https://membership.upsu.net/', title: 'UPSU' },
  { link: 'https://www.facebook.com/UoPItSociety/', title: 'Facebook' },
];

const Appbar = ({ className }) => {
  const renderedMenuItems = listToLink(menuItems);

  return (
    <div className={`appbar ${className}`}>
      <div className="appbar-inner gutter">
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
