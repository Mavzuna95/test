require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const app = express();
const port = 3003
const cors = require("cors")
const jwt = require("jsonwebtoken");

const { authenticatToken } = require("./middleware/Middleware");
const { User, UserBook, Book } = require("./Models/Model");

app.use(express.json());
app.use(cookieParser());

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,           
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.get("/user", authenticatToken, async (req, res) => {
//   const user = await UserController.findUserById(3).then(res=> res).then((user)=> {
//   console.log("test",user)

//  })
return res.json(req.user);
});

//registration
app.post("/register", async (req, res) => {
    const { username, email, password, confPassword} = req.body;
    if (password !== confPassword)
      return res
        .status(400)
        .json({ msg: "Пароль и подтверждение пароля не совпадают" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await  User.create({
        username: username,
        email: email,
        password: hashPassword,
      });
      res.json({ msg: "Регистрация прошла успешно" });
    } catch (error) {
      console.log(error);
    }
  });
// authentication
app.post("/login", async (req, res) => {

  const {email,password} = req.body
  const user = await User.findOne({ where: { email: email } });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res
      .status(401)
      .json({ message: "Password or username is uncorect" });
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  const accessToken = jwt.sign(payload, process.env.ACCSESS_TOKEN_SECRET, {
    expiresIn: 86400,
  });
  res
    .cookie("access_token", accessToken)
    .status(200)
    .json({ message: "Logged in successfully " });
});


app.post("/add_user_book", authenticatToken, async(req, res) => {
  const {book_id} = req.body
  const user = req.user.id;
  try{
    await UserBook.create({
      user_id: user.id,
      book_id: book_id
    });
    res.json({msg:'success'})
  } catch (error) {
    console.log(error);
  }
})
//get categories

app.listen(port, ()=> console.log('Server running at port 3003'))