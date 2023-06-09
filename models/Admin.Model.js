import mongoose from "mongoose";
import bcrypt from "bcrypt";
import AppError from "../utils/appError.js";

const administrator = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  fullName: { type: String },
  address: { type: String },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    default: "Admin",
  },
  slots: {
    type: Number,
    default: 15,
  },
  investors: {
    type: Array,
    default: [],
  },
  handlers: {
    type: Array,
    default: [],
  },
  clients: { type: Array, default: [] },
  refreshToken: {
    type: [String],
    select: false,
  },
  passwordChangedAt: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isValidated: {
    type: Boolean,
    default: false,
  },
});

administrator.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  return next();
});

administrator.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new AppError(`We found a ducpliacte user for ${this.email}`));
  } else {
    next();
  }
});

const adminModel = mongoose.model("administrator", administrator);

export default adminModel;
