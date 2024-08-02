import React, { useState } from 'react'

function HeadquarterForm({index = 1,setcompanyData,companyData}) {

const [headquarterData,setheadquarterData]=useState({
  location:"" ,
    companyName:"",
     contactNo:"",
})
function handleInput(e){

  e.preventDefault();
 
  const {name,value}=e.target;
  setheadquarterData({...headquarterData,[name]:value});
  console.log("bsss kar de yrr chal j")
  if(headquarterData.location&&headquarterData.companyName&&headquarterData.contactNo){
    let arr=[headquarterData];
    console.log("inside HQ>>",headquarterData);
    setcompanyData({...companyData,headquaters:arr});
    console.log("companyData",companyData);
    // setheadquarterData({
    //   location:"" ,
    //   companyName:"",
    //    contactNo:"",
    // })
  }

}

  return (
    <>
    
      <h3 className='text-xl font-medium'>Headquarter : {index}</h3>
      <input type="text" onChange={handleInput}  name='companyName'   value={headquarterData?.companyName} placeholder='Headquarter Name' className='bg-gray-200 px-3 py-1 rounded w-[60vw] drop-shadow-md'/>

      <input type="text" onChange={handleInput} value={headquarterData?.location} name='location' placeholder='Headquarter Address' className='bg-gray-200 px-3 py-1 rounded w-[60vw] drop-shadow-md'/>

      <input type="text" onChange={handleInput} value={headquarterData?.contactNo} name='contactNo' placeholder='Headquarter Contact' className='bg-gray-200 px-3 py-1 rounded w-[60vw] drop-shadow-md'/>
    </>
  )
}

export default HeadquarterForm
