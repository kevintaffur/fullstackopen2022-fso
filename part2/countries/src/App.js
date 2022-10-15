import React, { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  return (
    <>
      <div>
        find countries <input
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <Countries countries={countries} search={search} />
    </>
  )
}

export default App;
