import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import "./login.css"
import axios from"axios"
import { Navigate, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
export default function Login() {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const[loading,setLoading]=useState(false)
    const url=useSelector(state=>state.url);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const onsubmit=()=>{
        setLoading(true);
        axios.post(url+"auth/login",{email,password},{withCredentials:true})
        .then((response)=>{
            dispatch(addUser(response.data.user));
            console.log(response.data.user);
            navigate("/"); 
        })
        .catch(err=>console.log(err))
        .finally(()=>setLoading(false))
    }
  if (loading) return <div style={{display:"flex", justifyContent:"center",alignContent:"center", height:"100vh"}}><CircularProgress color="success" /></div>; 
  return (
    <div className='login'>
    <h1>Login</h1>
    <div className="loginbox">
        <input type="email"
         name="email" 
         placeholder='Enter your email'
         onChange={(e)=>setEmail(e.target.value)}
         required
          />
          <input type="password"
         name="password" 
         placeholder='Enter your Password'
         onChange={(e)=>setPassword(e.target.value)}
         required
          />
          <button onClick={onsubmit}>Login</button>
    </div>
    </div>

  )
}
