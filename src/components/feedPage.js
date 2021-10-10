import React, { useState } from 'react';
import FeedHeader from './feedHeader';
import Axios from 'axios';
import './css/Feed.css'

function FeedList(){
  const [feedListArr,setFeedArr] = useState([]); 
  const [contentSnip,setContentSnip] = useState("");
  async function getFeed(){
    try {
      const response = await Axios.post("http://localhost:5000/fetch", {
        id: sessionStorage.getItem('id'),
      });
      if (response.data) {
        setFeedArr(response.data)
      }
      else {
        console.log(response.data)
      }
    } catch (err) {
      console.log(err);
    }
  }
  getFeed();
  return(
    <div className="rsslist">
    {feedListArr.map(arr =>{
      return (
        <div className="card">
          <div dangerouslySetInnerHTML={{ __html: arr.content}}></div>;
          <a href={arr.link}>{arr.title}</a>
        </div>
      )
    })}
    </div>
  )
}

function PreviewFrame(){
  return(
  <div className="preview">
    <iframe src="https://google.com" title="Preview"></iframe> 
  </div>
  )
}

function FeedSideBar(){
  async function addFeed(){
    const feedUrl = prompt("Add Feed URL")
    try {
      const response = await Axios.post("http://localhost:5000/url", {
        url: feedUrl,
        id: sessionStorage.getItem('id'),
      });
      if (response.data.ok === true) {
        alert("Site Added")
      }
      else {
        alert("failed")
      }
    } catch (err) {
      console.log(err);
    }
  }
  return(
    <div className = "navigation">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      </link>
      <ul>
        <li>
          <a href = "#">
            <span className = "icon"><i className="fa fa-home" aria-hidden="true"></i></span>
            <span className="title">Profile</span>
          </a>
        </li>
        <li>
          <a href = "#" onClick={addFeed}>
            <span className = "icon"><i className="fa fa-plus-circle" aria-hidden="true"></i></span>
            <span className="title">Add Feed</span>
          </a>
        </li>            
        <li>
          <a href = "#">
            <span className = "icon"><i className="fa fa-heart" aria-hidden="true"></i></span>
            <span className="title">Favourites</span>
          </a>
        </li>
        <li>
          <a href = "#">
            <span className = "icon"><i className="fa fa-moon-o" aria-hidden="true"></i></span>
            <span className="title">Theme</span>
          </a>
        </li>
        <li>
          <a href = "#">
            <span className = "icon"><i className="fa fa-info-circle" aria-hidden="true"></i></span>
            <span className="title">Help</span>
          </a>
        </li>            
      </ul>
    </div>  
  )
}

export default function FeedPage() {
  return (
    <div>
      <FeedHeader/>
      <div className="mainContent">
      <FeedSideBar/>
        <FeedList/>
        <PreviewFrame/>
      </div>
    </div>
  )
}
