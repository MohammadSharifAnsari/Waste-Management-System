import React, { useState } from "react";
import SocialIcons from "../SocialIcons/SocialIcons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { isEmail } from "../../helper/regex.js";
import { createAccount, login } from "../../REDUX/Slices/userSlice.js";

function SignForm({ pageRequest = "signIn" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [formType, setFormType] = useState("signIn");
  const [animate, setAnimate] = useState("");
  const [Content, setContent] = useState({
    heading: "Welcome Back!",
    subHeading: "Enter your personel details to use all of sites feature",
    btnText: "Sign In",
  });

  const [signupData, setsignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sideContent = [
    {
      heading: "Hello, Friends!",
      subHeading:
        "register with your personel details to use all of sites feature",
      btnText: "Sign Up",
    },
    {
      heading: "Welcome Back!",
      subHeading: "Enter your personel details to use all of sites feature",
      btnText: "Sign In",
    },
  ];

  const handleChangeForm = () => {
    if (formType === "signIn") {
      setContent(sideContent[0]);
      setFormType("signUp");
      setAnimate("-translate-x-full rounded-l-[inherit] rounded-r-[20%]");
    } else if (formType === "signUp") {
      setFormType("signIn");
      setAnimate("rounded-r-[inherit] rounded-l-[20%]");
      setContent(sideContent[1]);
    }
  };

  function handleInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    // setsignupData((state)=>(
    //   {...state,[name]:value}
    // ))

    setsignupData({ ...signupData, [name]: value });
  }

  async function createAccountSignup(event) {
    event.preventDefault();

    if (!signupData?.name || !signupData?.email || !signupData?.password) {
      toast.error("All field are required");
      return;
    }

    if (!isEmail(signupData.email)) {
      toast.error("Invalid Email");
      return;
    }
    const response = await dispatch(createAccount(signupData));

    if (response?.payload?.success) {
      navigate("/");
    }
    setsignupData({
      name: "",
      email: "",
      password: "",
    });
  }

  async function loginAccount(event) {
    event.preventDefault();

    if (!email || !password) {
      toast.error("All field required");
      return;
    }
    if (!isEmail(email)) {
      toast.error("Invalid Email");
      return;
    }
    console.log("email in login>>", email);
    console.log("password in login>>", password);

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    console.log("formData>>", formData);

    let obj = {
      email: `${email}`,
      password: `${password}`,
    };
    console.log("obj=", obj);

    const response = await dispatch(login(obj));
    console.log("response of login >>", response);
    if (response?.payload?.success) {
      navigate("/");
    }
  }

  return (
    <main className="relative top-0 flex justify-center items-center h-screen bg-[url('/images/sign_cover.webp')] bg-cover">
      <section className="flex lg:w-[50vw]  h-[60vh] sm:w-[80vw] w-[90vw] rounded-2xl bg-white cursor-default">
        {formType === "signIn" ? (
          <div className="w-1/2 rounded-l-[inherit] flex justify-center items-center flex-col gap-3">
            <h2 className="text-2xl font-semibold ">Sign In</h2>
            <SocialIcons />
            <p className="text-gray-700">or use email or password</p>
            <form
              noValidate
              className="flex justify-center items-center flex-col gap-3"
              onSubmit={loginAccount}
            >
              <input
                type="text"
                placeholder="Email"
                className="bg-zinc-100 sm:px-4 px-3 py-2 rounded-lg shadow-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-zinc-100 sm:px-4 px-3 py-2 rounded-lg shadow-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-custom-link-blue text-sm cursor-pointer mt-10">
                forget password?
              </p>
              <button
                type="submit"
                className="bg-green-300 py-1 px-10 rounded-xl drop-shadow-lg font-medium hover:scale-105 hover:border hover:border-black"
              >
                Sign In
              </button>
            </form>
          </div>
        ) : (
          <div className="translate-x-full w-1/2 rounded-l-[inherit] flex justify-center items-center flex-col gap-3">
            <h2 className="text-2xl font-semibold ">Create Account</h2>
            <SocialIcons />
            <p className="text-gray-700 sm:w-fit w-[12rem] text-center">
              or use your email for registration
            </p>
            <form
              noValidate
              onSubmit={createAccountSignup}
              className="flex justify-center items-center flex-col gap-3"
              // action="/"
            >
              <input
                onChange={handleInput}
                type="text"
                placeholder="Name"
                required
                id="name"
                name="name"
                className="bg-zinc-100 sm:px-4 px-3 py-2 rounded-lg shadow-md"
                value={signupData?.name}
              />
              <input
                onChange={handleInput}
                value={signupData?.email}
                type="email"
                name="email"
                placeholder="Email"
                className="bg-zinc-100 sm:px-4 px-3 py-2 rounded-lg shadow-md"
              />
              <input
                onChange={handleInput}
                value={signupData?.password}
                type="password"
                name="password"
                placeholder="Password"
                className="bg-zinc-100 sm:px-4 px-3 py-2 rounded-lg shadow-md"
              />
              <button
                type="submit"
                className="bg-green-300 py-1 px-10 rounded-xl drop-shadow-lg font-medium hover:scale-105 hover:border hover:border-black"
              >
                Sign Up
              </button>
            </form>
          </div>
        )}

        <div className="absolute bottom-0 left-0 p-6 text-sm w-full sm:text-xl text-center text-white bg-black bg-opacity-30">
          All Rights Reserved | abc@google.com
        </div>

        <div
          className={`w-1/2 rounded-[inherit] rounded-l-[20%] flex justify-center flex-col items-center bg-[url('/images/sign_image2.webp')] text-white gap-3 transition-all duration-700 ${animate}`}
        >
          <h3 className="text-2xl font-bold ">{Content.heading}</h3>
          <p className="text-center w-[70%]">{Content.subHeading}</p>
          <button
            onClick={handleChangeForm}
            className="bg-white bg-opacity-20 py-1 px-10 rounded-xl drop-shadow-lg font-medium hover:scale-105 hover:border hover:border-black"
          >
            {Content.btnText}
          </button>
        </div>
      </section>
    </main>
  );
}

export default SignForm;
