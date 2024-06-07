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
  addNewPerson,
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
        <button type="submit" onClick={addNewPerson}>
          add
        </button>
      </div>
    </form>
  );
};

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}{" "}
      <button type="button" onClick={() => deletePerson(person.id)}>
        delete
      </button>
    </div>
  );
};

const Persons = ({ filteredpersons, deletePerson }) => {
  return (
    <div>
      {filteredpersons.map((person) => (
        <Person person={person} key={person.id} deletePerson={deletePerson} />
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

  const updateNumber = (id, newPerson) => {
    if (
      window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with new one?`
      )
    ) {
      phonebook.update(id, newPerson).then((response) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : response.data))
        );
        setNewName(""), setNewNumber("");
      });
    }
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    const personExists = persons.find((person) => person.name === newName);
    if (personExists) {
      return updateNumber(personExists.id, newPerson);
    }

    phonebook.create(newPerson).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons[id - 1].name}?`)) {
      phonebook
        .deletePerson(id)
        .then((response) =>
          setPersons(persons.filter((person) => person.id !== id))
        );
    }
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
        addNewPerson={addNewPerson}
      />
      <h3>Numbers</h3>
      <Persons filteredpersons={filteredpersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
