import { useState, useEffect } from "react";
import phonebook from "./services/phonebook";

const Filter = ({ filterTerm, setFilterTerm }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        type="text"
        value={filterTerm}
        onChange={(e) => setFilterTerm(e.target.value)}
      />
    </div>
  );
};

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleClick,
}) => {
  return (
    <form>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={handleClick}>
          add
        </button>
      </div>
    </form>
  );
};

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const Persons = ({ filteredpersons }) => {
  return (
    <div>
      {filteredpersons.map((person) => (
        <Person person={person} key={person.id} />
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    phonebook.getAll().then((response) => setPersons(response.data));
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  const filteredpersons =
    filterTerm === ""
      ? persons
      : persons.filter(
          (person) =>
            person.name.toLowerCase().indexOf(filterTerm.toLowerCase()) !== -1
        );

  const handleClick = (event) => {
    event.preventDefault();

    const personExists = persons.find((person) => person.name === newName);
    if (personExists) {
      return alert(`${newName} is already added to phonebook`);
    }
    const newPerson = { name: newName, number: newNumber };
    phonebook.create(newPerson).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterTerm={filterTerm} setFilterTerm={setFilterTerm} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleClick={handleClick}
      />
      <h3>Numbers</h3>
      <Persons filteredpersons={filteredpersons} />
    </div>
  );
};

export default App;
