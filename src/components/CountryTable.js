import React from "react";

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
              <strong>{cases}</strong>
            </td>
          </tr>
        ))}
    </div>
  );
};

export default CountryTable;
