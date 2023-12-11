const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const Admins = require("./AdminModel.js");

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    adminId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    username:{
        type: DataTypes.STRING,
        allowNull: true,
        unique:true,
        validate:{
            notEmpty:false,
            len:[3,100]
        }
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty:false,
            len:[10,16]
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty:true,
            isEmail: true
        }
    },
    google_id:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty:false
        }
    },
    android_id:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    expiry:{
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            notEmpty:true,
            isDate: true
            
        }
    },
    profile_complete:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0,
        validate:{
            notEmpty:true
        }
    }
},{
    freezeTableName: true
});

Admins.hasMany(Users);
Users.belongsTo(Admins, { foreignKey: 'adminId'});

module.exports = Users;