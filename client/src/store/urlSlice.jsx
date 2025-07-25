import { createSlice } from "@reduxjs/toolkit";

const urlSlice=createSlice({
    name:"url",
    initialState:import.meta.env.VITE_SERVER,
    reducers:{}
})
export default urlSlice.reducer