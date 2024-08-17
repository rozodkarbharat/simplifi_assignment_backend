const express = require("express");
const app = express();
var cors = require("cors");

require("dotenv").config()
const connection = require("./db");
const userModel = require("./model/UserModel");
const IsUserExist = require("./middleware/IsUserExists");
const sendMail = require("./Utils/Mail");

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.post("/create-user", IsUserExist, async (req, res) => {
  try {
    const { title, name, email, isdCode, mobileNumber } = req.body;
    console.log(title, name, email, isdCode, mobileNumber,"input data")
    const data = new userModel({ title, name, email, ISDcode: isdCode, number: mobileNumber });
    await data.save();
    res.status(201).send({message:"User created successfully", status:true, Error:false});
  } catch (err) {
    res.status(500).send({ error: "Something went wrong", status:false, Error:true });
  }
})


app.post("/verify-email", IsUserExist, async (req,res) => {
  try {
    const { email, OTP } = req.body;
    let ans = await sendMail({ email, OTP})
    if(ans){
      res.status(200).send({message:"OTP sent Succefully", status:true, Error:false});
    }
    else{
      res.status(200).send({message:"Please chech Email ID", status:false, Error:false});
    }
  } catch (err) {
    console.log(err,"Error sending email")
    res.status(500).send({ error: "Something went wrong", status:false, Error:true });
  }
})


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("server running " + process.env.PORT);
  }
  catch (err) {
    console.log(err)
  }

});
