// controllers/orderController.js
import OrderService from '../services/orderService';

class OrderController {
  async getOrderSummary(req, res) {
    try {
      const userId = req.user.userId; // Assuming user ID is available in req.user
      const couponCode = req.body.couponCode;

      const orderSummary = await OrderService.prepareOrderSummary(userId, couponCode);
      res.status(200).json({
        type: 'success',
        message: 'Order summary retrieved successfully',
        data: orderSummary,
      });
    } catch (error) {
      console.error('Error getting order summary:', error);
      res.status(400).json({
        type: 'error',
        message: error.message,
      });
    }
  }

  async createOrder(req, res) {
    try {
      const userId = req.user.userId; // Assuming user ID is available in req.user
      const { address, paymentOption, couponCode } = req.body;

      const order = await OrderService.createOrder(userId, address, paymentOption, couponCode);
      res.status(201).json({
        type: 'success',
        message: 'Order created successfully',
        data: order,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(400).json({
        type: 'error',
        message: error.message,
      });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const orderId = req.params.orderId;
      const { status } = req.body;

      const order = await OrderService.updateOrderStatus(orderId, status);
      res.status(200).json({
        type: 'success',
        message: 'Order status updated successfully',
        data: order,
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({
        type: 'error',
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }

  async getOrder(req, res) {
    try {
      const orderId = req.params.orderId;

      const order = await OrderService.getOrderById(orderId);
      res.status(200).json({
        type: 'success',
        message: 'Order retrieved successfully',
        data: order,
      });
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({
        type: 'error',
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }
}

export default new OrderController();
