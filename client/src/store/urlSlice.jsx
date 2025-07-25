import { createSlice } from "@reduxjs/toolkit";

const urlSlice=createSlice({
    name:"url",
    initialState:import.meta.env.SERVER,
    reducers:{}
})
export default urlSlice.reducer