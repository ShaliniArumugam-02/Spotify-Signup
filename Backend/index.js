const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json())
let user =[];
// Signup
app.post("/signup", (req,res)=> {
    const{email,
        password,
        username,
        day,
        month,
        year,
        gender,
        shareData,
        marketing,
        terms
    }=req.body;
    
    const exitUser = user.find((u)=> u.email === email && u.password ===password && u.username===username);
    if(exitUser){
        return res.status(400).json({message: "user already exit"})
    }

    user.push({email,password,username,day,month,year,gender,shareData,marketing,terms})
    res.json({message:"signup succesfull"}) 
})

app.post("/login",(req,res)=> {
    const {email, password,username} = req.body 
    const exitUser = user.find((u)=> u.email === email && u.password===password && u.username === username )
    if(exitUser) {
         return res.status(200).json({message: "login successful"})
    }
    else{
        return res.status(401).json({ message: "Invalid credentials" });
    }
  
})

app.listen(5000,()=>{
    console.log("server started")
})