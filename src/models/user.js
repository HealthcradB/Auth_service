import { model, Schema } from "mongoose";


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phoneOtp: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("remove", async function (next) {
  try {
    await Pharmacy.deleteMany({ userId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

const User = model("User", userSchema);
export default User;
