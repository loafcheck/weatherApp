import './App.css';
import Search from './components/search/search';
import CurrrentWeather from './components/search/current-weather/current-weather';
import { WEATHER_API_URL, API_KEY} from './api';
import { useState } from 'react';

 

function App() {
  const [currentWeather, setCurrentWeather]= useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log('hello 6');
    const [latitude, longitude] = searchData.value.split(" ");
    console.log('hello 6-2');
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    console.log('hello 6-3');
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async(response)=> {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        console.log('hello 6-4');
        setCurrentWeather({city: searchData.label, ...weatherResponse});
        console.log(`city: searchData.label ->`, {city: searchData.label} , {...weatherResponse})
        setForecast({city: searchData.label, ...forecastResponse});
      })
      .catch ((err)=> console.log(err));
  }

  console.log('hello 7');
  console.log(`currentWeather: `, currentWeather );
  console.log(`forecast:`, forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrrentWeather data={currentWeather} />}
    </div>
  );
}

export default App;
