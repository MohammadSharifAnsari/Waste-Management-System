import React, { useState } from "react";
import { updataUser } from "../../../REDUX/Slices/userSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// {
//   coverImageUrl = "",
//   username = "USER",
//   orgName = "Organisation name",
//   address = "Address",
// }
function ProfileHeader() 

{

  const user=JSON.parse(localStorage.getItem("data"));

const dispatch=useDispatch();
const navigate=useNavigate();
let coverImageUrl=user?.avatar?.secure_url;
console.log("coverImageUrl>>",coverImageUrl);
const username=user?.name;
const orgName="";
const address=user?.address;

console.log("coverurl>>",coverImageUrl);
  const [avatarSelected, setAvatarSelected] = useState("");
let [uploadedImage,setuploadImage]=useState();
// const [check,setcheck]=useState("start");
// console.log("check",check);
  async function handleImageChange(e){
    e.preventDefault();
    // setcheck("end");
    // console.log("render");
     uploadedImage = e.target.files[0];
    setuploadImage(e.target.files[0])
console.log("uploadedImage",uploadedImage);
    if(uploadedImage){
      const fileReader=new FileReader();
      console.log("start");
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load",function(){
        setAvatarSelected(this.result);
      })
      
      console.log("avatar>>",avatarSelected);

    }

  }

  async function handleFormSubmit(e){
    e.preventDefault();
   console.log("handleformsubmit start");
    const formdata=new FormData();

    formdata.append("avatar",uploadedImage);
    console.log("uploadImage>>",uploadedImage);
console.log(formdata.entries());
    const res=await dispatch(updataUser([user._id,formdata]));

    setAvatarSelected("");
    console.log("resp>>>",res);
    if(res?.payload?.success){


      navigate("/")
    }


  }

  return (
    <header
      className={`relative left-0 w-full bg-no-repeat bg-cover md:h-[20rem] sm:h-[15rem] h-[10rem] top-0 mb-16 bg-zinc-500`}
      style={{
        backgroundImage: `url(${ "/images/article_cover.webp"
        })`,
      }}
    >
      {/* coverImageUrl
      /images/Avatar.webp */}
      <div className="absolute flex flex-col gap-5 text-wrap md:top-64 sm:top-48 left-10 top-28 bg-black md:h-36 md:w-36 h-32 w-32 rounded-full drop-shadow-lg">
        {
          avatarSelected?(
            <img
              src={avatarSelected}
              alt="avatar"
              className="bg-black h-full w-full rounded-full"
            />
          ):(
            <img
              src={coverImageUrl||`/images/Avatar.webp`}
              alt="avatar"
              className="bg-black h-full w-full rounded-full"
            />

          )
        }


      </div>
      <div className="absolute flex flex-col text-wrap md:left-52 md:top-80 sm:top-60 left-48 top-40 cursor-default  gap-1 ">
        <h3 className="text-black sm:text-2xl text-xl font-semibold ">
          {username}
        </h3>
        {orgName ? (
          <>
            <p className="text-gray text-sm">{orgName}</p>
          </>
        ) : (
          ""
        )}
        {address ? (
          <>
            <p className="text-gray text-sm">{address}</p>
          </>
        ) : (
          ""
        )}
        <form noValidate onSubmit={handleFormSubmit}  className="flex flex-col text-wrap">
          {avatarSelected ? (
            <button  type="submit" className="text-left text-custom-link-blue text-sm hover:underline cursor-pointer">
              Upload
            </button>
          ) : (
            <label
              htmlFor="avatar"
              className="text-custom-link-blue text-sm hover:underline cursor-pointer"
            >
              Change profile image
            </label>
          )}

          <input
            type="file"
            id="avatar"
            className={`file:hidden text-sm ${
              avatarSelected ? "" : "text-transparent text-gray-100 underline"
            }`}
            // accept="image/png, image/jpeg"
            accept=".jpg,.png,.svg,.jpeg"
            // value={avatarSelected}
            name="image"
            onChange={handleImageChange}
          />
        </form>
      </div>
    </header>
  );
}

export default ProfileHeader;
