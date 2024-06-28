import express from "express";
import checkAuth from "../../middleware/checkAuth.js";
import {
  fetchCurrentUser,
  loginUser,
  registerUser,
  verifyOTP,
  resendOtp,
  deleteUserWithPharmacy,
  loginAdmin
} from "../../controller/user-controller.js";
import { updatePharmacyDetails, getPharmacyDetails, getAllPendingRequests, setPharmacyStatus,getAllApprovedPharmacies } from '../../controller/verifyPharmacy-controller.js';
import checkAdmin from '../../middleware/checkAdmin.js';
import authenticate from '../../middleware/checkUser.js';

const router = express.Router();

// user route
router.post("/register", registerUser); 
router.post("/login_with_phone", loginUser); 
router.post("/loginadmin", loginAdmin);
router.post("/verify", verifyOTP); 
router.get("/me", authenticate, fetchCurrentUser); 
router.post('/resend-otp', resendOtp);
router.get('/pharmacy-details', authenticate,getPharmacyDetails);
router.put('/update-pharmacy-details',authenticate,  updatePharmacyDetails);

// admin route
router.get('/admin/approved-pharmacy-details', checkAuth,checkAdmin, getAllApprovedPharmacies);
router.get('/admin/pending-requests',checkAuth,checkAdmin, getAllPendingRequests);
router.put('/admin/set-pharmacy-status/:id', checkAuth, checkAdmin, setPharmacyStatus);
router.delete("/:userId", checkAuth, checkAdmin, deleteUserWithPharmacy);


export default router;
