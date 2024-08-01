import React, { useEffect, useState } from "react";
import PageIndex from "../../PageIndex/PageIndex";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticle, postComment } from "../../../REDUX/Slices/articleSlice.js";

function AsideMenu({id}) {

  const dispatch=useDispatch();
  const naviagte=useNavigate();
  // const [x,setx]=useState([]);
  const [text,settext]=useState("");
  const user=JSON.parse(localStorage.getItem("data"));
  const allArticles=useSelector((state)=>{
    return state?.article?.articleData;
})
console.log("allArticles",allArticles);
const el = allArticles.find(el => el._id.trim() === id.trim());
console.log("el in menu",el);


const [comments,setcomments]=useState(el?.comments||[]);


  // let comments = el?.comments||[];
  // comments.push(...(el?.comments));
  // comments=x;
  // {
  //   id: 1,
  //   username: "Faizan",
  //   comment: "Very Nice!",
  // },
  // {
  //   id: 2,
  //   username: "Hammad",
  //   comment: "Impressive ❤️",
  // },


  // content,userid, articleid

  async function handleSubmit(e){
    
    e.preventDefault();
    
    const obj={
      content:text,
      userid:user?._id,
      articleid:id
  
    }
    console.log("obj>>",obj);

    const res=await dispatch(postComment(obj));
    const response=await dispatch(getAllArticle);
    
    settext("");
    setcomments(el?.comments||[]);

    if(res?.payload?.success){
naviagte("/");
    }
    

}

// useEffect(()=>{
// setcomments(el?.comments||[]);
// },[text]);

  return (
    <aside className="w-[80vw] md:m-0 m-auto rounded-lg bg-custom-link-blue md:text-2xl md:rounded-l-lg p-6 text-white h-fit font-semibold md:w-[min(20rem,25vw)]">
      <h4 className="text-2xl md:text-xl">Comments:</h4>
      <form noValidate onSubmit={handleSubmit} >
        <textarea
          name="comment"
          value={text}
         onChange={(e)=>{
settext(e.target.value);
         }}
          className="md:text-sm text-md bg-gray-200 rounded-lg text-gray-900 px-2 py-1 mt-2 w-[70vw] md:w-[20vw] lg:w-[15vw] h-fit resize-y min-h-56 max-h-80"
          placeholder="Add Comment..."
        ></textarea>
        <button type="submit" className="md:text-sm text-md bg-green-300 px-5 py-1 rounded-xl shadow-md text-black">
          Submit
        </button>
      </form>
      <ul className="md:text-sm text-lg">
        {
        

            comments.map((e) => (
              <li key={e.id} className="my-4">
              <h5 className="md:text-sm text-lg">{e?.user}:</h5>
              <p className="md:text-sm text-lg bg-custom-offWhite rounded-lg text-gray-500 px-2 py-1 mt-1 overflow-scroll">
              {e?.content}
              </p>
              </li>
            ))
          
        
        }
      </ul>
    </aside>
  );
}

export default AsideMenu;
