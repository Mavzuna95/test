const sequelize = require("../config/database");

const { DataTypes } = require("sequelize");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    }
}
,{
    tableName: "users",
    timestamps: true
}
);
const Roles = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    role: {
        type: DataTypes.STRING
    }
});

 const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    descr: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
}
,{
    tableName: "books"
}
);
 const UserBook = sequelize.define('serBook', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: 'user_id'
        }
    },   
     book_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'book_id'
        }
    },
},
{
    tableName: 'user_book', }
)
User.belongsToMany(Book, { through: UserBook });
Book.belongsToMany(User, { through: UserBook });

module.exports = { UserBook,User,Book, Roles}