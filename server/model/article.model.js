import mongoose from "mongoose";




const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tags: { type: [String] },
  media:{
    //is id ke though avatar ko uniquely identify kara jaega
  public_id:{
    type:String
  },
  //is url ke throuh avatar ko access kar ajaega yeh clodnary la url hai jahan image store hogi
  secure_url:{
    type:String
  },
  //below two string used for forget password
  
  
},
  published: { type: Boolean, default: false },
  comments: [
    {
      user: { type: String, required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model('Article', articleSchema);

