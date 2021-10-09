const Parser = require('rss-parser');
const parser = new Parser();

async function getFeed(url){

  let feed = await parser.parseURL(url);

  feed.items.forEach(item => {
    console.log(item)
  });
  return feed.title;
};

// function getFeed(url){
//   feedTitle(url).then (feed => {
//       return feed.title
//   })
// }

module.exports = {
  getFeed : getFeed,
}
