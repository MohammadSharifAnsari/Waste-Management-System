import express from "express";
import isloggedin from "../middleware/auth.login.middleware.js";
import isAdmin from "../middleware/auth.admin.middleware.js";
import { postArticles,getAllArticles, deleteArticle,updateArticle} from "../controller/article.controller.js";
import upload from "../middleware/multer.middleware.js";
const router=express.Router();
//adadvideo or image
//delete video or image
//get all videos

router.route('/')
.get(getAllArticles)
.post(isloggedin,isAdmin('ADMIN'),upload.single('media'),postArticles);

router.route('/:id').delete(isloggedin,isAdmin('ADMIN'),deleteArticle).put(isloggedin,isAdmin('ADMIN'),upload.single('media'),updateArticle);





export default router;