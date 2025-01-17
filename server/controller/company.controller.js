import CompanyModel from "../model/Company.Model.js"
import AppError from "../utils/error.utils.js";
import bcrypt from "bcrypt";
import fs from 'fs/promises';
import sendmail from "../utils/mailer.utils.js";
import crypto from "crypto";

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 100,//7 days ke liye cookie set hogi
    httpOnly: true,
    secure: true
}

async function register(req,res,next){
    // [{location ,
    //     companyName, contactNo}]
    try {
        const { name, email, password,address,headquaters } = req.body;
         console.log(name);
         console.log(password);
         console.log(email);

        if (!name || !email || !password) {
            //baar baar same error likhna is not a good practice
            //  res.status(400).json({
            //     success:false,
            //     message:"all feild required"
            // })
            return next(new AppError("All feild are required", 405));// yahan par humko ek error mil gyi hai ab is error ko responce me bhejne ke liye we use middleware and next keh rha hai ki error ko aage bhej do
        }

        //1st method to check duplicacy
        // duplicate entry daal rhe ho then 11000 error dega jisse pta lag jaega ki hum duplicate entry daal rhe hain ya nhi


        //2nd methos to check duplicacy
    
        console.log("headquaters-->",headquaters);

        const companyexist = await CompanyModel.findOne({ email });                          

        if (companyexist) {
            
            return next(new AppError("Email already exists", 400));
        }
        //now if user not exists in database then first create it and then update client profile
        // password=bcrypt.hash('password',10); instead of this we also use schema level validation
        // [headquaters[0]]
        console.log("befor")
        const company = await CompanyModel.create({
            name,
            email,
            password:await bcrypt.hash('password',10),
            address,
            headquaters,
            avatar: {
                public_id: email,
                //secure_url me usne cloudinary service ka url diya hai jo image store kar rha tha
                secure_url: 'https://tse2.mm.bing.net/th?id=OIP.rBroxJeka0Jj81uw9g2PwAHaHa&pid=Api&P=0&h=220'
            }
        });
        console.log("after")
        if (!company) {
            return next(new AppError("user not register,please try again", 500));
        }
        //agar userle uploaded create ho gya then profile updata (or file upload kar denge)
        //todo fi
        //ek general prpose bna de rhe hai ki jab bhi request aae uski body me jaker dekho ki form data aaya hai agar haan to first check karo ki avatar file aai hai ki nhi agar aai hai then multer ka use karke usko and change binary to image and store it into uploads folder
        if (req.file) {//req.file me humari image file ko middleware ne store kar diya hai

           

            //now we are going to upload our file to cloudinary
          
            try {
              
                //req.file.path=> give us the path to the file where image has been stored
                // cloudinary.v2.uploader.upload(file, options).then(callback);
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'Waste Management System',//kaun se folder se upload karna hai humara project LMS me hai taki cvlient bhi access kar sake
                    width: 250,//by default heigt and width is in pexel unit
                    height: 250,
                    gravity: 'faces',//focus image ke fase pe rakhna hai
                    crop: 'fill'//crop karke khali jagah nhi dikhni chahiye


                });
                //agar clodinary pe image store ho jae then user ki public_id ko cloudinary ki public_id se and user ki secure_url ko cloudinary ke secure url se change kar dena we set our clodinary credential in root means server.js
                if (result) {

                    company.avatar.public_id = result.public_id;
                    company.avatar.secure_url = result.secure_url;
                    //remove file from server 
                    fs.rm(`uploads/${req.file.filename}`);

                }
                //but clodinary pe directly upload nhi hoga pehle hum log login karenge jisse humare credential set honge on cloudinary



            }
            catch (err) {

                return next(new AppError(err || "file not uploaded,please try again", 404));

            }

           
        }

        // if(user.isModified('password')){
        //     next();
        //   }
          
        //   user.password=await bcrypt.hash('password',10);
        console.log("before hash password");
        company.password=await bcrypt.hash('password',10);
        console.log("userpassword saving time>>",company.password);
        // console.log("i am here line 106");
        await company.save();
        company.password = undefined;// hum user ka password responce me nhi bhejna chahte hain
        // ab user register ho gya hai ab hum yahin par usko login kara lete hain now we are going to generate token
        const token = await company.generateJWTToken();// we generate token at schema level
        console.log("i am at line 111");

        res.cookie('token', token, cookieOptions);
        console.log("i am at line 114");
        res.status(201).json({
            success: true,
            message: "user register succesfully",
           company
        })
        //ab sirf humara update profile baki hai woh kaise hot ahia woh seprate video me bataenge

    }
    catch (err) {

        console.log("Error>>",err)
        return res.status(410).json({
            success: false,
            messgae: err.message

        })

    }


}

