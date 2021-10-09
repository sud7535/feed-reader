import React from 'react';
import FeedHeader from './feedHeader';
import Axios from 'axios';
import './css/Feed.css'

function FeedList(){
  return(
    <div className="rsslist">
      
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
          <a href = "#">
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
      <FeedSideBar/>
      <div className="mainContent">
        <FeedList/>
        <PreviewFrame/>
      </div>
    </div>
  )
}
