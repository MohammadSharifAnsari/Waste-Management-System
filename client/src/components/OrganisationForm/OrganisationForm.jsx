import React, { useState } from 'react'
import HeadquarterForm from './HeadquarterForm/HeadquarterForm'
import { companyRegistration } from '../../REDUX/Slices/companySlice.js';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { isEmail } from '../../helper/regex.js';

function OrganisationForm() {

  // name, email, password,address,headquaters:[{location ,
  //   companyName, contactNo}] 

  const dispatch=useDispatch();
const navigate=useNavigate();

  const [companyData,setcompanyData]=useState({
    name:"",
    email:"",
    password:"",
    address:"",
    avatar:undefined,
    headquaters:[]
  });

  function handleImageUpload(e){

    e.preventDefault();
   
    const uploadedImage = e.target.files[0];
    
    if(uploadedImage){
      setcompanyData({...companyData,avatar:uploadedImage});
    }
     

  }

  function handleInput(e){

    e.preventDefault();
   
    const {name,value}=e.target;
   setcompanyData({...companyData,[name]:value});

  }

 async function handleFormSubmit(e){

e.preventDefault();

if(!companyData?.name||!companyData?.email||!companyData?.password||!companyData?.address){
  toast.error("Fill up require field");
  return ;
}

if(!isEmail(companyData?.email)){

  toast.error("Invalid email");

}

const formdata=new FormData();

// name:"",
// email:"",
// password:"",
// address:"",
// avatar:undefined,
// headquaters:[]
// formdata.append("name",companyData?.name);
// formdata.append("email",companyData?.email);
// formdata.append("password",companyData?.password);
// formdata.append("address",companyData?.address);
// formdata.append("avatar",companyData?.avatar);
// formdata.append(headquaters,companyData?.headquaters);
// console.log(headquaters,companyData?.headquaters);
// console.log(headquaters,companyData?.headquaters);

const response=await dispatch(companyRegistration(companyData));

if(response?.payload?.success){
  navigate("/");
}


  }


  return (
    <main className='min-h-screen py-28 px-12'>
      <form onSubmit={ handleFormSubmit } className='flex flex-col justify-center items-center gap-5 bg-custom-offWhite p-5 rounded-xl shadow-md'>
        <h2 className='text-3xl font-medium'>Join as a Organisation</h2>
        <input type="text" name='name' onChange={handleInput} value={companyData.name} placeholder='Organisation Name' className='bg-gray-200 px-3 py-1 rounded w-[60vw] drop-shadow-md'/>
        <input type="email" name='email' onChange={handleInput} value={companyData.email}  placeholder='Email' className='bg-gray-200 px-3 py-1 rounded w-[60vw] drop-shadow-md'/>
        <input type="password" name='password' onChange={handleInput} value={companyData.password}  placeholder='Password' className='bg-gray-200 px-3 py-1 rounded w-[60vw] drop-shadow-md'/>
        <input type="text" name='address' onChange={handleInput} value={companyData.address}  placeholder='Organisation Address' className='bg-gray-200 px-3 py-1 rounded w-[60vw] drop-shadow-md'/>
        <input type='text' placeholder='Organisation Contact' className='bg-gray-200 px-3 py-1 rounded w-[60vw] drop-shadow-md'/>
        <input type='file' onChange={handleImageUpload} placeholder='Organisation Profile' className='bg-gray-200 px-3 py-1 rounded w-[60vw] drop-shadow-md' title='Organisation Profile'/>
        <input type='text' placeholder='Materials Accepted' className='bg-gray-200 px-3 py-1 rounded w-[60vw] drop-shadow-md'/>
        <HeadquarterForm  setcompanyData={setcompanyData} companyData={companyData}/>
        <button type='submit' className='bg-green-300 py-2 px-12 rounded-md text-lg font-bold shadow hover:scale-105 transition duration-200 ease-in-out'>Join Us</button>
      </form>
    </main>
  )
}

export default OrganisationForm
