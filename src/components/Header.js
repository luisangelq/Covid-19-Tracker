import { FormControl, MenuItem, Select } from "@mui/material";

const Header = ({countries, country, onCountryChange}) => {
  return (
    <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value={country}
          onChange={(e) => onCountryChange(e)}
        >
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country, index) => (
            <MenuItem key={index} value={country.value}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Header;
