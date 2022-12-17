let jwt = require("jsonwebtoken");
const bookModel = require("../models/bookModel");
const validation = require("../validator/validation");

//---------------------------- Authentication:------------------------------------->>>

const authentication = async function (req, res, next) {
  try {
    //------------ checking token ---------------------------------------->
    let token = req.headers["x-api-key"];
    if (!token)
      return res.status(401).send({ status: false, msg: "Token Must be Filled" });
    
    //------------------------ verifying token ----------------------------->
    let decodedToken = jwt.verify(token, "secret-key");
    if (!decodedToken)
      return res.status(400).send({status: false,msg: "Token Not Verified Please Enter Valid Token"});

    req.decodedToken = decodedToken;

    next();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};



// --------------------------------Authorization:--------------------------------------->>>

 const authorization = async function (req, res, next) {
  try {
    let userLoggedIn = req.decodedToken.userId;
    let userId = req.params.bookId;

    if( !validation.isValidObjectId(userId)){
      return res.status(400).send({ status: false, msg: "Please enter valid User Id"})
  }

    let checkUserId = await UserModel.findById(userId)
    if (!checkUserId) {
      return res.status(404).send({status: false, message: "User not Found"})
  }

    if (checkUserId.userId != userLoggedIn) {
      return res.status(403).send({status: false,msg: "You are not allowed to modify changes"});
    }

    next();
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.messge });
  }
};

//============================================================================================

module.exports.authentication = authentication;
 module.exports.authorization = authorization;




