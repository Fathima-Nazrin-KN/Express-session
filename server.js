const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const session = require("express-session")
const cookieParser = require("cookie-parser")

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret:"my=secret",
    name:"my-site",
    resave:false,
    saveUninitialized: true,
}))

const users = [
   {username:"tom",password :"123"} ,
   { username:"ravi",password : "345"}
]

app.get("/",(req,res)=>{

    if(req.session.isAuth){
        res.redirect("/profile.html")
    }
    res.sendFile(__dirname+"/login.html")
})

app.get("/profile",(req,res)=>{
    if(!req.session.isAuth){
        res.redirect("/")
    }
    res.sendFile(__dirname + "/profile.html");
})

app.post("/login",(req,res)=>{
    const {username,password} = req.body;
    
    const user = users.find((data)=>data.username === username && data.password === password);
    console.log(user);

    if(!user){
        res.redirect("/")
    }else{
        req.session.userID = username;
       req.session.isAuth = true;
    
    res.sendFile(__dirname + "/profile.html");
    }
    
})

app.listen(PORT,()=>{
     console.log(`server is running on ${PORT}`);
     
})
