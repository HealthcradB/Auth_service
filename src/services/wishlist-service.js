import WishlistRepository from "../repository/wishlist-repository.js";
import MedicineRepository from "../repository/medicine-repository.js";

class WishlistService {
    constructor() {
        this.wishlistRepository = new WishlistRepository();
        this.productRepository = new MedicineRepository();
    }

    async toggleWishlist(userId, medicineId) {
        try {
          const user = await this.wishlistRepository.toggleWishlist(userId, medicineId);
          return user;
        } catch (error) {
          console.log("Toggle wishlist service layer error", error);
          throw error;
        }
      }

    async getWishlist(userId) {
        try {
            const wishlist = await this.wishlistRepository.getWishlist(userId);
            return wishlist;
        } catch (error) {
            console.log("Error fetching wishlist:", error);
            throw new Error("Error fetching wishlist");
        }
    }
}

export default WishlistService;
