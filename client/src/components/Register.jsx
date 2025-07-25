import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
export default function Register() {
  const url = useSelector((state) => state.url);
  const [name, setName] = useState("");
const[loading,setLoading]=useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(url + "auth/register", { name, email, password })
      .then((response) => {
        toast.success(response.data.message, {
          autoClose: 1500,
          pauseOnHover: false,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(()=>{
        setLoading(false)
      })
  };
  if (loading) return <div style={{display:"flex", justifyContent:"center",alignContent:"center", height:"100vh"}}><CircularProgress color="success" /></div>; 
  
  return (
    <div className="login">
      <h1>Register</h1>
      <div className="loginbox">
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      </div>
      <ToastContainer theme="colored" style={{ marginTop: "10vh" }} />
    </div>
  );
}
