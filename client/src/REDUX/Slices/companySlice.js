import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../helper/axiosInstance.js";

const initialState={
    isLoggedIn: localStorage.getItem("isLoggedInCompany") || false,
    data:localStorage.getItem("dataCompany")!=undefined?JSON.parse(localStorage.getItem("data")):{},
    
}

export const companyRegistration=createAsyncThunk("company/registration",async (data)=>{
try {

    const res=axiosInstance.post("/company/register",data);
    toast.promise(res,{
        loading:"wait! your account creating",
        success: (data) => {
            return data?.data?.message;
        },
        error:"Failed to create account"
    })

    return (await res).data;
    
} catch (error) {
    toast.error(err?.response?.data?.message);
}

})



const companySlice=createSlice({

    name:"company",
    initialState,
  extraReducers:(builder)=>{
   
    builder.addCase(companyRegistration.fulfilled,(state,action)=>{

        localStorage.setItem("isLoggedInCompany",true);
        localStorage.setItem("dataCompany",JSON.stringify(action?.payload?.company));
        state.isLoggedIn=true;
        state.data=action?.payload?.company;

    })

  }

})

export default companySlice;