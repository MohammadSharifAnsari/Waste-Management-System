
import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice.js";
import companySlice from "./Slices/companySlice.js";
import articleSlice from "./Slices/articleSlice.js";

const store=configureStore({
    reducer:{
        user:userSlice,
        company:companySlice,
        article:articleSlice,
    }
});

export default store;