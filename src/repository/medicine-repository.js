import Medicines from '../models/medicine.js';


class MedicineRepository {
  async getMedicine(id) {
    try {
      const medicine = await Medicines.findById(id);
      return medicine;
    } catch (error) {
      console.log('Error in getMedicine repository method:', error);
      throw { error };
    }
  }

  async getAllMedicines() {
    try {
      const medicines = await Medicines.find();
      return medicines;
    } catch (error) {
      console.log('Error in getAllMedicines repository method:', error);
      throw { error };
    }
  }

  async createMedicine(medicineData) {
    try {
      const newMedicine = new Medicines(medicineData);
      await newMedicine.save();
      return newMedicine;
    } catch (error) {
      console.error('Error in createMedicine repository method:', error);
      throw { error };
    }
  }

  async deleteMedicine(id) {
    try {
      const deletedMedicine = await Medicines.findByIdAndDelete(id);
      return deletedMedicine;
    } catch (error) {
      console.log('Error in deleteMedicine repository method:', error);
      throw { error };
    }
  }

  async updateMedicine(id, updatedData) {
    try {
      const updatedMedicine = await Medicines.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
      return updatedMedicine;
    } catch (error) {
      console.log('Error in updateMedicine repository method:', error);
      throw { error };
    }
  }

  async getMedicinesByManufacturer(manufacturer) {
    try {
      const medicines = await Medicines.find({ MANUFACTURER: manufacturer });
      return medicines;
    } catch (error) {
      console.error(
        'Error in getMedicinesByManufacturer repository method:',
        error
      );
      throw { error };
    }
  }

  async updateDiscountByManufacturer(manufacturer, discount) {
    try {
      const result = await Medicines.updateMany(
        { MANUFACTURER: manufacturer },
        { $set: { DISCOUNT: discount } }
      );
      return result;
    } catch (error) {
      console.error(
        'Error in updateDiscountByManufacturer repository method:',
        error
      );
      throw { error };
    }
  }
  async insertManyMedicines(medicinesData) {
    try {
      const result = await Medicines.insertMany(medicinesData);
      return result;
    } catch (error) {
      console.error('Error in insertManyMedicines repository method:', error);
      throw { error };
    }
  }
  async searchMedicines(query) {
    try {
      const searchQuery = {
        $or: [
          { NAME: { $regex: query, $options: 'i' } },
          { COMPOSITION: { $regex: query, $options: 'i' } },
          { MANUFACTURER: { $regex: query, $options: 'i' } },
          { TYPE: { $regex: query, $options: 'i' } },
        ],
      };
      const result = await Medicines.find(searchQuery);
      return result;
    } catch (error) {
      console.error('Error in searchMedicines repository method:', error);
      throw { error };
    }
  }
  async getManufacturersByCategory(category) {
    try {
      const manufacturers = await Medicines.distinct('MANUFACTURER', { CATEGORY: category });
      console.log("repo manu",manufacturers)
      return manufacturers;
    } catch (error) {
      console.error('Error in getManufacturersByCategory repository method:', error);
      throw { error };
    }
  }
  async updatePriceByMedicine(medicineId, newPrice, discount) {
    try {
      console.log("medicine id in repio",medicineId)
        const result = await Medicines.updateOne({ _id: medicineId }, {
            $set: {
                Final_PURCHASE_RATE: newPrice,
                DISCOUNT: discount // Ensure discount is stored in the database
            }
        });
    
        return result;
    } catch (error) {
        console.error('Error in updatePriceByMedicine repository method:', error);
        throw error;
    }
}

  

}


export default MedicineRepository;