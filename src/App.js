import './App.css';
import Search from './components/search/search';
import CurrrentWeather from './components/search/current-weather/current-weather';
import { WEATHER_API_URL, API_KEY} from './api';
import { useState } from 'react';



function App() {
  const [currentWeather, setCurrentWeather]= useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [latitude, longitutde] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitutde}&appid=${API_KEY}`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitutde}&appid=${API_KEY}`)
    
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async(response)=> {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({city: searchData.label, ...weatherResponse});
        setForecast({city: searchData.label, ...forecastResponse});
      })
      .catch ((err)=> console.log(err));
  }

  console.log(`currentWeather: ${currentWeather.city} & ${currentWeather.wind.deg}`,currentWeather );
  console.log(`forecast: ${forecast}`);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      <CurrrentWeather/>
    </div>
  );
}

export default App;
