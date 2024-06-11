import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function(v) {
          return /^[6-9]\d{9}$/.test(v);
        },
        message: props => `${props.value} is not a valid 10-digit Indian phone number!`
      }
    },
    phoneOtp: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
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
