const express = require("express");
const app= express();
const port= 8080;
const path = require("path");
const {v4 : uuidv4}= require("uuid");
const methodOverride= require("method-override");

app.use(methodOverride("_method"))


app.use(express.urlencoded({extended:true})); 

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"/public")));

let posts = [
    {
        id:uuidv4(),
        username : "Jayesh Kumar",
        content: "Jai Shree Ram"
    },
    {
        id:uuidv4(),
        username : "Janvi Jain",
        content: "Jai jaynandr"
    },
    {
        id:uuidv4(),
        username : "Yash Sharma",
        content: "I love Coding!!!"
    },
    {
        id:uuidv4(),
        username : "Paveetr",
        content: "Radhe Radhe"
    }
]
app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
})
app.get("/", (req, res)=>{
    res.send("Server is LiVE NOW");
})
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
})
app.post("/posts", (req,res)=>{
    let {username, content}= req.body;
    let id= uuidv4();
    posts.push({id,username, content});
    // res.send("New Post added successfully");
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("show.ejs",{post})
    // console.log(post);
    // res.send("'req working'");
})

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent= req.body.content;
    let post= posts.find((p)=> id===p.id);
    post.content= newContent;
    console.log(post);
    // console.log(id);
    // console.log(content);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}= req.params;
    let post= posts.find((p)=> id===p.id);
    res.render("edit.ejs", {post});

})

app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
    posts= posts.filter((p)=> id!==p.id)
    res.redirect("/posts");
})
app.listen(port, ()=>{
    console.log(`Port ${port} is under use`);
})