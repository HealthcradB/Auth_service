import CuponRepository from '../repository/cuppon-repository.js';
import UserRepository from '../repository/user-repository.js';
import CartRepository from '../repository/cart-repository.js';

class CuponService {
  constructor() {
    this.cuponRepository = new CuponRepository();
    this.userRepository = new UserRepository();
    this.cartRepository = new CartRepository();
  }

  async createCupon(cuponData) {
    try {
      return await this.cuponRepository.createCupon(cuponData);
    } catch (error) {
      throw new Error(`Failed to create cupon: ${error.message}`);
    }
  }

 

  async deleteCupon(code) {
    try {
      return await this.cuponRepository.deleteCupon(code);
    } catch (error) {
      throw new Error(`Failed to delete cupon: ${error.message}`);
    }
  }
  async getAllCupons() {
    try {
      return await this.cuponRepository.getAllCupons();
    } catch (error) {
      throw new Error(`Failed to get all cupons: ${error.message}`);
    }
  }
}

export default  CuponService;
// async applyCoupon(userId, code) {
//     try {
//         // Get the user's cart
//         const cart = await this.cartRepository.getCartByUserId(userId);
//         if (!cart) {
//             throw new Error('Cart not found');
//         }

//         // Calculate the total price of the cart
//         const totalAmount = cart.items.reduce((total, item) => {
//             return total + (item.price * item.quantity);
//         }, 0);

//         // Apply the coupon
//         const cupon = await this.cuponRepository.findCuponByCode(code);
//         if (!cupon || !cupon.isActive || cupon.expiryDate < new Date()) {
//             throw new Error('Invalid or expired coupon');
//         }

//         if (cupon.usedBy.includes(userId)) {
//             throw new Error('Coupon already used by this user');
//         }

//         const discountAmount = (totalAmount * cupon.discountPercentage) / 100;
//         const finalAmount = totalAmount - discountAmount;

//         // Mark the coupon as used by this user
//         cupon.usedBy.push(userId);
//         if (cupon.usedBy.length >= 1) {
//             cupon.isActive = false;
//         }
//         await cupon.save();

//         // Update the cart's total price
//         cart.totalPrice = finalAmount;
//         await cart.save();

//         return finalAmount;
//     } catch (error) {
//         throw new Error(`Failed to apply coupon: ${error.message}`);
//     }
// }
