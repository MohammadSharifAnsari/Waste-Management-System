import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../REDUX/Slices/userSlice.js";
function Navbar() {
  
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const isLoggedIn=useSelector((state)=>{
return state?.user?.isLoggedIn;
  })
  const role=useSelector((state)=>{
    return state?.user?.role;
  })

  async function handleLogout(e){
e.preventDefault();

const res=await dispatch(logout());
console.log("logout res>",res);
if(res?.payload?.success){
  navigate("/");
}

  }

  return (
    <>
      <nav className="absolute top-0 left-0 z-10 flex items-center justify-between w-full p-3 sm:px-6 text-white bg-black bg-opacity-60">
        <Link
          to={"/"}
          className="sm:p-1 sm:px-5 py-[2px] px-3 text-[12px] sm:text-lg text-black bg-white rounded w-fit "
        >
          Logo
        </Link>
        <div>
          <ul className="flex flex-wrap items-center sm:gap-4 gap-2">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
            
                `nav_link ${isActive ? "text-custom-link-blue" : "text-white"}`
              }
            >
              Where to recycle?
            </NavLink>
            <NavLink
              to={"/resourses"}
          
              className={({ isActive }) =>
                `nav_link ${isActive ? "text-custom-link-blue" : "text-white"}`
              }
            >
              Resources
            </NavLink>

{
isLoggedIn?(
  <>
  <Link onClick={handleLogout} className="sign_in_btn">
              logout
            </Link>
  <Link to={"/profile"} className="sign_in_btn">
              profile
            </Link>
  </>
):(
  <>
  <Link to={"/signIn"} className="sign_in_btn">
login
</Link>
  <Link to={"/signIn"} className="sign_in_btn">
Signup
</Link>
  </>
)

}
          


          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
