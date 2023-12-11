const express = require("express");
const cors = require("cors");
const session = require("express-session");
const db = require("./config/Database.js");
const SequelizeStore = require("connect-session-sequelize") ;
const AdminRouter = require("./routes/AdminRoute.js") ;
const UserRouter = require("./routes/UserRoute.js") ;
const AuthAdmin = require("./routes/AuthAdmin.js");
const AuthUser = require("./routes/AuthUser.js");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async()=>{
//    await db.sync();
// })();

app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie:{
        secure: "auto"
    }
}));

app.use(cors({
    credentials:true,
    origin:'http://93.188.163.8:5000/'
}));

app.use(express.json());

app.use(AdminRouter);
app.use(UserRouter);
app.use(AuthAdmin);
app.use(AuthUser);

// store.sync();

app.listen(process.env.PORT,()=>{
    console.log("Server Up and Running");
});