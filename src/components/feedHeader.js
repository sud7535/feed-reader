import React from 'react';
import './css/Feed.css'
export default function FeedHeader(){
  const uname = sessionStorage.getItem('name');
  return (
    <div className="header">
      <p className="username">Hello <span>{uname}</span></p>
    </div>
  )
}
