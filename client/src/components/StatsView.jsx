import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import "./StatsPage.css"
function StatsView() {
    const url=useSelector(state=>state.url)
    const id=useParams().code;
    const [stats,setStats]=useState();
    useEffect(()=>{
        axios.get(url+`shorturls/${id}`,{withCredentials:true})
        .then((response)=>{
            setStats(response.data);
            console.log(response.data);
           console.log(stats.clickDetails)

        })
        .catch(err=>console.log(err)
        )
    },[])
  return (
    <div>
        
        {stats && (
        <div className="stats-result">
          <p><strong>Original URL:</strong> <a href={stats.url}>{stats.url}</a></p>
          <p><strong>Shortcode:</strong> {stats.shortcode}</p>
          <p><strong>Created At:</strong> {new Date(stats.createdAt).toLocaleString()}</p>
          <p><strong>Expires At:</strong> {new Date(stats.expiry).toLocaleString()}</p>
          <p><strong>Total Clicks:</strong> {stats.totalClicks}</p>
          <div className="click-details">
            <strong>Click Details:</strong>
            <ul>
              {stats.clickDetails.length>0 ? stats.clickDetails.map((click, i) => (
                <li key={i}>
                  {new Date(click.timestamp).toLocaleString()} — {click.location} (referrer: {click.referrer})
                </li>
              )):<>
             <p>No Clicks</p> 
              </>}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default StatsView