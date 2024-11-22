import express from "express";
import cors from 'cors';  // For handling cross-origin requests
import newUser from "./Routes/newUser.js";  // Import your route handlers
import loginUser from "./Routes/loginUser.js";
import getUser from "./Routes/singleUser.js";

const app = express();

// Use CORS to allow the frontend at http://localhost:5173 to make requests
app.use(cors({
  origin: "http://localhost:5173", // React app URL
  methods: ["POST", "GET", "PATCH", "PUT", "DELETE"]  // Allowed HTTP methods
}));

// Parse incoming JSON requests
app.use(express.json());

// Set up your routes for user registration, login, and retrieving user data
app.use('/', newUser);    // Handle POST request for new users
app.use('/', loginUser);  // Handle POST request for user login
app.use('/', getUser);    // Handle GET request to retrieve a user

// Start the server on port 4000
app.listen(4000, () => {
  console.log("Server running at port 4000");
});

