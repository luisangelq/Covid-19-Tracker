import {useState, useEffect} from 'react';
import { FormControl, MenuItem, Select } from "@mui/material";
import "./styles/normalize.css";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://disease.sh/v3/covid-19/countries");
        const data = await response.json();

        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        setCountries(countries);
      } catch (error) {
        console.log(error);
  
      }
    };
    fetchCountries();
  }, []);
  console.log(countries);
  return (
    <div className="App">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant='outlined' value="abc">
            {countries.map((country, index) => (
              <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
