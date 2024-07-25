
import express from "express";
import upload from "../middleware/multer.middleware.js";
import {register,login,logout,getprofile,changepassword,updateuser,forgot,reset} from "../controller/user.controller.js"
import isloggedin from "../middleware/auth.login.middleware.js";
const router=express.Router();

router.post('/register',upload.single('avatar'),register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isloggedin,getprofile);
router.post('/changepassword',isloggedin,changepassword);
router.put('/update/:id',upload.single('avatar'),isloggedin,updateuser);
router.post('/forgot-password',forgot);
router.post('/reset-password/:resetToken',reset);


// router.put('/update/:id',upload.single('avatar'),isloggedin,updateuser);

export default router;