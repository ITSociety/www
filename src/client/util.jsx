import React from 'react';
import { Link } from 'react-router-dom';
import marked from 'marked';
import htmlToReact from 'html-react-parser';


marked.setOptions({
  gfm: true,
  sanitize: true,
  smartypants: true,
  breaks: true,
});


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
  getEndpoint: end => fetch(end).then(res => res.json()),
  markdownToReact: str => {
    const convertedStr = marked(str);
    const reactElem = htmlToReact(convertedStr);
    return reactElem;
  },
};
