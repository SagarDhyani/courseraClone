const express = require("express");
const path = require("path")
const connect = require("./config/db");
const Course = require("./models/course.model");
require("dotenv").config()

const app = express()
const port = process.env.PORT || 8080;
app.use(express.json())
//static files

app.use(express.static("public"));
  
app.set("view engine", "ejs")

//setting up default view path
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: false}))


//controllers
const propCont = require("./controllers/propController");
const unCont = require("./controllers/univercityCont");
const insCont = require("./controllers/instructorController");
const courseCont = require("./controllers/courseController");
const skillCont  = require("./controllers/skillController");

const universityController = require("./controllers/universityController")

// const registerController = require("./controllers/registerController")

// const signupController = require("./controllers/signupController")


//programs and dergree controllers

const programController = require("./controllers/programController")

const degreeController = require("./controllers/degreeController")

const exploreController = require("./controllers/exploreController")

const registerController = require("./controllers/registerController")



app.use("/properties", propCont);
app.use("/courses", courseCont);
app.use("/univercities",unCont);
app.use("/instructors", insCont);
app.use("/skills", skillCont);

app.use("/programs", programController)

app.use("/degrees", degreeController)

app.use("/university_apply", universityController)

app.use("/register", registerController)

// app.use("/signup", signupController)

app.use("/explore", exploreController)
//redirect to all all courses page

app.get("/", async(req, res) => { 
    const courses = await Course.find().lean().exec();
    res.render("./index",{
        courses:courses
    })
});

//payment page redirection

app.get("/makePayment", (req,res)=>{
    res.render("./courses/makePayment");
 });

//on enterprise
app.get("/enterprise", (req, res)=>{
    res.render("enterprise");
});

//on students page

app.get("/students",(req,res)=>{
    res.render("students");
})

app.get("/signup", (req, res)=>{

    res.render("signup")
})

app.get("/login", (req, res)=>{

    res.render("login")
})



//server running on
app.listen(port, async()=>{
    await connect(); //connecting with database
    console.log(`linstening on port: ${port}`);
})