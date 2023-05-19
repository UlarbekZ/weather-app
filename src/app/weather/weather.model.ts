export interface WeatherDataResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: CityInfo;
}

export interface WeatherData {
  dt: number;
  main: WeatherConditions;
  weather: WeatherInfo[];
  wind: WindInfo;
  visibility: number;
  pop: number;
  clouds: {
    all: number;
  };
  rain: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export type WeatherDetails = WindInfo & { all: number };

export interface WeatherConditions {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export enum WeatherConditionsTitle {
  temp = 'Temperature',
  feels_like = 'Feels Like',
  temp_min = 'Minimum Temperature',
  temp_max = 'Maximum Temperature',
  pressure = 'Pressure',
  sea_level = 'Sea Level Pressure',
  grnd_level = 'Ground Level Pressure',
  humidity = 'Humidity',
  temp_kf = 'Temperature Kf',
}

export interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WindInfo {
  speed: number;
  deg: number;
  gust: number;
}

export interface CityInfo {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}
