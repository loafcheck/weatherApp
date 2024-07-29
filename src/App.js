import './App.css';
import Search from './components/search/search';
import CurrrentWeather from './components/search/current-weather/current-weather';
function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  }
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      <CurrrentWeather/>
    </div>
  );
}

export default App;
