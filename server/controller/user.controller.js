
import usermodel from "../model/User.Model.js";
import AppError from "../utils/error.utils.js";
import bcrypt from "bcrypt";
import fs from 'fs/promises';

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 100,//7 days ke liye cookie set hogi
    httpOnly: true,
    secure: true
}

async function register(req,res,next){

    try {
        const { name, email, password } = req.body;
       
        if (!name || !email || !password) {
            //baar baar same error likhna is not a good practice
            //  res.status(400).json({
            //     success:false,
            //     message:"all feild required"
            // })
            return next(new AppError("All feild are required", 400));// yahan par humko ek error mil gyi hai ab is error ko responce me bhejne ke liye we use middleware and next keh rha hai ki error ko aage bhej do
        }

        //1st method to check duplicacy
        // duplicate entry daal rhe ho then 11000 error dega jisse pta lag jaega ki hum duplicate entry daal rhe hain ya nhi


        //2nd methos to check duplicacy

        const userexist = await usermodel.findOne({ email });                          

        if (userexist) {
            
            return next(new AppError("Email already exists", 400));
        }
        //now if user not exists in database then first create it and then update client profile
        // password=bcrypt.hash('password',10); instead of this we also use schema level validation

        const user = await usermodel.create({
            name,
            email,
            password,
            avatar: {
                public_id: email,
                //secure_url me usne cloudinary service ka url diya hai jo image store kar rha tha
                secure_url: 'https://tse2.mm.bing.net/th?id=OIP.rBroxJeka0Jj81uw9g2PwAHaHa&pid=Api&P=0&h=220'
            }
        });
        if (!user) {
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
                    folder: 'LMS',//kaun se folder se upload karna hai humara project LMS me hai taki cvlient bhi access kar sake
                    width: 250,//by default heigt and width is in pexel unit
                    height: 250,
                    gravity: 'faces',//focus image ke fase pe rakhna hai
                    crop: 'fill'//crop karke khali jagah nhi dikhni chahiye


                });
                //agar clodinary pe image store ho jae then user ki public_id ko cloudinary ki public_id se and user ki secure_url ko cloudinary ke secure url se change kar dena we set our clodinary credential in root means server.js
                if (result) {

                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url;
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
        user.password=await bcrypt.hash('password',10);
        console.log("i am here line 106");
        await user.save();
        user.password = undefined;// hum user ka password responce me nhi bhejna chahte hain
        // ab user register ho gya hai ab hum yahin par usko login kara lete hain now we are going to generate token
        const token = await user.generateJWTToken();// we generate token at schema level
        console.log("i am at line 111");

        res.cookie('token', token, cookieOptions);
        console.log("i am at line 114");
        res.status(201).json({
            success: true,
            message: "user register succesfully",
            user
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

// {
//     "name":"Sharif",
//     "email":"mohammadsharifansari157@gmail.com",
//     "password":"Sharif1234@",
//     "role":"ADMIN"
// }


export {register};