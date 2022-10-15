import Country from "./Country";

const Countries = ({ countries, search }) => {
  const found = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));

  if (found.length === 1) {
    return <Country country={found[0]} showData={true} />
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
        .map(country => <Country key={country.name.official} country={country} showData={false} />)}
    </div>
  )
}

export default Countries;