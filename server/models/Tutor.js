const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const TutorSchema = new mongoose.Schema(
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
      lowercase: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      required: true,
    },

    countryFlag: {
      type: String,
      default: "",
    },

    verified: {
      type: Boolean,
      default: false,
    },

    experienceYears: {
      type: Number,
      default: 0,
    },

    subjects: [
      {
        type: String,
      },
    ],

    curricula: [
      {
        type: String,
      },
    ],

    educationLevels: [
      {
        type: String,
      },
    ],

    languages: [
      {
        type: String,
      },
    ],

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    pricePerHour: {
      type: Number,
      required: true,
    },

    available: {
      type: Boolean,
      default: true,
    },

    matchPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    students: {
      type: Number,
      default: 0,
    },

    hoursTaught: {
      type: Number,
      default: 0,
    },

    bio: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Tutor", TutorSchema);