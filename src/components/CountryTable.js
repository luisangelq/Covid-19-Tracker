import React from "react";
import numeral from "numeral";

const CountryTable = ({ countries }) => {

  //order countries by cases
  const orderedCountries = countries.sort((a, b) => b.cases - a.cases);
  
  return (
    <div className="table">
      <h2>Live Cases by Country</h2>
      {orderedCountries
        .map(({ country, cases }) => (
          <tr>
            <td>{country}</td>
            <td>
              <strong>{numeral(cases).format("0,0")}</strong>
            </td>
          </tr>
        ))}
    </div>
  );
};

export default CountryTable;
