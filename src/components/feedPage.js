import React, { useEffect, useState } from "react";
import Axios from "axios";
import parse from "html-react-parser";
import "./css/Feed.css";

function FeedHeader(props) {
  const uname = sessionStorage.getItem("name");
  async function addFeed() {
    const feedUrl = prompt("Add Feed URL");
    try {
      const response = await Axios.post("http://localhost:5000/url", {
        url: feedUrl,
        id: sessionStorage.getItem("id"),
      });
      if (response.data.ok === true) {
        alert("Site Added");
        props.onLoad("Data");
      } else {
        alert("failed");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="header">
      <span className="username">
        Hello <span>{uname}</span>
      </span>
      <img
        onClick={addFeed}
        alt="Add"
        src="https://www.svgrepo.com/show/125067/plus-sign.svg"
      />
    </div>
  );
}

function FeedList() {
  const [feedListArr, setFeedArr] = useState([]);
  function handlePrev(content) {
    window.open(content);
  }
  async function getFeed() {
    try {
      const response = await Axios.post("http://localhost:5000/fetch", {
        id: sessionStorage.getItem("id"),
      });
      if (response.data) {
        console.log(response.data);
        setFeedArr(response.data);
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="rsslist">
      {feedListArr.map((arr) => {
        return (
          <div className="card">
            <p>{arr.siteName}</p>
            <div className="title">
              <h3 onClick={() => handlePrev(arr.link)}>{arr.title}</h3>
              <div>{parse(arr.contentSnippet)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function FeedPage() {
  const [state, changeState] = useState("");
  function handleLoad() {
    changeState("Re-rendered");
    console.log(state);
  }
  return (
    <div className="feedBody">
      <FeedHeader onLoad={handleLoad} />
      <FeedList />
    </div>
  );
}
