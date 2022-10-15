import Country from "./Country";
import CountryBasicData from "./CountryBasicData";

const Countries = ({ countries, search }) => {
  const found = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));

  if (found.length === 1) {
    return <CountryBasicData country={found[0]} />
  } else if (found.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  return (
    <div>
      {found
        .map(country => <Country key={country.name.official} country={country} />)}
    </div>
  )
}

export default Countries;