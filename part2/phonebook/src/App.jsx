import { useState, useEffect } from "react";
import phonebook from "./services/phonebook";
import "./index.css";

const Notification = ({ message, status }) => {
  if (message === null) {
    return null;
  }

  return <div className={status}>{message}</div>;
};

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
    phonebook.getAll().then((initialPhonebook) => setPersons(initialPhonebook));
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    status: null,
  });

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
      phonebook
        .update(id, newPerson)
        .then((returnedEntry) => {
          setPersons(
            persons.map((person) => (person.id !== id ? person : returnedEntry))
          );
          setNewName(""), setNewNumber("");
        })
        .catch(() => {
          setNotification({
            message: `Information of ${newPerson.name} has already been removed from server`,
            status: "error",
          });
          setTimeout(
            () =>
              setNotification({
                message: null,
                status: null,
              }),
            5000
          );
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

    phonebook.create(newPerson).then((returnedEntry) => {
      setPersons(persons.concat(returnedEntry));
      setNewName("");
      setNewNumber("");
      setNotification({
        message: `Added ${returnedEntry.name}`,
        status: "success",
      });
      setTimeout(
        () =>
          setNotification({
            message: null,
            status: null,
          }),
        5000
      );
    });
  };

  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons[id - 1].name}?`)) {
      phonebook
        .deletePerson(id)
        .then((_) => setPersons(persons.filter((person) => person.id !== id)));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        status={notification.status}
      />
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
