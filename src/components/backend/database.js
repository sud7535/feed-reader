const sqlite3 = require('sqlite3');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const { getFeed, getData } = require('./feedParser.js');

//This Segment won't autorun
//To run it:
//Go to the folder where database.js file is stored
//run node database.js along with yarn start

app.use(express.json());
app.use(cors());
app.listen(PORT, () => console.log("Backend server live"));

//Create table for user data, like account and all
const CUT = `CREATE TABLE IF NOT EXISTS user(
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    userName TEXT NOT NULL UNIQUE,
    userPass TEXT NOT NULL,
    userStore INTEGER UNIQUE
)`;

//Create table for site data, where site url and user who subscribed
//to site will be stored
const CST = `CREATE TABLE IF NOT EXISTS sitedata(
  siteName TEXT NOT NULL,
  siteURL TEXT NOT NULL,
  userId INTEGER
)`

//Create feed table, where all the content which is to be diaplayed on
//main page will be stored before being fetched
const CFT = `CREATE TABLE IF NOT EXISTS feed(
  userId integer NOT NULL,
  title TEXT NOT NULL UNIQUE,
  link TEXT NOT NULL,
  pubDate TEXT NOT NULL, 
  author TEXT NOT NULL,
  contentSnippet TEXT NOT NULL,
  content TEXT NOT NULL
)`;

//Connect to the database
let db = new sqlite3.Database('./sqlite.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the db');
});

//Create all tables
db.run(CUT);
db.run(CST);
db.run(CFT);

function addNewsToDB(url,id){
  async function add(){
    const data = await getData(url);
    const items = data.items;
    items.forEach((items)=>{
      db.run(`INSERT OR IGNORE INTO feed(userId,title,link,pubDate,author,contentSnippet,content) VALUES(?,?,?,?,?,?,?)`, 
        [id,items.title,items.link,items.pubDate,items.author,items.contentSnippet,items.content], function(err) {
        if (err) {
          return console.log(err.message);
        }
      }); 

    });
  }
  add(url)
}

function syncFeed(id){
  //Store all the feed data in database 
  console.log(id)
  db.all(`SELECT siteURL FROM sitedata WHERE userId = ?`, [id], (err, result) => {
    if (err) {
      throw err;
    }
    console.log("SyncFeed")
    result.forEach((result)=>{
      console.log(result.siteURL)
      addNewsToDB(result.siteURL,id)
    })
  });
  
}

//POST request for checking if cookie exists on server side
app.post("/ifcookie", function (req, res) {
  console.log("Checking for cookie")
  const cookie = req.body.cookie;
  console.log(cookie)
  let jsonData;
  db.get(`SELECT userId,userName FROM user WHERE userStore = ?`, [cookie], (err, result) => {
    if (err) {
      throw err;
    }
    if (result) {
      console.log("cookie found")
      jsonData = {
        ok: true,
        id: result.userId,
        name: result.userName, 
      }
      console.log(jsonData)
      syncFeed(result.userId);
      res.json(jsonData);
    }
    else {
      jsonData = {
        ok: false,
        id: null,
      }
      res.json(jsonData);
    }
  });
})

//For checking if login data given is correct or not
app.post("/login", function (req, res) {
  console.log("Checking for login")
  const user = req.body.user;
  const pass = req.body.pass;
  let jsonData;
  db.get(`SELECT userId,userStore FROM user WHERE userName = ? AND userPass = ?`, [user, pass], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result)
    if (result) {
      jsonData = {
        ok: true,
        id: `${result.userId}`,
        cookie: `${result.userStore}`,
        name: user,
      }
      syncFeed(result.userId);
    }
    else
    jsonData = {
      ok: false,
      id: null,
    }
  });
  res.json(jsonData);
})

//Sign up the user
app.post("/signup", function (req, res) {
  console.log("Checking for signup")
  const user = req.body.user;
  const pass = req.body.pass;
  const store = Date.now();
  console.log(store)
  db.run(`INSERT INTO user(userName,userPass,userStore) VALUES(?,?,?)`, [user, pass,store], function (err) {
    if (err) {
      return console.log(err.message);
    }
    else {
      console.log(this.lastID)
      let jsonData = {
        ok: true,
        id: this.lastID,
        cookie: store,
        name: user,
      };
      console.log(jsonData)
      res.json(jsonData);
    }
  });
})

app.post("/fetch", function (req, res) {
  db.all(`SELECT title,link,pubDate,author,contentSnippet,content FROM feed WHERE userId = ?`, [req.body.id], function (err,result) {
    if (err) {
      return console.log(err.message);
    }
    else {
      console.log(result)
      res.json(result)
    }
  });
})
//Add feed to the table CST
app.post("/url", function (req, res) {
  console.log("Got url")
  const url = req.body.url;
  console.log(url);
  console.log("Id:" + req.body.id)
  let title = '';
  async function handleTitle(title) {
    title = await getFeed(url);
    console.log(title);
    console.log("Hello" + title);
    if (title){
      db.run(`INSERT INTO sitedata(siteName,siteURL,userId) VALUES(?,?,?)`, [title, url,req.body.id], function (err) {
        if (err) {
          return console.log(err.message);
        }
        else {
          console.log('Pass')
          let jsonData = {
            ok: true,
            title: title,
          };
          console.log(jsonData)
          res.json(jsonData);
        }
      });
    }
  }
  handleTitle(title)
})
