import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StatsPage.css";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const StatsPage = () => {
  const [shortcode, setShortcode] = useState("");
  const url=useSelector(state=>state.url);
  const [allcodes,setAllCodes]=useState([]);
  const [error,setError]=useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    axios.get(url+"shorturls/getAll",{withCredentials:true})
  .then((response)=>{
    setAllCodes(response.data.message);
  })
  .catch(err=>console.log(err)
  )
  },[])
  const checkShortCode=(e)=>{
    e.preventDefault();
     const exists = allcodes.some((code) => code.shortcode === shortcode);
    if(exists){
      navigate(`/stats/${shortcode}`)
    }else{
      toast.error("You are not the owner");
    }
  }
  return (
    <>
    
    <div className="stats-page">
      <h2>URL Statistics</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter shortcode"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
        />
        <button onClick={checkShortCode}>Get Stats</button>
      </div>

    </div>
    <div className="stats-page">
      <h3>Your Short Urls</h3>
      {
        allcodes.length>0?
        allcodes.map((code)=>{
          return(
            <div style={{margin:"1.5vh"}}>
              <a href={`/stats/${code.shortcode}`}>{code.shortcode}</a>
              </div>
          )
        }):<>
        No short Urls
        </>
      }
    </div>
    <ToastContainer theme="colored"/>
    </>
  );
}
export default StatsPage;