async function login (req, res, next){
    try {

        let { email, password } = req.body;
        if (!email || !password) {
            return next(new AppError("email and password both are required", 405));
        }

        const company = await CompanyModel.findOne({ email }).select('+password');
        
    

// console.log("passsword",password);
// console.log("user.password",user.password);


console.log("user>>",company);

if (!company) {
    return next(new AppError("email is not register first register your email and then login", 403));
}
 const match=company.comparepassword(password);
//  asal me yahan wait use karna chahiye but mera compare password shi wrk kar nhi rha hai isliye await use nhi kar rhe
console.log("match>>>",match);
        if (!match) {
            return next(new AppError("please enter right password", 404));
        }
        const token = await company.generateJWTToken();
        company.password = undefined;
        res.cookie("token", token, cookieOptions);
        return res.status(200).json(
            {
                success: true,
                message: "now you are logged in",
                company
            }
        )
    }
    catch (err) {
        return next(new AppError(err.message, 500));



    }
}

async function logout(req,res,next){

  
    res.cookie('token', null, {
        secure: true,
        httpOnly: true,
        maxAge: 0
    })
    res.status(200).json({
        success: true,
        message: "you are logged out successfully",

    })

}

async function getprofile(req,res,next){

    try {

        const companyid = req.body.user.id;
        console.log("req.body.user>>",req.body.user);
        
        const company = await CompanyModel.findById(companyid);
        
        return res.status(200).json({
            success: true,
            message: "user detail",
            company

        })
    }
    catch (err) {
        return next(new AppError("failed to fetch user detail", 405));


    }

}

