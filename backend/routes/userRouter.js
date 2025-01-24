const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const accountModel = require("../models/account");
const {userSignUpSchema, userSignInSchema,userUpdateSchema } = require("../validators/userTypes");
const { authMiddleware } = require("../middlewares/authMiddleware");


// api/v1/user/ ...

router.post("/signup", async (req, res)=>{
    // register/signup
    // fname, lname, password, username
    const {success} = userSignUpSchema.safeParse(req.body);
    if(!success){
        return res.status(400).send("Please send correct inputs");
    }

    const {username, firstName, lastName, password } = req.body;

    //check whether user exists or not
    const user = await userModel.findOne({ username: req.body.username});
    if(user){
        return res.status(409).json({
            message: "User Already Exists"
        })
    }

    //generate hash
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=>{
            //after hash gets generated , create the user, here only
            const user = await userModel.create({
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: hash,
            });
            
            accountModel.create({
                userId: user._id,
                balance:(Math.floor(Math.random()*10000))
            });

            //generate jwt after user is created successfully
            const token = jwt.sign({userId: user._id}, process.env.JWT_KEY);
            res.status(200).json({
                token: token,
                message:"User Created Successfully"
            });
        });
            
        })
    });

router.post("/signin", async (req,res) => {
    
    const { username, password } = req.body;
    const {success} = userSignInSchema.safeParse(req.body);

    if(!success){
        return res.status(400).send("Invalid Email");
    }
    
    //does username exist
    const user = await userModel.findOne({ username: username });
    if(!user){
        return res.status(409).json({
            message: "User Doesn't Exists"
        })
    }

    //compare password
    bcrypt.compare(password, user.password,(err, result)=>{
        if(result){
            const token = jwt.sign({userId: user._id }, process.env.JWT_KEY);
            res.status(200).json({
                token: token,
                message:"User Login Successfully"
            });
        }else{
            return res.status(409).json({message:"Incorrect Email or Password"})
        }
    });

});

//update user
router.put("/", authMiddleware, async (req, res)=>{
    // {
    //     password,
    //     firstName,
    //     lastName
    // }

    //validate
    const {success} = userUpdateSchema.safeParse(req.body);
    if(!success){
        return res.send("Invalid Inputs");
    }

    //from authMiddleware we have req.user = username

    await userModel.updateOne({_id: req.userId},req.body);
    res.send("user details updated successfully");
    
});

router.get("/bulk/", async (req, res)=>{
    // get filter
    const filter = req.query.filter || "";
    const users = await userModel.find({
      $or: [
        {
          firstName: {
            "$regex" : filter,
            "$options": 'i'
          },
        },
        {
          lastName: {
            "$regex": filter,
            "$options": 'i'
          },
        },
      ]
    });

    // remember the syntax
    //  Explicit return -  ()=>{return{}}
    // OR
    // Implicit return - ()=>({}) 
    res.status(200).json({
        users: users.map( (user) =>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id
        }))
    })

});


module.exports = router;