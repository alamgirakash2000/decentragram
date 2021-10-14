import Identicon from "identicon.js";
import React from "react";

export default function Header({ user }) {
  return (
    <div className='header'>
      <div className='container'>
        <h1>Decentragram</h1>
        <div className='right d-flex'>
          <p>{user}</p>
          {user ? (
            <img
              width='30'
              height='30'
              src={`data:image/svg+xml;base64,${new Identicon(
                user,
                30
              ).toString()}`}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