async function changepassword(req,res,next){

    const { oldpassword, newpassword } = req.body;
   

    const { id } = req.body.user;


    if (!oldpassword || !newpassword) {
        return next(new AppError("all feilds are mandatory", 400));
    }

    const company = await CompanyModel.findById(id).select('+password');

    if (!company) {
        return next(new AppError("user does not exist", 400));
    }

    const isoldpassword = company.comparepassword(oldpassword);
    //we use await here because comparepassword internally database se contact me hai
    console.log("isoldpassword=",isoldpassword);
    if (!isoldpassword) {
        return next(new AppError("user enter wrong password,please try again", 400));
    }
    // user.password = newpassword;
    company.password=await bcrypt.hash('newpassword',10);
    await company.save();
    company.password = undefined;

    res.status(200).json({
        success: true,
        message: "password changed successfully"
    })
}
async function updateuser(req,res,next){
    //is update me profile picture update kara rhe hai and name update kara rhe hai

    const { name, email,address,headquaters } = req.body;
  
    const { id } = req.params;
    

    const company = await CompanyModel.findById(id);
    if (!company) {
        return next(new AppError("user do not exist", 400));
    }


    if (name) {
        company.name = name;
        
    }
    if (address) {
        company.address = address;
        
    }
    if (email) {
        company.email = email;
        
    }
    // const arr=company.headquaters;
    
headquaters.map((el,idx)=>{
(company.headquaters).push(el);
})

// company.headquaters=arr;

    if (req.file) {
        //agar koi profile bhi di gyi hai then first hum user ke avatar ko jo cloudinary pe save hai usko destry karenge

        await cloudinary.v2.uploader.destroy(company.avatar.public_id);
        //now we can upload new image to cloudinary
        try {
      
            //req.file.path=> give us the path to the file where image has been stored
            // cloudinary.v2.uploader.upload(file, options).then(callback);
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'LMS',//kaun se folder se upload karna hai humara project LMS me hai taki cvlient bhi access kar sake
                width: 250,//by default heigt and width is in pexel unit
                height: 250,
                gravity: 'faces',//focus image ke fase pe rakhna hai
                crop: 'fill'//crop karke khali jagah nhi dikhni chahiye


            });
            //agar clodinary pe image store ho jae then user ki public_id ko cloudinary ki public_id se and user ki secure_url ko cloudinary ke secure url se change kar dena we set our clodinary credential in root means server.js
            if (result) {

                company.avatar.public_id = result.public_id;
                company.avatar.secure_url = result.secure_url;
                //remove file from server 
                fs.rm(`uploads/${req.file.filename}`);

            }
            //but clodinary pe directly upload nhi hoga pehle hum log login karenge jisse humare credential set honge on cloudinary



        }
        catch (err) {

            return next(new AppError(err || "file not uploaded,please try again", 404));

        }

    }
    await company.save();

    res.status(200).json(
        {
            success: true,
            message: "user update successfully"

        }
    )
}
async function forgot (req, res, next){

    const { email } = req.body;

    const company = await CompanyModel.findOne({ email });
    if (!email) {

        return next(new AppError("please enter user email", 400));

    }

    if (!company) {
        return next(new AppError("user not register", 406));
    }

    // generatepasswordresettoken() ek function userSchema me banaenge jo ek token banaenge password reset hone par
    const resettoken = await company.generatepasswordresettoken();

    //user ko mail bhejne se pehle token ko database me store bhi karna hai
    await company.save();//token se user ki do feild  forgetPasswordToken:String, forgetPasswordExpiry:Date ko bhar diya hai ab user ko save karenge
    //client me jo url bhejenge woh client jaisa hoga 
    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resettoken}`;
    // process.env.FRONTEND_URL  frontend se backend pe isi url ke through request kar rha hai basically backend(server) is url pe exists kar rha hai and reset-password wale path par jab hum jaenge to reset-password wala function call ho jaega ab yeh url hume user ko mail karna hai so uske liye ek function banaenege

    try {

        // const subject = "reset-password";
        // const message = `you can reset your password on clicking <a>${resetPasswordURL}</a> this url`;

        var message = {
            from: "mohammadsharifansari157@gmail.com",
            to: "mohammadsharifansari157@gmail.com",
            subject: "reset-password",
            text: `you can reset your password on clicking <a>${resetPasswordURL}</a> this url`,
           
          };
       const info= await sendmail(message);
       if(!info){
        return next(new AppError("Mail was not sent",400));
       }
      
        res.status(200).json({
            success: true,
            message: `reset password token has been sent to ${email}`,
            info
        })
    }
    catch (err) {
        //agar humara email send nhi ho pae by any reason then forgotpasswordtoken, forgotpasswordexpiry
        //ko undefined set kar denge for security pupose
        company.forgetPasswordToken = undefined;
        company.forgetPasswordExpiry = undefined;

        return next(new AppError(err.message, 400));

    }



}
async function reset(req, res, next){
    try {

        //jab reset-password forget0password ke baad call hoga then req url ke parama me whi token denge jo forget-password karte waqt humne database me store kara tha
        const { resetToken } = req.params;
        //now validate that token and then change the passwpord
        const { password } = req.body;
        //kyunki forgetpassword token database me encrypted form me store hai then first hum resetToken ko encrypt karenge then find karenge token in database
        const forgetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
       
        const company = await CompanyModel.findOne({
            forgetPasswordToken,
            //  forgetPasswordExpiry:{$gt:Date.now()}//isme check kar rhe hain ki passwordki expiry current time se greater hai ki nhi if hai then return true
        });
        if (!company) {
            return next(new AppError("invalid or expire token,please try again", 400))
        }
        company.password = password;
        company.forgetPasswordToken = undefined;
        company.forgetPasswordExpiry = undefined;
        await company.save();
        return res.status(200).json({
            success: true,
            message: "your passsword has been updated"
        })


    }
    catch (err) {
        return next(new AppError(err.message, 411));

    }

}


export {register,login,logout,getprofile,changepassword,updateuser,forgot,reset};