const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let items =["Wake up" ,"Play Shettle","Eat Breakfast"];
let workItems = [];
app.set("view engine","ejs");//telling our app to use ejs

app.use(bodyParser.urlencoded({extended: false}));//telling app to use bodyparser.
app.use(express.static("public"));//telling app to use static files presnt in public folder

app.get("/",function (req,res){
  var today = new Date();

  var options = {
    weekday : "long",
    day: "numeric",
    month : "long"
  };
  var day = today.toLocaleDateString("en-US",options);
  //toLocaleDateString gives us the date in string format.!
  res.render("list",{listTitle : day,newListItem : items});
  //telling response to render the result by going into list.ejs file whichshould be inside
  //views folder and telling the app to use the result of day to be given to kindOfDay variable
  //in the list.ejs file!!
});

app.post("/",function(req,res){
  console.log(req.body);
   let inp = req.body.workName;// to use the word body we must reqire bodyparesrrr
   if(req.body.list === "Work List"){
     workItems.push(inp);
     res.redirect("/work");
   } else{
     items.push(inp);
     res.redirect("/");//after post request we are redirecting our app to home!!
   }

   });



//for work route
app.get("/work",function (req,res){
  res.render("list",{listTitle : "Work List",newListItem : workItems});
})

//for about route
app.get("/about",function (req,res){
  res.render("about");
})
app.listen(3000,function(){
  console.log("server is up and running on port 3000");
});
