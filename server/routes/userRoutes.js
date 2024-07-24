
import express from "express";
import upload from "../middleware/multer.middleware.js";
import {register} from "../controller/user.controller.js"
const router=express.Router();

router.post('/register',upload.single('avatar'),register);


export default router;