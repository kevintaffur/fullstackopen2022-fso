const CountryBasicData = ({ country }) => (
  <>
    <h2>{country.name.common}</h2>
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

export default CountryBasicData;