import React, { useEffect, useState } from "react";
import ContentSection from "../ContentSection/ContentSection";
import ArticleForm from "./ArticleForm/ArticleForm.jsx";
import AsideMenu from "../DisplayArticals/AsideMenu/AsideMenu.jsx";
import { PreviewProvider } from "../../contexts/PreviewContext.js";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// {
//   mainHeading = "",
//   mainPara = "",
//   author = "",
//   PublishDate = "",
//   subParagraphs = [
//     {
//       subHeading: "",
//       subPara: "",
//       imageUrl: "",
//       videoLink: "",
//     },
//   ],
// }

function ArticalSection() {
  const [previewContent, setPreviewContent] = useState("");

const role=useSelector((state)=>{
  return state?.user?.role
})

const allArticles=useSelector((state)=>{
    return state?.article?.articleData;
})
const {id}=useParams();
console.log("id in article>>",id)
console.log("allArticles>>",allArticles);
console.log("role>>",role);


const el = allArticles.find(el => el._id.trim() === id.trim());

console.log("el===",el);

let arr=[];
arr.push({
  subHeading:el?.sub_title,
  subPara:el?.sub_content,
  videoLink:el?.vediolink,
  imageUrl:el?.media?.secure_url
});

const articleContent={
  mainHeading:el?.title,
  mainPara:el?.main_content,
  author:el?.author,
  PublishDate:el?.createdAt,
  subParagraphs:arr,

}


  const handlePreview = (content) => {
    console.log(content);
    const localContent = JSON.parse(localStorage.getItem("article"));
    setPreviewContent({ ...localContent });
  };

  useEffect(() => {
    const localContent = JSON.parse(localStorage.getItem("article"));
    setPreviewContent({ ...localContent });
  }, []);

  // role = "ADMIN";
  return (
    <PreviewProvider value={{ previewContent, handlePreview }}>
      {role === "ADMIN" ? (
        <main className="flex md:justify-between lg:flex-row flex-col mb-10">
          <ContentSection {...previewContent} />
          <ArticleForm />
        </main>
      ) : (
        <main className="flex md:justify-between lg:flex-row flex-col mb-10">
          <ContentSection {...articleContent} />
          <AsideMenu id={id} />
        </main>
      )}
    </PreviewProvider>
  );
}

export default ArticalSection;
