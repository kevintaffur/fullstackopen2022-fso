import Button from "./Button";

const Person = ({ person, remove }) => (
  <div>{person.name} {person.number} <Button handleClick={() => remove(person.id)} text="delete" /></div>
)

export default Person;