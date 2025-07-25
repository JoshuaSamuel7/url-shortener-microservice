import React, { useState } from "react";
import axios from "axios";
import "./ShortnerForm.css";
import { useSelector } from "react-redux";

export const UrlShortener = () => {
  const[userurl,setUserUrl]=useState("");
  const [shortUrl,setShortUrl]=useState("");
  const url=useSelector((state)=>state.url)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(userurl);
      const res = await axios.post(url+"shorturls", {url: userurl },{withCredentials:true});
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      alert("Failed to shorten URL");
    }
  };
  return (
    <div className="shortener-form">
      <h2 style={{color:"black",marginBottom:"5vh"}}>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter long URL"
          value={userurl}
          onChange={(e) => setUserUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <p>
          <div className="div" style={{color:"black", display:"inline"}}>Short URL:</div> <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
        </p>
      )}
    </div>
  );
};