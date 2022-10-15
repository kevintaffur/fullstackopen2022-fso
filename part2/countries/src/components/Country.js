import React, { useState, useEffect } from "react";
import Button from "./Button";
import axios from "axios";

const Country = ({ country, showData }) => {
  const [show, setShow] = useState(showData);
  const [weather, setWeather] = useState({});
  const handleShowData = () => setShow(!show);

  const capital = country.capital ? country.capital[0] : 'No Data';
  const name = country.name.common;
  const population = country.population;
  const languages = country.languages;
  const image = country.flags.png;

  const temperature = weather?.current?.temperature;
  const icon = weather?.current?.weather_icons[0];
  const windSpeed = weather?.current?.wind_speed;
  const windDir = weather?.current?.wind_dir;

  const access_key = process.env.REACT_APP_API_KEY;
  const query = capital;

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${access_key}&query=${query}`)
      .then(response => {
        setWeather(response.data);
      })
  }, []);

  if (!show) {
    return (
      <div>
        {name} <Button handleClick={handleShowData} text="show" />
      </div>
    )
  }

  return (
    <>
      <h2>{name} <Button handleClick={handleShowData} text="hide" /></h2>
      <div>
        <strong>Capital:</strong> {capital === 'No Data' ? <em>{capital}</em> : capital}
      </div>
      <div>
        <strong>Population:</strong> {population}
      </div>
      <h3>Spoken languages</h3>
      <ul>
        {Object.values(languages)
          .map(language => <li key={language}>{language}</li>)}
      </ul>
      <div>
        <img
          src={image}
          alt="flag"
        />
      </div>
      <h3>Weather in {capital === 'No Data' ? <em>{capital}</em> : capital}</h3>
      <div>
        <strong>Temperature:</strong> {temperature ? temperature : <em>{'No value'}</em>} Celcius
      </div>
      <div>
        <img
          src={icon}
          alt="icon"
        />
      </div>
      <div>
        <strong>Wind:</strong> {windSpeed ? windSpeed : <em>{'No value'}</em>} km/h direction {windDir ? windDir : <em>{'No value'}</em>}
      </div>
    </>
  )
}

export default Country;