const userModel = require("../model/UserModel")


const IsUserExist=async(req,res,next)=>{
try{
  console.log(req.body,'body')
  const email = req.body.email;
  const logindata = await userModel.findOne({ email });

  if (logindata) {
    res.send({message:"This email is already registered. Please log in to your account.",status:false,Error:true});
  } 
  else {
    next();
  }
}
catch(err){
  res.status(500).send({message:"Something went wrong",status:false,Error:true})
}
}
module.exports=IsUserExist