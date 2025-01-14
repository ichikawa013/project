//userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

export const getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const updateUserPassword = async (email, newPasswordHash) => {
  return await User.findOneAndUpdate(
    { email },
    { password: newPasswordHash },
    { new: true }
  );
};

export default User;