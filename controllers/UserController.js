const {Book, User } = require("../Models/Model");

 class UserController{
  constructor() {
  }

  static findUserById = async(userId) =>{
    // return "dfsdfsdfdfs"; 
  
   const user = User.findByPk(userId, {
      include: [
        {
          model: Book,
          as: "books",
          attributes: ["id", "name", "descr", "category_id", "img", "author"],
          through: {
            attributes: [],
          },
        },
      ],

    })
      .then((res) => {
        
        return res;
      })
      .catch((err) => {
        console.log(">> Error while finding Book: ", err);
      });
     console.log("useer", user);
  }
}

module.exports = {UserController}