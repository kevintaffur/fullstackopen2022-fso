import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const nameAlreadyExist = persons.find(person => person.name === newName);
    const numberAlreadyExist = persons.find(person => person.number === newNumber);

    if (nameAlreadyExist && numberAlreadyExist) {
      alert(`${newName} and ${newNumber} are already added to phonebook`);
    } else if (nameAlreadyExist) {
      alert(`${newName} is already added to phonebook`);
    } else if (numberAlreadyExist) {
      alert(`${newNumber} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        });
    }
  }

  const removePerson = (id) => {
    const person = persons.filter(person => person.id === id)[0].name;
    if (window.confirm(`Delete ${person}?`)) {
      personService
        .remove(id)
        .then(returnedPersons => {
          setPersons(returnedPersons);
        });
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        add={addPerson}
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        search={search}
        remove={removePerson}
      />
    </div>
  )
}

export default App;
