import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import "./ShortnerForm.css"
export default function RedirectPage() {
    const url=useSelector((state)=>state.url);
    const id=useParams().code;
    const [error,setError] =useState("");
    useEffect(()=>{
        console.log(url+id);
        axios.get(url+id)
        .then((response)=>{
          console.log(response.data.url);
                        window.location.href=response.data.url;

        })
        .catch((err)=>setError(err.response?.data))
    },[])
    
  return (
    <div className='shortener-form'>
      <div style={{display:'flex', justifyContent:'center', alignContent:"center",fontSize:"1.5rem", color:"black"}}>Redirecting ....</div>
      <div style={{color:'black'}}>
        {error.error}
      </div>
    </div>
  )
}
