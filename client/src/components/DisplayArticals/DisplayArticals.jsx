import React, { useEffect, useState } from "react";
import AsideMenu from "./AsideMenu/AsideMenu";
import LArticalCard from "./LArticalCard/LArticalCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllArticle } from "../../REDUX/Slices/articleSlice.js";

function DisplayArticals() {
  // const articalsContents = [
  //   {
  //     _id: 1,
  //     heading: "Get started with Tailwind CSS",
  //     content:
  //       "Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.",
  //     imageUrl: "",
  //     author: "Tailwind Labs Inc.",
  //   },
  //   {
  //     _id: 2,
  //     heading: "Get started with Tailwind CSS",
  //     content:
  //       "Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.",
  //     imageUrl: "",
  //     author: "Tailwind Labs Inc.",
  //   },
  // ];

let articalsContents=[];
  const [allArticles,setallArticles]=useState([]); 

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [isLoading,setisLoading]=useState(false);



  allArticles&&allArticles.map((el,idx)=>{
    articalsContents.push({
      id:el._id,
      heading:el.title,
      content:el.cover_content,
      imageUrl:el.media,
      author:el.author,

    })
  })

  
async function onload(){

    setisLoading(true);
    const response=await dispatch(getAllArticle());
    
    
    if(response?.payload?.message){
    
     setallArticles(response?.payload?.article);
    
    }
    setisLoading(false);



}

  useEffect(()=>{

  onload();
console.log("useEffect worlking")

  },[]);
  // articalsContent._id
  // key={para.subHeading}
  return (
    <main className="flex md:flex-row flex-col justify-between mb-8">

    {isLoading&&"loading..." }

      <section className="flex justify-between flex-col items-center gap-8 p-8 bg-custom-offWhite md:rounded-r-xl w-full md:w-fit">
        {articalsContents.map((articalsContent,idx) => (
          <LArticalCard key={idx} {...articalsContent}  />
        ))}
      </section>
      {/* <AsideMenu /> */}
    </main>
  );
}

export default DisplayArticals;
