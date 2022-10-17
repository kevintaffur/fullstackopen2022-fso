import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const samePersonNewNumber = persons.find(person => person.name === newName && person.number !== newNumber);
    const numberAlreadyExist = persons.find(person => person.number === newNumber);

    if (samePersonNewNumber) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          ...samePersonNewNumber,
          number: newNumber
        }
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
            setMessage(`${updatedPerson.name} updated`);
            setNotificationType('success');
          })
          .catch(err => {
            console.log(err);
            setMessage(`Information of ${updatedPerson.name} has already been removed from server`);
            setNotificationType('error');
          })
          .finally(() => {
            setTimeout(() => {
              setMessage(null);
              setNotificationType(null);
            }, 5000);
          });
      }
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
          setMessage(`${newPerson.name} added`);
          setNotificationType('success');
        })
        .catch(err => {
          setMessage(err.response.data.error);
          setNotificationType('error');
        })
        .finally(() => {
          setTimeout(() => {
            setMessage(null);
            setNotificationType(null);
          }, 5000);
        });
    }
  }

  const removePerson = (id) => {
    const personToDelete = persons.filter(person => person.id === id)[0];
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(id)
        .then(_ => {
          setPersons(persons.filter(person => person.id !== personToDelete.id));
          setMessage(`${personToDelete.name} removed`);
          setNotificationType('success');
        })
        .catch(_ => {
          setMessage(`Information of ${personToDelete.name} has already been removed from server`);
          setNotificationType('error');
        })
        .finally(() => {
          setTimeout(() => {
            setMessage(null);
            setNotificationType(null);
          }, 5000);
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
      <Notification message={message} type={notificationType} />
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
