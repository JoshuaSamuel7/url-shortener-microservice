import React, { useState } from "react";
import axios from "axios";
import "./ShortnerForm.css";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const UrlShortener = () => {
  const [userurl, setUserUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const url = useSelector((state) => state.url);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(userurl);
      const res = await axios.post(
        url + "shorturls",
        { url: userurl },
        { withCredentials: true }
      );
      setShortUrl(res.data.shortUrl);
      toast.success("Url Shortened")
    } catch (err) {
      toast.error("Error occurred in shortening")
      console.log(err);
    }
  };
  return (
    <div className="shortener-form">
      <h2 style={{ color: "black", marginBottom: "5vh" }}>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter long URL"
          variant="outlined"
          fullWidth
          value={userurl}
          onChange={(e) => setUserUrl(e.target.value)}
          sx={{
            "& .MuiInputBase-root": {
              height: "7vh",
              padding: 0,
              mb:"5vh"
            },
          }}
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <p>
          <div className="div" style={{ color: "black", display: "inline" }}>
            Short URL:
          </div>{" "}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
       <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
