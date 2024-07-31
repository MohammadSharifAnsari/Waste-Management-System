import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance.js";
import toast from "react-hot-toast";
import { json } from "react-router-dom";
const initialState = {
    // isLoggedIn check ki user login hai ya nhi
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    // isLoggedIn:false,
    // role show about the role of user
    role: localStorage.getItem("role") || "user",
    // data me extra data regarding user store karaenge
    data: localStorage.getItem("data")!=undefined?JSON.parse(localStorage.getItem("data")) : {},
};


export const createAccount = createAsyncThunk("/auth/signup", async (data) =>{
    //create account itself an object
    try {
        const res = axiosInstance.post("/user/register", data);
        // const res=await axiosInstance.post('user/register',data);
        //when toast give according to state of promise
        //res is promise
        toast.promise(res, {
            loading: "wait! your account creating",
            success: (data) => {
                return data?.data?.message;
            },
          
            error: "Failed to create account",
        });

        return (await res).data;
    } catch (error) {
      
        toast.error(error?.response?.data?.message);
    }
});

export const logout=createAsyncThunk("/auth/logout",async()=>{
    try{
        const res=axiosInstance.get("user/logout");
        console.log("logout thunck>>",res);
        toast.promise(res,{
            loading:"logout in progress",
            success:(state)=>{
                console.log("state in logout>>",state);
                return state?.data?.message;
            },
            error:"Failed to logout"
        })
return (await res).data;

    }
    catch(err){
        toast.error(error?.response?.data?.message);
    }
})

export const login=createAsyncThunk("/auth/login",async(data)=>{

    try{
const res=axiosInstance.post("/user/login",data);

toast.promise(res,{
    loading:"wait! login is in process",
    success:(data)=>{
        console.log("data in createAsyncThunk of login>>",data);
return data?.data?.message;
    },
    error:"Failed to create account"
})

return (await res).data;

    }
    catch(err){
        toast.error(err?.response?.data?.message);
    }

})

const userSlice=createSlice({
name:"user",
initialState,

extraReducers:(builder)=>{

    builder.addCase(createAccount.fulfilled,(state,action)=>{

localStorage.setItem("isLoggedIn",true);
localStorage.setItem("role",action?.payload?.user?.role);

    }).addCase(login.fulfilled,(state,action)=>{

        console.log("login.fulfilled>>",login.fulfilled());
        localStorage.setItem("isLoggedIn",true);
localStorage.setItem("role",action?.payload?.user?.role);
localStorage.setItem("data",JSON.stringify(action?.payload?.user));
state.isLoggedIn=true;
state.role=action?.payload?.user?.role;
state.data=action?.payload?.user;

    })
    .addCase(logout.fulfilled,(state,action)=>{
        localStorage.clear();
        state.isLoggedIn=false;
        state.role="user";
        state.data={};
    })

}

});


export default userSlice.reducer;