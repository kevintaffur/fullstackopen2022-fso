import Person from "./Person";

const Persons = ({ persons, search }) => (
  <>
    {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
      .map(person => <Person key={person.name} person={person} />)}
  </>
)

export default Persons;