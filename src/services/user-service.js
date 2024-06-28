import UserRepository from '../repository/user-repository.js';
import { PHONE_NOT_FOUND_ERR, PHONE_ALREADY_EXISTS_ERR, USER_NOT_FOUND_ERR, INCORRECT_OTP_ERR } from '../error/error.js';
import { generateOTP, sendSms } from '../utils/otp.util.js';
import { createJwtToken } from '../utils/token.util.js';

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createNewUser(data) {
    const { phone } = data;
    
    // Check if phone number already exists
    const phoneExist = await this.userRepository.findOne({ phone });
    if (phoneExist) {
      throw { status: 400, message: PHONE_ALREADY_EXISTS_ERR };
    }

    // Create user without OTP initially
    const user = await this.userRepository.create(data);

    return user;
  }

  async sendOTP(phone) {
    const user = await this.userRepository.findOne({ phone });
    if (!user) {
      throw { status: 404, message: USER_NOT_FOUND_ERR };
    }

    const otp = generateOTP(6);
    user.phoneOtp = otp;
    await this.userRepository.save(user);

    await sendSms({
      message: `Your OTP is ${otp}`,
      contactNumber: user.phone,
    });

    return otp;
  }

  async loginWithPhoneOtp(phone) {
    const user = await this.userRepository.findOne({ phone });
    if (!user) {
      throw { status: 400, message: PHONE_NOT_FOUND_ERR };
    }

    const otp = generateOTP(6);

    user.phoneOtp = otp;
    await this.userRepository.save(user);

    await sendSms({
      message: `Your OTP is ${otp}`,
      contactNumber: phone,
    });

    return { user };
  }

  async verifyPhoneOtp(data) {
    const { otp, userId } = data;
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw { status: 400, message: USER_NOT_FOUND_ERR };
    }
    if (user.phoneOtp === otp) {
      const token = createJwtToken({ userId: user._id });
      user.phoneOtp = '';
      await this.userRepository.save(user);
      return { token, userId: user._id };
    } else {
      throw { status: 400, message: INCORRECT_OTP_ERR };
    }
  }

  async fetchCurrentUser(user) {
    return user;
  }
  async deleteUserById(id) {
    try {
        const deletedUser = await this.userRepository.deleteById(id);
        return deletedUser;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}
async updateUserById(id, updateData) {
  try {
    return await this.userRepository.updateById(id, updateData);
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}

}

export default UserService;
