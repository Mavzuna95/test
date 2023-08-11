const jwt = require("jsonwebtoken");


const authenticatToken = (req, res, next) => {
  
    const token = req.cookies.access_token;

    if (token === null) return res.status(401);
    jwt.verify(token, process.env.ACCSESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT verification failed:", err);
        return res.json("Не авторизован");
      }
      console.error("JWT verification failed:", decoded);
      req.user = decoded;
      next();
    });
  }

  module.exports = {authenticatToken}
  