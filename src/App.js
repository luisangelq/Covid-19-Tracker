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
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

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
        setMapCountries(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountries();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (country === "worldwide") {
      getCountryData(country);
    }
    // eslint-disable-next-line
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
      if (countryCode !== "worldwide") {
        setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long });
        setMapZoom(6);
      } else {
        setMapCenter({ lat: 34.80746, lng: -40.4796 });
        setMapZoom(2);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <InfoBox
            title="Infected"
            cases={todayCases}
            total={cases}
            color="#f0ca3d"
            onClick={(e) => setCasesType("cases")}
          />
          <InfoBox
            title="Recovered"
            cases={todayRecovered}
            total={recovered}
            color="#7dd71d"
            onClick={(e) => setCasesType("recovered")}
          />
          <InfoBox
            title="Deaths"
            cases={todayDeaths}
            total={deaths}
            color="#ff0000"
            onClick={(e) => setCasesType("deaths")}
          />
        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app__rightContainer">
        {/* Table */}
        <CountryTable countries={tableData} />

        {/* Graph */}
        <LineGraph 
          casesType={casesType}
        />
      </Card>
    </div>
  );
}

export default App;
