import React from 'react';
import FeedHeader from './feedHeader';
import Axios from 'axios';
import './css/Feed.css'
function FeedSideBar(){
  async function getInput(){
    const id = sessionStorage.getItem('id');
    console.log(id);
    const url = prompt("Enter feed URL","url");
    try {
      const response = await Axios.post("http://localhost:5000/addfeed", {
        url: url,
        id: id,
      });
      if (response.data.ok === true) {
        prompt("Site Added")
        console.log(response.data.title)
      }
      else {
        prompt("Invalid URL");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return(
    <div>
     <button onClick={getInput}>Add</button> 
    </div>
  )
}

export default function FeedPage() {
    return (
        <div>
            <FeedHeader/>
            <FeedSideBar/>
        </div>
    )
}
