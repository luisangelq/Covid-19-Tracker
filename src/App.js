import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import "./styles/normalize.css";

import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import CountryTable from "./components/CountryTable";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(2);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://api.covid19.bnn.go.id/v3/covid-19/countries"
        );
        const data = await response.json();

        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        setCountries(countries);
        setTableData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (country === "worldwide") {
      getCountryData(country);
    }
  }, []);

  const getCountryData = async (countryCode) => {
    const url =
      countryCode === "worldwide"
        ? "https://api.covid19.bnn.go.id/v3/covid-19/all"
        : `https://api.covid19.bnn.go.id/v3/covid-19/countries/${countryCode}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setCountryInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(countryInfo);

  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    getCountryData(countryCode);
  };

  const { todayCases, todayRecovered, todayDeaths, cases, recovered, deaths } =
    countryInfo;
  return (
    <div className="App">
      <div className="app__leftContainer">
        <Header
          countries={countries}
          country={country}
          onCountryChange={onCountryChange}
        />
        <div className="app__stats">
          <InfoBox title="Infected" cases={todayCases} total={cases} />
          <InfoBox title="Recovered" cases={todayRecovered} total={recovered} />
          <InfoBox title="Deaths" cases={todayDeaths} total={deaths} />
        </div>

        <Map 
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app__rightContainer">
        {/* Table */}
        <CountryTable 
          countries={tableData}
        />

        {/* Graph */}
        <LineGraph />
      </Card>
    </div>
  );
}

export default App;
