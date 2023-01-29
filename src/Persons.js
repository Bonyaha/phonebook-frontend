import React from 'react';
import Display from './Display';

const Persons = ({
  //filtered,
  deleteNum,
  submitEdits,
  persons,
  setPersonEditing,
  personEditing,
  setNewName,
  setNumber,
}) => {
  return (
    <ol className="list-group list-group-numbered">
      {persons.length
        ? persons.map((person) => (
            <Display
              key={person.id}
              name={person.name}
              number={person.number}
              deleteNum={deleteNum}
              id={person.id}
              submitEdits={submitEdits}
              setPersonEditing={setPersonEditing}
              personEditing={personEditing}
              setNumber={setNumber}
              setNewName={setNewName}
            />
          ))
        : `User not found`}
    </ol>
  );
};

export default Persons;
