import mongoose from "mongoose";

// Define the schema for a user
const UserSchema = new mongoose.Schema({
  // User's full name
  name: {
    type: String,
    required: true
  },

  // Unique username for the user
  username: {
    type: String,
    required: true,
    unique: true
  },

  // User's email address (must be unique)
  email: {
    type: String,
    required: true,
    unique: true
  },

  // Hashed password
  password: {
    type: String,
    required: true
  },

  // JWT token for the user session
  token: {
    type: String,
    default: ""
  }
});

// Create User model from schema
const User = mongoose.model("User", UserSchema);

export default User;
