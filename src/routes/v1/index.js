import express from "express";
import checkAuth from "../../middleware/checkAuth.js";
import {
  fetchCurrentUser,
  loginUser,
  registerUser,
  verifyOTP,
  resendOtp,
  deleteUserWithPharmacy,
  loginAdmin,
  updateUserDetails
} from "../../controller/user-controller.js";
import { updatePharmacyDetails, getPharmacyDetails, getAllPendingRequests, setPharmacyStatus,getAllApprovedPharmacies } from '../../controller/verifyPharmacy-controller.js';
import {
  get,
  getAll,
  createMedicine,
  deleteMedicine,
  updateMedicine,
  getMedicinesByManufacturer,
  updateDiscountAndPriceByManufacturer,
  insertManyMedicines,
  search,
  getManufacturersByCategory
} from '../../controller/medicine-controller.js';
import {
  toggleWishlist,
  getWishlistController
} from '../../controller/wishlist-controller.js';
import { addProductToCart, removeCartItem,getCart, clearCart, incrementCart, decrementCart } from '../../controller/cart-controller.js';
import { createCupon, deleteCupon, getAllCupons, applyCoupon } from '../../controller/coupan-controller.js';
import { getOrderSummary, createOrder, updateOrderStatus, getOrder } from '../../controller/booking-controller.js';

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
router.put('/update-user-info', authenticate, updateUserDetails);


// admin route
router.get('/admin/approved-pharmacy-details', checkAuth,checkAdmin, getAllApprovedPharmacies);
router.get('/admin/pending-requests',checkAuth,checkAdmin, getAllPendingRequests);
router.put('/admin/set-pharmacy-status/:id', checkAuth, checkAdmin, setPharmacyStatus);
router.delete("/:userId", checkAuth, checkAdmin, deleteUserWithPharmacy);


//Legacy brand route
router.get('/get-medicine', getAll);
router.get('/single-medicine/:id', get);
router.get(
  '/medicines-by-manufacturer/:manufacturer',
  getMedicinesByManufacturer
);
router.post('/create-medicine', createMedicine);
router.delete('/delete-medicine/:id', deleteMedicine);
router.put('/update-medicine/:id', updateMedicine);
router.put('/update-discount/:manufacturer', updateDiscountAndPriceByManufacturer);
router.post('/bulk-insert-medicine', insertManyMedicines);
router.get('/medicines/search', search);
router.get('/manufacturers/:category', getManufacturersByCategory);

// wishlist routes
router.post('/wishlist/toggle', authenticate, toggleWishlist);
router.get('/wishlist', authenticate, getWishlistController);

// Cart routes
router.post('/add-cart', authenticate, addProductToCart);
router.patch('/remove-cartitem/:medicineId',authenticate,removeCartItem);
router.get('/cart', authenticate, getCart);
router.delete('/cart/:itemId', authenticate, clearCart);
router.patch('/cart/:itemId/increment', authenticate, incrementCart);
router.patch('/cart/:itemId/decrement', authenticate, decrementCart);

//Order-summary

router.post('/get-order-summary',authenticate, getOrderSummary);
router.post('/create-order',authenticate, createOrder);
router.put('/:orderId/status',authenticate, updateOrderStatus);
router.get('/get-order/:orderId',authenticate, getOrder);


//cuppon router
router.post('/create-cuppn',authenticate, createCupon);
router.delete('/cuppon-delete/:code',authenticate, deleteCupon);
router.get('/getall-cuppon',authenticate, getAllCupons);
router.post('/apply-cuppon',authenticate, applyCoupon);



export default router;
