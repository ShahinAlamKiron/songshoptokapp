const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const url='mongodb+srv://miceldevid:miceldevid@cluster0.skpt9.mongodb.net/Songshotak?';


//External Packege Importing
const authHandler=require("./Handler/authHandle");
const profileHandler=require("./Handler/profileHandle")
const errorHandle=require("./Middleware/errorMiddleware");
const defaultError=require("./Middleware/defaultError");
const clinicHandle=require("./Handler/clinicHandle");
const ambulanceHandle=require("./Handler/ambulanceHandle");
const busTerminal=require("./Handler/BusterminalHandle");
const otherHandle=require("./Handler/otherHandle");

//mongodb Connection 
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },() => {
    console.log("Database Connection Successfull");
  }
);

dotenv.config();
app.use(bodyParser.json());


//App Routes
app.use("/api/user/auth",authHandler);
app.use("/api/user/profile",profileHandler);
app.use("/api/user/clinic",clinicHandle);
app.use("/api/user/ambulance",ambulanceHandle);
app.use("/api/user/blood/",profileHandler);
app.use("/api/user/bus/",busTerminal);
app.use("/api/user/other/",otherHandle);



//Default Error Handle Middleware
app.use(defaultError);


//Error Handle Middleware
app.use(errorHandle);


app.listen(port, () => {
  console.log("Server Runing Port 8080");
});
