import { createSlice } from "@reduxjs/toolkit";

const initialState={
    articleData:[]
};


const articleSlice=createSlice({

    name:"article",
    initialState

})

export default articleSlice;