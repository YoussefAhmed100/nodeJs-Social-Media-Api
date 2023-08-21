const express =require ("express");
const app =express();
const mongoose =require("mongoose")
const dotenv = require("dotenv")
const morgan =require("morgan")
const helmet =require("helmet")

dotenv.config();




const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },).then((res) => {
    console.log("mongodb connection successfully");
  }).catch(error => {
     console.log(error);
   });



   
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);










const PORT = 8080;
app.listen(PORT ,()=>{
    console.log("Backend server is running")
})