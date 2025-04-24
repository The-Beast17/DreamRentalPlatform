const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

function connect(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to db")
    }).catch(err=>{
        console.log(err)
    })
}

module.exports = connect;
