import express from "express";
import { Request, Response } from "express";
import { WeatherModel } from "../models/weather-model";
import { WeatherDetails } from "../interfaces";
import axios from "axios";

const apiKey = process.env.APIKEY || "46d4b7c5d34fa20f4e66d522546c5d5f";

const router = express.Router();

router.get("/:city", async (req: Request, res: Response) => {
  const { lang } = req.query;
  const { city } = req.params;

  const weather = await WeatherModel.findOne({ name: city, language: lang });
  if (weather) {
    return res.json(weather);
  }

  const response = await axios(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}&lang=${lang}`
  );
  const weatherData: WeatherDetails = response.data;
  if (weatherData) {
    const weather = new WeatherModel({
      name: weatherData.name,
      coord: weatherData.coord,
      main: weatherData.main,
      wind: weatherData.wind,
      clouds: weatherData.clouds,
      weather: weatherData.weather,
      language: lang,
    });
    weather.save();

    weatherData.createdAt = new Date();
    return res.json(weatherData);
  }

  return res.status(400).json({
    message:
      lang === "hu"
        ? "Sajnos nem találjuk a kért adatot : ( "
        : "Unfortunately, we could not find the requested data : (",
  });
});

export default router;
