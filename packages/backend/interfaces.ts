export type WeatherDetails = {
  lat: any;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  wind: { wind_speed: number; wind_deg: number };
  clouds: {
    all: number;
  };
  weather: [
    {
      id: Number;
      main: String;
      description: String;
      icon: String;
    }
  ];
  language: string;
  createdAt: Date;
};
