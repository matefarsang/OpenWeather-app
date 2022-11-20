import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("hu");

  const getUrl = (location, language) =>
    `http://localhost:3001/weather/${location}?lang=${language}`;

  const languagesOptions = [
    { value: "hu", label: "Magyar" },
    { value: "en", label: "English" },
  ];

  const cityOptions = [
    { value: "Budapest", label: "Budapest" },
    { value: "Győr", label: "Győr" },
    { value: "Debrecen", label: "Debrecen" },
    { value: "Miskolc", label: "Miskolc" },
    { value: "Pécs", label: "Pécs" },
    { value: "Sopron", label: "Sopron" },
    { value: "Szeged", label: "Szeged" },
    { value: "Gyékényes", label: "Gyékényes" },
  ];

  const handleCityChange = (selectedOptions) => {
    setLocation(selectedOptions.value);
  };

  const handleLanguageChange = (selectedOptions) => {
    setLanguage(selectedOptions.value);
  };

  useEffect(() => {
    if (!location) return;
    axios
      .get(getUrl(location, language))
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => alert(e.response?.data?.message));
  }, [location, language]);

  const date = new Date(data.createdAt);
  const hoursAndMinutes =
    date.getHours() + " óra : " + date.getMinutes() + " perckor";
  const withPmAm = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="app">
      <div className="language">
        <Select
          className="selectLanguage"
          options={languagesOptions}
          onChange={handleLanguageChange}
          placeholder={
            language === "hu" ? "Válasszon nyelvet" : "Choose a language"
          }
        />
      </div>
      <div className="city">
        <Select
          className="selectCity"
          options={cityOptions}
          onChange={handleCityChange}
          placeholder={language === "hu" ? "Válasszon várost" : "Choose a city"}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>
                {language === "hu"
                  ? (((data.main.temp - 32) * 5) / 9).toFixed() + " °C"
                  : data.main.temp.toFixed() + " °F"}
              </h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="dataCreatedAt">
              {data.createdAt ? (
                <p className="bold">
                  {language === "hu" ? hoursAndMinutes : withPmAm}
                </p>
              ) : null}
              <p>{language === "hu" ? "frissítve" : "Updated at"}</p>
            </div>
            <div className="lat">
              {data.coord ? <p className="bold">{data.coord.lat}°</p> : null}
              <p>{language === "hu" ? "Szélességi kör" : "LAT"}</p>
            </div>
            <div className="lon">
              {data.coord ? <p className="bold">{data.coord.lon}°</p> : null}
              <p>{language === "hu" ? "Hosszúság" : "LON"}</p>
            </div>
            <div className="pressure">
              {data.main ? (
                <p className="bold">{data.main.pressure.toFixed()} Pa</p>
              ) : null}
              <p>{language === "hu" ? "Nyomás" : "Pressure"}</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity} %</p>
              ) : null}
              <p>{language === "hu" ? "Páratartalom" : "Humidity"}</p>
            </div>
            <div className="windSpeed">
              {data.wind ? (
                <p className="bold">
                  {language === "hu"
                    ? (data.wind.speed * 1.609344).toFixed() + " Km/h"
                    : data.wind.speed.toFixed() + " Mp/h"}
                </p>
              ) : null}
              <p>{language === "hu" ? "Szélerősség" : "Wind Speed"}</p>
            </div>
            <div className="windDeg">
              {data.wind ? (
                <p className="bold">{data.wind.deg.toFixed()} °</p>
              ) : null}
              <p>{language === "hu" ? "Szélirány" : "Wind DEG"}</p>
            </div>
            <div className="clouds">
              {data.clouds ? <p className="bold">{data.clouds.all} %</p> : null}
              <p>{language === "hu" ? "Felhőzet" : "Clouds"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
