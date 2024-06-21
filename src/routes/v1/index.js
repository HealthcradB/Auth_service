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
import { updatePharmacyDetails, getPharmacyDetails, getAllPendingRequests, setPharmacyStatus } from '../../controller/verifyPharmacy-controller.js';
import checkAdmin from '../../middleware/checkAdmin.js';
import authenticate from '../../middleware/checkUser.js';

const router = express.Router();

router.post("/register", registerUser); 

router.post("/login_with_phone", loginUser); 
router.post("/loginadmin", loginAdmin);
router.post("/verify", verifyOTP); 
router.get("/me", checkAuth, fetchCurrentUser); 
router.post('/resend-otp', resendOtp);
router.delete("/:userId", checkAuth, checkAdmin, deleteUserWithPharmacy);

router.put('/update-pharmacy-details/:id',authenticate,  updatePharmacyDetails);
router.get('/pharmacy-details', checkAuth, getPharmacyDetails);
router.get('/admin/pending-requests', checkAdmin, getAllPendingRequests);
router.put('/admin/set-pharmacy-status/:id', checkAuth, checkAdmin, setPharmacyStatus);


export default router;
