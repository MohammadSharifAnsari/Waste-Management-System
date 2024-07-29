import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    data:localStorage.getItem("data")!=undefined?JSON.parse(localStorage.getItem("data")):{},
    
}

const companySlice=createSlice({

    name:"company",
    initialState,


})

export default companySlice;