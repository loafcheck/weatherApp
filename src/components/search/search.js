import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";

const Search = ({onSearchChange}) => {

    console.log('hello 1');

    const [search, setsearch] = useState(null);

    console.log('hello 2');

    const loadOptions = (inputValue) => {
        console.log('hello2-2');
        return fetch (
            `${GEO_API_URL}/?namePrefix=${inputValue}`,
        geoApiOptions
        )

        .then (response => {
            return response.json();
        })

        .then(data => {
            //Log the parsed JSON data
            console.log('Full API response: ', data);
            //Map the data to the required format
            const options = data.data.map(city =>({
                value: `${city.latitude} ${city.longitude}`, // Correct property names
                label: `${city.name}, ${city.countryCode}` 
            }));

            console.log('hello 3');
            console.log('Mapped Options: ', options);

            return {options};
        })

        .catch(error => {
            // Handle and log any errors
            console.error('Error fetching data:', error);
            // Return an empty options array in case of an error
            return { options: [] };
        });
    };

    console.log('hello 4');

    const handleOnChange = (passingSelectedOptionFromTheInput) => {
        console.log('hello 5');
        console.log(`passingSelectedOptionFromTheInput ${JSON.stringify(passingSelectedOptionFromTheInput, null, 2)}`)
        setsearch(passingSelectedOptionFromTheInput);
        onSearchChange(passingSelectedOptionFromTheInput); //Notify parent component
    }

    return (
        <AsyncPaginate 
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
         
  
    )
}

export default Search;