import React, { useState } from "react";
import { Link , Navigate, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
const [form,setForm]=useState( {
  email:"",
  password:"",
  username:"",
})
const navigate = useNavigate();
const handleChange = (e)=>{
  setForm({...form, [e.target.name]: e.target.value})
}
const handleSubmit = async(e)=>{
  e.preventDefault();
try {
  const res = await fetch("http://localhost:5000/login", {
    method:"POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(form)
  })
  const data = await res.json()
  if(!res.ok){
    toast.error("User not found please signup first")
    navigate("/signup")  
  }
  else {
    toast.success("login succesfull")
    alert("login sucessfull")
  }

  
}
catch(err) {
  err.message
}
}

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-xl p-8 bg-neutral-800/60 backdrop-blur rounded-xl shadow-2xl shadow-green-400 border border-neutral-600">
        <header className="mb-6 flex flex-col items-center justify-center">
          <img src="/spotify.svg" alt="spotify logo" className="size-12 mb-2" />
          <h1 className="text-lg sm:text-3xl font-bold">
            Login to Start Listening
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm block mb-2">
              Enter your resgistered email
            </label>
            <input
            onChange={handleChange}
            value={form.email}
              name="email"
              type="email"
              placeholder="enter your email"
              autoComplete="off"
              className="w-full rounded-lg p-3  bg-neutral-900 border outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="text-sm block mb-2">
              Enter your resgistered password
            </label>
            <input
            value={form.password}
            onChange={handleChange}
              name="password"
              type="password"
              placeholder="enter your password"
              autoComplete="off"
              className="w-full rounded-lg p-3  bg-neutral-900 border outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="text-sm block mb-2">
              Enter your resgistered name
            </label>
            <input
            value={form.username}
            onChange={handleChange}
              name="username"
              type="text"
              placeholder="enter your name"
              autoComplete="off"
              className="w-full rounded-lg p-3  bg-neutral-900 border outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
           <button className="bg-emerald-500 hover:bg-emerald-400 w-full rounded-full active:bg-emerald-600 transition text-black font-semibold py-2"
          type="submit"
          >Login</button>
          <div>
            <p className="text-sm">Dont't have an account? <Link to={"/signup"} className="hover:underline">Sign up</Link> </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
