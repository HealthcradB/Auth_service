import Cuppon from '../models/cuppon.js';

class CuponRepository {
  async createCupon(cuponData) {
    try {
      const cupon = new Cuppon(cuponData);
      return await cupon.save();
    } catch (error) {
      throw new Error(`Failed to create cupon: ${error.message}`);
    }
  }

  async findCuponByCode(code) {
    try {
      return await Cuppon.findOne({ code });
    } catch (error) {
      throw new Error(`Failed to find cupon by code: ${error.message}`);
    }
  }

  async updateCupon(code, updateData) {
    try {
      return await Cuppon.findOneAndUpdate({ code }, updateData, { new: true });
    } catch (error) {
      throw new Error(`Failed to update cupon: ${error.message}`);
    }
  }

  async deleteCupon(code) {
    try {
      return await Cuppon.findOneAndDelete({ code });
    } catch (error) {
      throw new Error(`Failed to delete cupon: ${error.message}`);
    }
  }
  async getAllCupons() {
    try {
      return await Cuppon.find();
    } catch (error) {
      throw new Error(`Failed to get all cupons: ${error.message}`);
    }
  }
}

export default CuponRepository;
