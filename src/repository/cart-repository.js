import Cart from "../models/Cart.js";

class CartRepository {
    async createCart(userId) {
        try {
            const newCart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
            return newCart;
        } catch (error) {
            console.error("Error creating cart:", error);
            throw new Error("Error creating cart");
        }
    }

    async addCartItem(userId, cartItem) {
        try {
            let cart = await Cart.findOne({ user: userId });
            if (cart) {
                const existingItemIndex = cart.items.findIndex(item =>
                    item.medicineId.toString() === cartItem.medicineId.toString()
                );
                if (existingItemIndex !== -1) {
                    cart.items[existingItemIndex].quantity += cartItem.quantity;
                } else {
                    cart.items.push(cartItem);
                }
            } else {
                cart = await Cart.create({ user: userId, items: [cartItem], totalPrice: 0 });
            }
            cart.totalPrice = this.calculateTotalPrice(cart.items);
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error adding cart item:", error);
            throw new Error("Error adding cart item");
        }
    }

    calculateTotalPrice(items) {
        return items.reduce((total, item) => total + item.finalPurchaseRate * item.quantity, 0);
    }

    async getCartByUserId(userId) {
        try {
            const cart = await Cart.findOne({ user: userId }).populate('items.medicineId');
            console.log("cart repo", cart);
            return cart;
        } catch (error) {
            console.error("Error getting cart by user ID:", error);
            throw new Error("Error getting cart by user ID");
        }
    }

    async clearCart(userId) {
        try {
            await Cart.findOneAndDelete({ user: userId });
        } catch (error) {
            console.error("Error clearing cart:", error);
            throw new Error("Error clearing cart");
        }
    }
}

export default CartRepository;
