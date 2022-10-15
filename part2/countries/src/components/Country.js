import React, { useState } from "react";
import Button from "./Button";

const Country = ({ country, showData }) => {
  const [show, setShow] = useState(showData);
  const handleShowData = () => setShow(!show);

  if (!show) {
    return (
      <div>
        {country.name.common} <Button handleClick={handleShowData} text="show" />
      </div>
    )
  }
  return (
    <>
      <h2>{country.name.common} <Button handleClick={handleShowData} text="hide" /></h2>
      <div>
        capital {country.capital}
      </div>
      <div>
        population {country.population}
      </div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages)
          .map(language => <li key={language}>{language}</li>)}
      </ul>
      <div>
        <img src={country.flags.png}
          alt="flag"
        />
      </div>
    </>
  )
}

export default Country;