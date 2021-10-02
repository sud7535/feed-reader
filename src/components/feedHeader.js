import React from 'react';

export default function FeedHeader(){
    const uname = sessionStorage.getItem('name');
    return (
        <div>
          <button></button>
            <p>Hello <span>{uname}</span></p>
        </div>
    )
}
