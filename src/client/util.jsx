import React from 'react';
import { Link } from 'react-router-dom';


module.exports = {
  listToLink: link => link.map(item => {
    const { link: url, title, className } = item;
    let button;
    if (url.charAt(0) === '/') {
      button = <Link to={url}>{title}</Link>;
    } else {
      button = <a href={url}>{title}</a>;
    }

    return (
      <li key={title} className={className || ''}>
        {button}
      </li>
    );
  }),
};
