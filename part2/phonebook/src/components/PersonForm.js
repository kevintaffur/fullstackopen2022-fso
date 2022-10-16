import React from 'react';

const PersonForm = ({ add, name, number, handleNameChange, handleNumberChange }) => (
  <form onSubmit={add}>
    <div>
      name: <input
        value={name}
        onChange={handleNameChange}
      />
    </div>
    <div>
      number: <input
        value={number}
        onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm;