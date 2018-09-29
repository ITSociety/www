const request = require('request-promise');
const cheerio = require('cheerio');

const soclist = 'https://membership.upsu.net/';

const linkDOM = '[data-tags~="societies"]>a';
const socTitleDOM = 'h2.mega.h1';
const membersDOM = '.label.bg.upsu';

/**
 * Go to the UPSU page
 * Parse to DOM with cheerio
 * pull the links out with some magic
 */
const getLinks = async () => {
  const htmlString = await request(soclist);
  const $ = cheerio.load(htmlString);
  const links = Array.from($(linkDOM));
  const socLinks = links.map(lnk => lnk.attribs.href);
  return socLinks;
};

/**
 * Queries used in parsePage have been crafted to return one child
 * This is used to extract the text from it
 * @param {HTMLDOM} dom cheerio parsed dom element
 */
const getText = dom => dom[0].children[0].data.trim();

/**
 * Given a string of HTML, load it in to cheerio
 * get the title and number of members
 * @param {string} page Page requested
 */
const parsePage = (page) => {
  const $ = cheerio.load(page);
  const title = getText($(socTitleDOM));

  // it's assumed that the slug is based on the soc name
  // but all lowers and hyphenated
  const linkSuffix = title
    .replace(/\([a-zA-Z]*\)/gi, '')
    .trim()
    .replace(/ /g, '-')
    .toLowerCase();

  const link = `https://membership.upsu.net/group/${linkSuffix}`;
  const members = getText($(membersDOM)).replace(/ Members/, '');
  return { title, link, members };
};

const sortByMembers = (socA, socB) => {
  const socAMembers = parseInt(socA.members, 10);
  const socBMembers = parseInt(socB.members, 10);
  if (socAMembers > socBMembers) {
    return -1;
  } else if (socAMembers < socBMembers) {
    return 1;
  }
  return 0;
};

/**
 * get all soc links
 * map a parsePage to get their title and number of members
 * sort them and return
 */
const getMembers = async () => {
  const links = await getLinks();
  const pages = await Promise.all(links.map(request));
  return pages.map(parsePage).sort(sortByMembers);
};

module.exports = getMembers;
