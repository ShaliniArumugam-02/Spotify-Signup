import React, { useState } from "react";
import {Link,  useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Signup = () => {

    const [form,setForm]=useState({
      email:"",
      password:"",
      username:"",
      day:"",
      month:"",
      year:"",
      gender:"",
      shareData:false,
      marketing:false,
      terms:false,
    });
    const [showPwd,setShowpwd]=useState(false);
    const[errors,setErros]=useState({});
    const navigate = useNavigate();

    const months = [
        "January", "February", "March", "Apirl", "May", "June", "July", "August", "September", "October", "November", "December"];

       const onChange = (e)=>{
        const {name,value,type,checked}=e.target
        setForm((prev)=> ({...prev, [name]: type === "checkbox"? checked : value}))
       }
       function validate() {
        const e= {};
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a vaild email.";
        if(!form.password || form.password.length<6) e.password = "Password must be at least 6 characters";
        if(!form.username) e.username= "Please enter a profile name";

        const day = parseInt(form.day,10);
        const year = parseInt(form.year,10);
        const monthIndex = Math.max(0, months.indexOf(form.month));

        const dob = new Date (year || 0, monthIndex, day || 0)
        const isVaildDate = Boolean(year && form.month && day && dob.getFullYear()===year && dob.getMonth()===monthIndex && dob.getDate()===day);
        if(!isVaildDate) e.dob= "Enter a valid date of birth";

        if(!form.gender)e.gender="Select a gender option";
        if(!form.terms)e.terms="You must accept the terms";

        setErros(e);
       
        return Object.keys(e).length===0;
        
       }

       const onSubmit = async(e)=> {
        e.preventDefault();

          if(!validate()){
            toast.error("please fix the error")
            return;
          }
        try {
          const res = await fetch("https://spotify-signup.onrender.com/signup" , {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(form)
          })
          const data = await res.json()
          if(!res) throw new Error(data.message)
           
          
          navigate("/")
          toast.success("signup sucessfull")
        
        }
        catch (err) {
             toast.error("please fix the error" || err.message)
        }
        
       
       }
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-neutral-800/60 backdrop-blur rounded-2xl shadow-2xl shadow-green-400 p-8 border border-neutral-700">
        <header className="mb-6 flex flex-col items-center justify-center">
          <img src="/spotify.svg" alt="spotify logo" className="size-12" />
          <h1 className="text-lg font-bold sm:text-3xl">
            Sign up to start listening
          </h1>
        </header>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* email */}
          <div>
            <label className="text-sm block mb-2">What's your email?</label>
            <input
            onChange={onChange}
            value={form.email}
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="off"
              className={`w-full rounded-lg p-3 bg-neutral-900 border ${errors.email? "border-rose-500" : "border-neutral-700"} outline-none focus:ring-2 focus:ring-green-400`}
            />
            {errors.email && <p className="tetx-xs text-rose-400 mt-1">{errors.email}</p> }
          </div>
          {/* password */}
          <div>
            <label className="text-sm block mb-2">Create a password</label>
            <div className="relative">
              <input
              onChange={onChange}
              value={form.password}
                name="password"
                type={showPwd? "text": "password"}
                placeholder="At least 6 characters"
                className={`w-full rounded-lg p-3  bg-neutral-900 border ${errors.password? "border-rose-500" : "border-neutral-700"} outline-none focus:ring-2 focus:ring-green-400`}
              />
              <button 
              onClick={()=> setShowpwd(!showPwd)}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-neutral-700 px-2 py-1 rounded-lg text-sm hover:bg-neutral-500">
                show
              </button>
            </div>
            {errors.password && <p className="tetx-xs text-rose-400 mt-1">{errors.password}</p> }
          </div>
          {/* name */}
          <div>
            <label className="text-sm block mb-2 ">What should we call you?</label>
            <input
            onChange={onChange}
            value={form.username}
              name="username"
              type="text"
              autoComplete="off"
              placeholder="A name of your profile"
              className={`w-full rounded-lg p-3  bg-neutral-900 border ${errors.username? "border-rose-500" : "border-neutral-700"} outline-none focus:ring-2 focus:ring-green-400`}
            />
            {errors.username && <p className="tetx-xs text-rose-400 mt-1">{errors.username}</p> }
          </div>
          {/* DOB */}
          <div>
            <label className="block mb-2">What's your date of birth?</label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <input
                onChange={onChange}
                value={form.day}
                 type="number"
                 name="day" 
                 placeholder="DD"
                 autoComplete="off"
                 className={`rounded-lg p-3  bg-neutral-900 border ${errors.dob? "border-rose-500" : "border-neutral-700"} outline-none focus:ring-2 focus:ring-green-400`}
                />
                <select 
                onChange={onChange}
                value={form.month}
                name="month" 
                className={`rounded-lg p-3  bg-neutral-900 border ${errors.dob? "border-rose-500" : "border-neutral-700"} outline-none focus:ring-2 focus:ring-green-400`}>
                    <option value="" disabled>Month</option>
                    {months.map((m)=>(
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
                <input
                onChange={onChange}
                value={form.year}
                 placeholder="YYYY"   
                 type="number" 
                 name="year"
                 autoComplete="off"
                  className={`rounded-lg p-3  bg-neutral-900 border ${errors.dob? "border-rose-500" : "border-neutral-700"} outline-none focus:ring-2 focus:ring-green-400`} 
                  />
            </div>
            {errors.dob && <p className="tetx-xs text-rose-400 mt-1">{errors.dob}</p> }
          </div>
          {/* gender */}
          <div> 
            <label className="text-sm mb-2">What's your gender?</label>
            <div className="grid sm:grid-cols-3 gap-4">
                {
                    [
                        {label: "Female", value: "female"},
                        {label: "Male", value:"male"},
                        {label: "Non-binary", value:"non-binary"},
                    ].map((g)=> (
                        <label key={g.value} 
                        className={`flex items-center gap-2 border ${errors.gender? "border-rose-500" : "border-neutral-700"} rounded-lg px-3 py-2 cursor-pointer`}
                        >
                        <input
                         onChange={onChange} 
                         value={g.value}
                         checked={form.gender === g.value}
                         type="radio"
                          name="gender" 
                          className="accent-emerald-500"/>
                        <span className="text-sm">{g.label}</span>
                        </label>
                    ))
                }
            </div>
            {errors.gender && <p className="tetx-xs text-rose-400 mt-1">{errors.gender}</p> }
          </div>
          <div className="space-y-2">
            <label className="flex items-start gap-3">
                <input 
                onChange={onChange}
                type="checkbox"
                 name="marketing" 
                 checked={form.marketing}
                 className="mt-1 accent-emerald-500" />
                  <span className="text-sm text-neutral-300">I would prefer not to receive marketing messages.</span>
            </label>
            <label className="flex items-start gap-3">
                <input 
                onChange={onChange}
                type="checkbox"
                 name="shareData" 
                 checked={form.shareData}
                 className="mt-1 accent-emerald-500" />
                  <span className="text-sm text-neutral-300">Share my registration data with content providers for marketing purposes.</span>
            </label>
            <label className="flex items-start gap-3">
                <input 
                onChange={onChange}
                type="checkbox"
                 name="terms" 
                 checked={form.terms}
                 className="mt-1 accent-emerald-500" />
                  <span className="text-sm text-neutral-300">I agress to the Terms & Privacy Policy</span>
            </label>
                {errors.terms && <p className="tetx-xs text-rose-400 mt-1">{errors.terms}</p> }
          </div>
          {/* submit */}
          <button className="bg-emerald-500 hover:bg-emerald-400 w-full rounded-full active:bg-emerald-600 transition text-black font-semibold py-2"
          type="submit"
          >Sign up</button>
          <div>
            <p className="text-sm">Already have an account? <Link to={"/"} className="hover:underline">Login</Link> </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
