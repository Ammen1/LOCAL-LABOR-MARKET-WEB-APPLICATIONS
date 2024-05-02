

import mongoose from "mongoose";

const PinSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    locationName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export const Pin = mongoose.model("Pin", PinSchema);
