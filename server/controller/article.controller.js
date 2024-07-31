import articleModel from "../model/article.model.js";
import usermodel from "../model/User.Model.js";
import AppError from "../utils/error.utils.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import path from "path";


async function getAllArticles(req,res,next){
    try {
        const article = await articleModel.find({});
    
        
        return res.status(200).json({
          success: true,
          message: "All Articles",
          article,
        });
      } catch (err) {
        return next(new AppError(err.message, 400));
      }

}

async function postArticles(req,res,next){

  try{
    console.log("start");

    const {title,main_content,cover_content,sub_title,sub_content,author,vediolink}=req.body;

    if(!title||!main_content||!cover_content){
      return next(new AppError("All fields are required",400));
    }

    const article=await articleModel.create({
      title,
      main_content,
      cover_content,
      sub_title,
      sub_content,
      author,
      vediolink
    });
    console.log("articlres>>",article);
    console.log("req.file>>",req.file);
  
    if(req.file){

      try{
         console.log("shuru karo>>",req.file.path);
        const result=await cloudinary.v2.uploader.upload(req.file.path,{
          folder: 'Waste Manegement system',//kaun se folder se upload karna hai humara project LMS me hai taki cvlient bhi access kar sake
          width: 250,//by default heigt and width is in pexel unit
          height: 250,
          gravity: 'faces',//focus image ke fase pe rakhna hai
          crop: 'fill'
          
        })
        console.log("result>>",result);
        if (result) {
          
          article.media.public_id=result.public_id;
          article.media.secure_url=result.secure_url;
          //remove file from server 
          fs.rm(`uploads/${req.file.filename}`);
          
        }
      }
      catch(err){

        return next(new AppError(err || "file not uploaded,please try again", 404));
        
      }


    }

await article.save();

return res.status(200).json({
  success:true,
  message:"article post succesfully",
article
})

  }
  catch(err){

    return next(new AppError(err.message,400));
  }
 
}
async function deleteArticle(req,res,next){
  try{

    const {id}=req.params;


  const deletedArticle=await articleModel.findByIdAndDelete(id);
if(!deletedArticle){

  return next(new AppError("article of this id is not exist",400));
}


  return res.status(200).json({
    success:true,
    "message":"article deleted succesfully",
    deletedArticle
  })


  }
  catch(err){

    return next(new AppError(err.message,400));

  }

}
async function updateArticle(req,res,next){
  
  try{
    const {title,main_content,cover_content,sub_title,sub_content,author,vediolink}=req.body;
const {id}=req.params;
       if(!title&&!main_content&&!cover_content){
        return next(new AppError("Fields are required",400));
       }

       const article=await articleModel.findById(id);

       if(!article){
        return next(new AppError("Article with this id is not exist",400));
       }
       if(title){
        article.title=title;
       }
       if(main_content){
        article.main_content=main_content;
       }
       if(cover_content){
        article.cover_contentcovern_content;
       }
       if(author){
        article.author=author;
       }
       if(vediolink)
       {
        article.vediolink=vediolink;
       }
       if(sub_title)
       {
        article.sub_title=sub_title;
       }
       if(sub_content){
        article.sub_content=sub_content;
       }
       console.log("content>>",title);       
console.log("content>>",main_content);       
console.log("author>>",author);       
console.log("req.file>>",req.file);
if (req.file) {
  //agar koi profile bhi di gyi hai then first hum user ke avatar ko jo cloudinary pe save hai usko destry karenge
// console.log("article.media>>",article.media.public_id);
  // await cloudinary.v2.uploader.destroy(article.media.public_id);
  //now we can upload new image to cloudinary
  try {

      //req.file.path=> give us the path to the file where image has been stored
      // cloudinary.v2.uploader.upload(file, options).then(callback);
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'Waste Manegement system',//kaun se folder se upload karna hai humara project LMS me hai taki cvlient bhi access kar sake
          width: 250,//by default heigt and width is in pexel unit
          height: 250,
          gravity: 'faces',//focus image ke fase pe rakhna hai
          crop: 'fill'//crop karke khali jagah nhi dikhni chahiye


      });
      //agar clodinary pe image store ho jae then user ki public_id ko cloudinary ki public_id se and user ki secure_url ko cloudinary ke secure url se change kar dena we set our clodinary credential in root means server.js

      console.log("result>>",result);
      if (result) {

        article.media.public_id = result.public_id;
        article.media.secure_url = result.secure_url;
          //remove file from server 
          fs.rm(`uploads/${req.file.filename}`);

      }
      //but clodinary pe directly upload nhi hoga pehle hum log login karenge jisse humare credential set honge on cloudinary



  }
  catch (err) {

      return next(new AppError(err || "file not uploaded,please try again", 404));

  }

}
await article.save();

return res.status(200).json({

  success:true,
  message:"article updated successfully",
  article

})

  }
  catch(err){
    console.log("errrrr>>",err);
return next(new AppError(err||"Something went wrong",400));
  }

}
async function PostComment(req,res,next)
{
  const { content,userid, articleid} = req.body;
  if(!articleid)
  {
   return next(new AppError(400, "article does not exist"));
  }
  const users= await usermodel.findById(userid);
  const article= await articleModel.findById(articleid);
  const comment= {
    user:users.name,
    content:content,
    createdAt:Date.now()
  }
 
  article.comments.push(comment)

article.save()
  return res.json({
    success:true,
    message:"Comment post successfully",
    article
  })

}

// postArticles,getAllArticles
export {postArticles,getAllArticles,deleteArticle,updateArticle,PostComment};