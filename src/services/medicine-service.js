import MedicineRepository from '../repository/medicine-repository.js';

class MedicineService {
  constructor() {
    this.medicineRepository = new MedicineRepository();
  }

  async getMedicine(id) {
    try {
      const medicine = await this.medicineRepository.getMedicine(id);
      return medicine;
    } catch (error) {
      console.log('Error in getMedicine service method:', error);
      throw error;
    }
  }

  async getAllMedicines() {
    try {
      const medicines = await this.medicineRepository.getAllMedicines();
      return medicines;
    } catch (error) {
      console.log('Error in getAllMedicines service method:', error);
      throw error;
    }
  }

  async createMedicine(medicineData) {
    try {
      const newMedicine = await this.medicineRepository.createMedicine(
        medicineData
      );
      return newMedicine;
    } catch (error) {
      console.log('Error in createMedicine service method:', error);
      throw error;
    }
  }

  async deleteMedicine(id) {
    try {
      const result = await this.medicineRepository.deleteMedicine(id);
      return result;
    } catch (error) {
      console.log('Error in deleteMedicine service method:', error);
      throw error;
    }
  }

  async updateMedicine(id, medicineData) {
    try {
      const updatedMedicine = await this.medicineRepository.updateMedicine(
        id,
        medicineData
      );
      return updatedMedicine;
    } catch (error) {
      console.log('Error in updateMedicine service method:', error);
      throw error;
    }
  }

  async getMedicinesByManufacturer(manufacturer) {
    try {
      const medicines =
        await this.medicineRepository.getMedicinesByManufacturer(manufacturer);
      return medicines;
    } catch (error) {
      console.log('Error in getMedicinesByManufacturer service method:', error);
      throw error;
    }
  }

  async updateDiscountAndPriceByManufacturer(manufacturer, discount) {
    try {
        // Ensure discount is parsed as a number
        console.log("dflajsd",discount)
        // Update discount for all medicines by manufacturer
        const updateDiscountResult = await this.medicineRepository.updateDiscountByManufacturer(manufacturer, discount);

        // Retrieve all medicines by manufacturer
        const medicines = await this.medicineRepository.getMedicinesByManufacturer(manufacturer);
        console.log("medicines", medicines);

        // Update prices for each medicine
        const updatePricePromises = medicines.map(async (medicine) => {
            try {
                const mrp = parseFloat(medicine.MRP);

                // Ensure that both MRP and parsedDiscount are valid numbers
                if (isNaN(mrp) || isNaN(discount)) {
                    throw new Error(`Invalid MRP (${medicine.MRP}) or discount (${discount}) for medicine: ${medicine._id}`);
                }

                // Calculate new price
                let newPrice = mrp * (1 - (discount / 100)); // Assuming discount is in percentage

                // Round new price to nearest integer
                newPrice = Math.round(newPrice);

                console.log("new price", newPrice);

                // Update price in repository
                await this.medicineRepository.updatePriceByMedicine(medicine._id, newPrice, discount);
            } catch (error) {
                console.error(`Error updating price for medicine ${medicine._id}:`, error);
                throw error; // Propagate error to outer catch block if needed
            }
        });

        await Promise.all(updatePricePromises);
        console.log("All prices updated successfully.");

        return { updateDiscountResult, message: `Successfully updated discount and prices for manufacturer: ${manufacturer}` };
    } catch (error) {
        console.error('Error in updateDiscountAndPriceByManufacturer service method:', error);
        throw error;
    }
}


  async insertManyMedicines(medicinesData) {
    try {
      const result = await this.medicineRepository.insertManyMedicines(medicinesData);
      return result;
    } catch (error) {
      console.log('Error in insertManyMedicines service method:', error);
      throw error;
    }
  }
  async searchMedicines(query) {
    try {
      const result = await this.medicineRepository.searchMedicines(query);
      return result;
    } catch (error) {
      console.log('Error in searchMedicines service method:', error);
      throw error;
    }
  }
  async getManufacturersByCategory(category) {
    try {
      const manufacturers = await this.medicineRepository.getManufacturersByCategory(category);
      return manufacturers;
    } catch (error) {
      console.log('Error in getManufacturersByCategory service method:', error);
      throw error;
    }
  }
}

export default MedicineService;