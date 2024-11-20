import express from "express";
import cors from 'cors'
import newUser from "./Routes/newUser.js";
import loginUser from "./Routes/loginUser.js";

const app = express();

app.use(express.json()); // To parse incoming JSON requests


//cors
app.use(cors({
  origin:"http://localhost:5173",
  methods:["POST", "GET", "PATCH", "PUT", "DELETE"]
}))


// Create Account Route
app.use('/',newUser);
//login user
app.use('/',loginUser)

// Server listen
app.listen(4000, () => {
  console.log("Server running at port 4000");
});
