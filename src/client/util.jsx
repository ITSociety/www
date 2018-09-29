import { h } from 'preact';
import { Link } from 'preact-router/match';
import marked from 'marked';
import htmlToReact from 'html-react-parser';
import Markdown from 'preact-markdown';

const opts = {
  gfm: true,
  sanitize: true,
  smartypants: true,
  breaks: true,
};

export const listToLink = link => link.map((item) => {
  const { link: url, title, className } = item;
  let button;
  if (url.charAt(0) === '/') {
    button = <Link href={url}>{title}</Link>;
  } else {
    button = <a href={url}>{title}</a>;
  }

  return (
    <li key={title} className={className || ''}>
      {button}
    </li>
  );
});

export const getEndpoint = (...end) => fetch(...end).then(res => res.json());


export const markdownToReact = str => <Markdown markdown={str} markupOpts={opts} markdownOpts={opts} />;
