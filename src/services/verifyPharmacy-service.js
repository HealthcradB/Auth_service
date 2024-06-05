import PharmacyRepository from "../repository/verifyPharmacy-repository.js";

class PharmacyService {
  constructor() {
    this.pharmacyRepository = new PharmacyRepository();
  }

  async createNewPharmacy(pharmacyData) {
    try {
      return await this.pharmacyRepository.createPharmacy(pharmacyData);
    } catch (error) {
      throw error;
    }
  }
  async updatePharmacyDetails(userId, data) {
    const pharmacy = await this.pharmacyRepository.findById(userId);
    if (!pharmacy) {
      throw { status: 404, message: 'Pharmacy details not found' };
    }

    const updatedPharmacy = await this.pharmacyRepository.updateById(userId, data);

    // Set the status to 'pending' indicating that the pharmacy request is pending approval
    updatedPharmacy.status = 'pending';
    await updatedPharmacy.save();

    return updatedPharmacy;
}


async getPharmacyDetails(userId) {
  try {
    const pharmacy = await this.pharmacyRepository.findById(userId);
    if (!pharmacy) {
      throw { status: 404, message: 'Pharmacy details not found' };
    }
    return pharmacy;
  } catch (error) {
    throw error;
  }
}

async getAllPendingRequests() {
  try {
    return await this.pharmacyRepository.findAll({ isApproved: false });
  } catch (error) {
    throw error;
  }
}

async setPharmacyStatus(id, status) {
  try {
    const updatedPharmacy = await this.pharmacyRepository.updateById(id, { status }, { new: true });

    if (!updatedPharmacy) {
      throw new Error("Pharmacy not found");
    }

    return updatedPharmacy;
  } catch (error) {
    throw new Error(`Error setting pharmacy status: ${error.message}`);
  }
}

}



export default PharmacyService;
