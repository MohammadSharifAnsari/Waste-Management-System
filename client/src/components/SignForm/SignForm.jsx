import React from "react";
import SocialIcons from "../SocialIcons/SocialIcons";

function SignForm() {
  return (
    <main className="relative top-0 flex justify-center items-center h-screen bg-[url('/images/sign_cover.jpg')] bg-cover">
      {/* <section className="flex lg:w-[50vw]  h-[60vh] sm:w-[80vw] w-[90vw] rounded-2xl bg-white cursor-default">
        <div className="w-1/2 rounded-l-[inherit] flex justify-center items-center flex-col gap-3">
          <h2 className="text-2xl font-semibold ">Sign In</h2>
          <SocialIcons />
          <p className="text-gray-700">or use email or password</p>
          <form
            className="flex justify-center items-center flex-col gap-3"
            action="/"
          >
            <input
              type="text"
              placeholder="Email"
              className="bg-zinc-100 sm:px-4 px-3 py-2 rounded-lg shadow-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-zinc-100 sm:px-4 px-3 py-2 rounded-lg shadow-md"
            />
            <p className="text-custom-link-blue text-sm cursor-pointer mt-10">
              forget password?
            </p>
            <button className="bg-green-300 py-1 px-10 rounded-xl drop-shadow-lg font-medium hover:scale-105 hover:border hover:border-black">
              Sign In
            </button>
          </form>
        </div>
        <div className="w-1/2 rounded-[inherit] rounded-l-[20%] flex justify-center flex-col items-center bg-[url('/images/sign_image2.jpg')] text-white gap-3">
          <h3 className="text-2xl font-bold ">Hello, Friends!</h3>
          <p className="text-center w-[70%]">register with your personel details to use all of sites feature</p>
          <button className="bg-white bg-opacity-20 py-1 px-10 rounded-xl drop-shadow-lg font-medium hover:scale-105 hover:border hover:border-black">
              Sign Up
            </button>
        </div>
        <div className="absolute bottom-0 left-0 p-6 text-sm w-full sm:text-xl text-center text-white bg-black bg-opacity-30">
        All Rights Reserved | abc@google.com
      </div>
      </section> */}
      <section className="flex lg:w-[50vw]  h-[60vh] sm:w-[80vw] w-[90vw] rounded-2xl bg-white cursor-default">
        <div className="w-1/2 rounded-[inherit] rounded-r-[20%] flex justify-center flex-col items-center bg-[url('/images/sign_image2.jpg')] text-white gap-3">
          <h3 className="text-2xl font-bold ">Welcome Back!</h3>
          <p className="text-center w-[70%]">
            Enter your personel details to use all of sites feature
          </p>
          <button className="bg-white bg-opacity-20 py-1 px-10 rounded-xl drop-shadow-lg font-medium hover:scale-105 hover:border hover:border-black">
            Sign In
          </button>
        </div>
        <div className="w-1/2 rounded-l-[inherit] flex justify-center items-center flex-col gap-3">
          <h2 className="text-2xl font-semibold ">Create Account</h2>
          <SocialIcons />
          <p className="text-gray-700 sm:w-fit w-[12rem] text-center">or use your email for registration</p>
          <form
            className="flex justify-center items-center flex-col gap-3"
            action="/"
          >
            <input
              type="text"
              placeholder="Name"
              className="bg-zinc-100 sm:px-4 px-3 py-2 rounded-lg shadow-md"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-zinc-100 sm:px-4 px-3 py-2 rounded-lg shadow-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-zinc-100 sm:px-4 px-3 py-2 rounded-lg shadow-md"
            />
            <button className="bg-green-300 py-1 px-10 rounded-xl drop-shadow-lg font-medium hover:scale-105 hover:border hover:border-black">
              Sign Up
            </button>
          </form>
        </div>

        <div className="absolute bottom-0 left-0 p-6 text-sm w-full sm:text-xl text-center text-white bg-black bg-opacity-30">
          All Rights Reserved | abc@google.com
        </div>
      </section>
    </main>
  );
}

export default SignForm;