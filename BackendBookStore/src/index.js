const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");
var bodyParser = require('body-parser')
const { authRoute } = require("./Routes/Auth/Auth");
const { adminBookRoute } = require("./Routes/Books/AdminBooks");
const { userBookRoute } = require("./Routes/Books/UserBooks");
const { userCartRoute } = require("./Routes/Cart/UserCart");



mongoose.connect(process.env.MONGO_URL).then(()=>
    console.log("connected")
).catch(()=>
    console.log("connection error")
);

app.use(cors());
app.use(bodyParser.json()); // for JSON data
app.use(bodyParser.urlencoded({ extended: true })); // for URL-encoded data

app.use("/api/auth", authRoute);
app.use("/api/adminBooks", adminBookRoute);
app.use("/api/userBooks", userBookRoute);
app.use("/api/userCart", userCartRoute);
// app.use("/api/user", User);

app.use(express.static('public'));
app.use('/bookImages', express.static('bookImages'));

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running")
})