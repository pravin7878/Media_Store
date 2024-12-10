require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectToDB = require("./src/config/db");
const fileRouter = require("./src/routes/file.route");
const userRouter = require("./src/routes/user.route");
const errorHandler = require("./src/middelware/errorHendeler");
const notFoundMiddleware = require("./src/middelware/notFoundRoute");
const app = express()
const port = process.env.PORT || 3000

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json())
app.use("/files" , fileRouter)
app.use("/user" , userRouter)

app.get("/" , (req,res)=>{
    res.send("wellcome to server")
})

// for hendeling error
app.use(errorHandler)

// if route not exist
app.use(notFoundMiddleware)

app.listen(port , async()=>{
console.log(`server is runing on http://localhost:${port}`);
try {
    await connectToDB()
    console.log("DB Connected Success");
} catch (error) {
    console.log("DB connection failld",error);
}
})