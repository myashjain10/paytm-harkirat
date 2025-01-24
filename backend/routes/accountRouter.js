const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const { authMiddleware } = require("../middlewares/authMiddleware");
const accountModel = require("../models/account");
const mongoose = require("mongoose");
const {transactionSchema} = require("../validators/accountTypes");

//get account balance
router.get("/balance", authMiddleware, async (req, res)=>{
    const account = await accountModel.findOne({ userId: req.userId });
    if(!account){
        return res.send("You need to login");
    }

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res)=>{
   //req.body = { amountt: Number, to: ObjectID }
    
   const {success} = transactionSchema.safeParse(req.body);
   if(!success){
    return res.status(400).json({message:"Invalid inputs"});
   }
    //starting a session
    const currentSession = await mongoose.startSession();

    //starting the transaction inside the context of currentSession
    currentSession.startTransaction();

    const {amount, to} = req.body;

    //fetch the accounts within the transaction
    const account = await accountModel.findOne({userId: req.userId}).session(currentSession);
    //.session(currentSession) tells that this operation is performed in context of currentSession
    
    //insufficient balance check
    if(!account || account.balance < amount){
        await currentSession.abortTransaction();
        return res.status(400).json({
            message:"Insufficient Balance"
        });
    }

    const toAccount = await accountModel.findOne({ userId: to}).session(currentSession);
    //invalid reciever account check
    if(!toAccount){
        await currentSession.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        });
    }

    //after all the checks, Perform the transfer
    //deduct the amount from sender
    await accountModel.updateOne({userId: req.userId},{$inc :{balance: -amount} }).session(currentSession);
    
    //credit the amount to reciever
    await accountModel.updateOne({userId: to},{$inc :{balance: amount} }).session(currentSession);
    
    //once the operations are completed successfully, commit the transaction
    //commiting make the changes permanent
    await currentSession.commitTransaction();

    res.json({
        message: "Transfer Successful"
    })
})

module.exports = router;

