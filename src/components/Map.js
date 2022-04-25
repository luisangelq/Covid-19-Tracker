import React from "react";
import numeral from "numeral";
import { Map as LeafletMap, TileLayer, Circle, Popup } from "react-leaflet";

const Map = ({ casesType, countries, center, zoom }) => {
  const casesTypeColors = {
    cases: {
      hex: "#f0ca3d",
      multiplier: 100,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 100,
    },
    deaths: {
      hex: "#ff0000",
      multiplier: 100,
    },
  };

  const showCountries = () => {
    return countries.map((country, i) => (
      <Circle
        key={i}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={
          Math.sqrt(country[casesType]) *
            casesTypeColors[casesType].multiplier >
          100000
            ? Math.sqrt(country[casesType]) *
            casesTypeColors[casesType].multiplier
            : 70000
        }
      >
        <Popup>
          <div className="infoPop">
            <div className="infoPop__flag">
              <img src={country.countryInfo.flag} alt="flag" />
            </div>
            <div className="infoPop__name">{country.country}</div>
            <div className="infoPop__cases">
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div className="infoPop__recovered">
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
            <div className="infoPop__deaths">
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    ));
  };

  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Loop through and draw circles */}
        {countries ? showCountries() : null}
      </LeafletMap>
    </div>
  );
};

export default Map;
