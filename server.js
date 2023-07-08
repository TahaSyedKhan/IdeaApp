const express  = require('express');
const serverConfig = require('./configs/server.config')
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config')
const userModel = require('./models/user.model')


const app = express();


mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
    console.log("Error while connecting to DB");
});

db.once("open", () => {
    console.log("DB is connected");

    init();
});

// initialize the mongo db
// need to create the ADMIN user
async function init() {
  
    let admin = await userModel.findOne({
        userId: "admin"
    })

    //Check if admin is already present
    if (admin) {
        console.log("Admin Already Exists");
        return;
    }

    admin = await userModel.create( {
        name: "Taha Syed",
        userId: "admin",
        email: "tahasyedkhan123@gmail.com",
        userType: "ADMIN",
        password: "admin"
    });

    console.log(admin);

}

app.listen(serverConfig.PORT, ()=>{
    console.log(`server started on the port number ${serverConfig.PORT}` );
})