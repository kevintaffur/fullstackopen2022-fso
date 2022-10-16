import React from 'react';
import Person from "./Person";

const Persons = ({ persons, search, remove }) => (
  <>
    {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
      .map(person => <Person key={person.name} person={person} remove={remove} />)}
  </>
)

export default Persons;