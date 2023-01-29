import React from 'react';

const Display = ({
  name,
  number,
  deleteNum,
  id,
  submitEdits,
  personEditing,
  setPersonEditing,
  setNewName,
  setNumber,
}) => {
  //console.log(info);
  return (
    <li className="list-group-item">
      {id === personEditing ? (
        <div>
          <input
            className="form-control form-control-sm w-50 mb-1"
            placeholder="Enter name"
            name="name"
            id="name"
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            className="form-control form-control-sm w-50 mb-1"
            type="tel"
            placeholder="Enter number"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
        </div>
      ) : (
        `${name}: ${number}`
      )}
      {id === personEditing ? (
        <button
          type="submit"
          onClick={() => submitEdits(id)}
          className="btn btn-primary btn-sm "
        >
          Submit edit
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-danger btn-sm ms-1 "
          onClick={() => setPersonEditing(id)}
        >
          🖋
        </button>
      )}

      <button
        type="button"
        className="btn btn-danger btn-sm float-end"
        onClick={() => deleteNum(id, name)}
      >
        DELETE
      </button>
    </li>
  );
};

export default Display;
