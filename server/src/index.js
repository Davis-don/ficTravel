import express from "express";
import cors from 'cors';  // For handling cross-origin requests
import newUser from "./Routes/newUser.js";  // Import your route handlers
import loginUser from "./Routes/loginUser.js";
import getUserById from "./Routes/singleUser.js";
import newBookingRequest from "./Routes/bookingRequest.js";
import singleUserBooking from "./Routes/singleUserBookings.js";
import singleAgentBooking from "./Routes/singleAgentBooking.js";
import updatePersonalInfoDataById from "./Routes/updatePersonalInfoDataById.js";
import updatePasswordById from "./Routes/PasswordUpdate.js";
import deleteAccountById from "./Routes/deleteAccountById.js";
import deleteBookingById from "./Routes/deleteBookingbyId.js";
import getAllBookings from "./Routes/getAllBookings.js";
import fetchAllUsersWithRoleUser from "./Routes/fetchAllUsers.js";
import fetchAllAgents from "./Routes/fetchAllAgents.js";
import createOrUpdateTestimonial from "./Routes/addComment.js";
import fetchAllTestimonials from "./Routes/getAllComments.js";
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
app.use('/', getUserById);    // Handle GET request to retrieve a user
app.use('/',newBookingRequest);
app.use('/',singleUserBooking)
app.use('/',singleAgentBooking)
app.use('/',updatePersonalInfoDataById)
app.use('/',updatePasswordById)
app.use('/',deleteAccountById)
app.use('/',deleteBookingById)
app.use('/',getAllBookings)
app.use('/',fetchAllUsersWithRoleUser)
app.use('/',fetchAllAgents)
app.use('/',createOrUpdateTestimonial)
app.use('/',fetchAllTestimonials)
// Start the server on port 4000
app.listen(4000, () => {
  console.log("Server running at port 4000");
});

