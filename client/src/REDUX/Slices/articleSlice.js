import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance.js";
import toast from "react-hot-toast";
const initialState={
    articleData:[]
};

export const addArticle=createAsyncThunk("article/add",async(data)=>{

    try{

        const res=axiosInstance.post("/article",data);

        toast.promise(res,{
            loading:"Adding your article",
            success:(state)=>{
                return state?.data?.message;
            },
            error:"Failed to add article"
        })

        return (await res).data;

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }

})

export const getAllArticle=createAsyncThunk("article/get",async()=>{
    try{

        const res=axiosInstance.get("/article");

        toast.promise(res,{
            loading:"loading all articles",
            success:(state)=>{
                return state?.data?.message;
            },
            error:"Failed to get article"
        })

        return (await res).data;

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})

export const postComment=createAsyncThunk("article/postcomment",async(data)=>{0
    try {
        
const res=axiosInstance.post("/article/comment",data);
toast.promise(res,{
    loading:"adding your comment...",
    success:(data)=>{
        return data?.data?.message;
    },
    error:"Failed to add comment !"
})

return (await res).data;

    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const articleSlice=createSlice({

    name:"article",
    initialState,
    extraReducers:(builder)=>{

        builder.addCase(getAllArticle.fulfilled,(state,action)=>{

            state.articleData=action?.payload?.article;
           
        })
   

    }

})

export default articleSlice.reducer;