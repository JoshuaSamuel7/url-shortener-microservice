import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function Register() {
    const url=useSelector(state=>state.url)
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post(url+"auth/register",{name,email,password})
        .then((response)=>{
            setMessage(response.data.message);
        })
        .catch(err=>setMessage(err.response.data.message));
    }
  return (
    <div className="login">
    <div style={{color:"white",fontSize:"1.5rem",position:"absolute",right:"3vw",top:"13vh"}}>{message}</div>
      <div className="loginbox">
        <h2 style={{color:'white'}}>Register</h2>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}
