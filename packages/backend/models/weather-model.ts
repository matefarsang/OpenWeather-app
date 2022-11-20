import { Schema, model } from "mongoose";
import { WeatherDetails } from "../interfaces";

const weatherSchema = new Schema<WeatherDetails>({
  name: {
    type: String,
    required: true,
  },
  coord: {
    type: Object,
    required: true,
  },
  main: {
    type: Object,
    required: true,
  },
  wind: {
    type: Object,
    required: true,
  },
  clouds: {
    type: Object,
    required: true,
  },
  weather: [
    {
      type: Object,
      required: true,
    },
  ],
  language: String,
  createdAt: { type: Date, expires: 600, default: Date.now },
});

export const WeatherModel = model("Weather", weatherSchema);
