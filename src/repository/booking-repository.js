// repositories/orderRepository.js
import Order from '../models/order';

class OrderRepository {
  async createOrder(orderData) {
    try {
      const order = new Order(orderData);
      return await order.save();
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Error creating order');
    }
  }

  async updateOrderStatus(orderId, status) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      order.status = status;
      order.trackingHistory.push({ status, date: new Date() });
      await order.save();
      return order;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Error updating order status');
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId).populate('products.medicineId');
      if (!order) {
        throw new Error('Order not found');
      }
      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw new Error('Error fetching order');
    }
  }
}

export default new OrderRepository();
