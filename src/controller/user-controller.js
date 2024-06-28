import UserService from "../services/user-service.js";
import PharmacyService from "../services/verifyPharmacy-service.js";
import UserRepository from "../repository/user-repository.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const userService = new UserService();
const pharmacyService = new PharmacyService();
const userRepository = new UserRepository();

export const registerUser = async (req, res, next) => {
  try {
    console.log("Received request to register user:", req.body);
    const user = await userService.createNewUser(req.body);

    const pharmacyData = {
      userId: user._id,
      phone: user.phone
      // Add other pharmacy details here
    };
    const pharmacy = await pharmacyService.createNewPharmacy(pharmacyData);
    await User.findByIdAndUpdate(user._id, { $push: { pharmacyId: pharmacy._id } });

    console.log(pharmacy);

    await userService.sendOTP(user.phone);
    
    console.log("User registered successfully:", user);
    res.status(200).json({
      type: "success",
      message: "Account created, OTP sent to mobile number",
      data: { userId: user._id, pharmacyId: pharmacy._id }, // Return pharmacyId in response
    });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    console.log("Received request to login user:", req.body);
    const user = await userService.loginWithPhoneOtp(req.body.phone);
    console.log("User logged in successfully:", user);
    res.status(201).json({
      type: "success",
      message: "OTP sent to your registered phone number",
      data: { userId: user.user._id },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    next(error);
  }
};

export const loginAdmin = async (req, res) => {
  const { phone } = req.body;
  try {
    const user = await userRepository.findByPhone(phone);
    console.log(user.isAdmin)

    if (!user || !user.isAdmin) {
      return res.status(401).json({ type: 'error', message: 'Login failed' });
    }

    const token = jwt.sign(
      { isAdmin: user.isAdmin, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.status(200).json({ type: 'success', token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ type: 'error', message: 'Login failed' });
  }
};


export const verifyOTP = async (req, res, next) => {
  try {
    console.log("Received request to verify OTP:", req.body);
    const result = await userService.verifyPhoneOtp(req.body);
    console.log("OTP verified successfully:", result);
    res.status(201).json({
      type: "success",
      message: "OTP verified successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    next(error);
  }
};

export const fetchCurrentUser = async (req, res, next) => {
  try {
    console.log("Received request to fetch current user:", req.user);
    const user = await userService.fetchCurrentUser(req.user);
    console.log("Current user fetched successfully:", user);
    res.status(200).json({
      type: "success",
      message: "Fetched current user successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    next(error);
  }
};

export const resendOtp = async (req, res, next) => {
  try {
    console.log("Received request to login user:", req.body);
    const user = await userService.loginWithPhoneOtp(req.body.phone);
    console.log("User logged in successfully:", user);
    res.status(201).json({
      type: "success",
      message: "OTP sent to your registered phone number",
      data: { userId: user.user._id },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    next(error);
  }
};

export const deleteUserWithPharmacy = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deletedUser = await userService.deleteUserById(userId);
    res.status(200).json({
      type: "success",
      message: "User and associated pharmacy details deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    next(error);
  }
};


export const updateUserDetails = async (req, res, next) => {
  try {
    console.log("Received request to update user details:", req.body);
    const userId = req.user._id; // Assuming userId is in req.user after authentication middleware
    const updateData = req.body;

    const updatedUser = await userService.updateUserById(userId, updateData);

    console.log("User details updated successfully:", updatedUser);
    res.status(200).json({
      type: "success",
      message: "User details updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    next(error);
  }
};