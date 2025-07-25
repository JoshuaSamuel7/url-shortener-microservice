import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { addUser } from "./store/userSlice";
import { UrlShortener } from "./components/ShortnerForm";
import StatsView from "./components/StatsView";
import Login from "./components/Login";
import RedirectPage from "./components/RedirectPage";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import CircularProgress from "@mui/material/CircularProgress";
import StatsPage from "./components/StatsPage";
import Error404 from "./components/Error404";
import About from "./components/About";
const App = () => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url);
  const {user} = useSelector((state) => state.user);  
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(url + "auth/current-user", { withCredentials: true })
      .then((response) => {
        dispatch(addUser(response.data));
      })
      .catch((err) => {
        console.log("User fetch failed:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, dispatch]);

  if (loading) return <div style={{display:"flex", justifyContent:"center",alignContent:"center"}}><CircularProgress color="success" /></div>; 

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={user ? <UrlShortener /> : <Navigate to="/login" />}
          />

          <Route path="/stats" element={user ? <StatsPage /> : <Navigate to="/login" />} />
          <Route path="/stats/:code" element={user ? <StatsView /> : <Navigate to="/login" />} />
          <Route path="/:code" element={<RedirectPage />} />
          <Route path="/about" element={<About   />} />
          <Route path="/notfound" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;