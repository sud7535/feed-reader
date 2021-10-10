const Parser = require('rss-parser');
const parser = new Parser();

async function getFeed(url){

  let feed = await parser.parseURL(url);

  // feed.items.forEach(item => {
  //   console.log(item)
  // });
  return feed.title;
};

async function getData(url){
  let feed = await parser.parseURL(url);
  return feed;
}
// function getFeed(url){
//   feedTitle(url).then (feed => {
//       return feed.title
//   })
// }

module.exports = {
  getFeed : getFeed,
  getData: getData
}
