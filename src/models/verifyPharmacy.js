import { model, Schema } from "mongoose";

const pharmacySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shopName: {
      type: String,
      // required: true,
      trim: true,
    },
    secondaryContactNumber: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    gstNumber: {
      type: String,
      trim: true,
    },
    drugLicenseNumber: {
      type: String,
      trim: true,
    },
    buyerType: {
      type: String,
      trim: true,
    },
    drugLicenseImage: {
      type: String,
      trim: true,
    },
    shopLocation: {
      type: String,
      trim: true,
    },
    landmark: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
    preferredContactNumber: {
      type: String,
      trim: true,
    },
    preferredLanguage: {
      type: String,
      trim: true,
    },
    optionalMessage: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Pharmacy = model("Pharmacy", pharmacySchema);
export default Pharmacy;
