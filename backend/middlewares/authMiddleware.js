const jwt = require('jsonwebtoken');

function authMiddleware(req,res,next){
    //check whether cookie present or not
    let token = req.headers["authorization"];
    if(!token | token == ""){
        return res.status(401).json({message: "you need to login first"});
    }
    token = token.split(' ')[1];

    //if token present , verify it
    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(decoded){
            req.userId = decoded.userId;
            next();
        }else{
            return res.status(403).json({
                message: "wrong Token"
            });
        }

    }catch(err){
        res.status(401).json({message:"You need to login First"});
    }
}

module.exports = { authMiddleware };