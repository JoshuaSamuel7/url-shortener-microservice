import { createSlice } from "@reduxjs/toolkit";

const urlSlice=createSlice({
    name:"url",
    initialState:"http://localhost:5000/",
    reducers:{}
})
export default urlSlice.reducer