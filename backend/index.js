const express = require("express");
const app = express();
const mainRouter = require("./routes/index")
const cors = require("cors");
const mongooseConnection = require("./config/mongoose-connection");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter )

app.listen(3000,(err)=>{
    if(!err){
        console.log("server is running");
    }else {
        console.log("there is some error");
    }
})


