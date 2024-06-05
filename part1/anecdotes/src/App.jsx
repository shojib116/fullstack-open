import { useState } from "react";

const getRandom = (low, high) => {
  return Math.floor(low + Math.random() * (high - low + 1));
};

//This function is so that I don't get the same random number twice. i.e. so that the anecdote does not remain the same when clicked next anecdote
const random = (low, high, already) => {
  let randomNumber = getRandom(low, high);
  while (randomNumber === already) {
    randomNumber = getRandom(low, high);
  }
  return randomNumber;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const [selected, setSelected] = useState(0);
  const mostVotes = Math.max(...votes);
  const mostVoted = anecdotes[votes.indexOf(mostVotes)];
  return (
    <div>
      <section id="regularAnecdote">
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <button
          type="button"
          onClick={() => {
            const newVotes = [...votes];
            newVotes[selected] += 1;
            setVotes(newVotes);
          }}
        >
          vote
        </button>
        <button
          type="button"
          onClick={() => {
            setSelected(random(0, anecdotes.length - 1, selected));
          }}
        >
          next anecdote
        </button>
      </section>
      <section id="highestVoted">
        <h1>Anecdote with most votes</h1>
        <p>{mostVoted}</p>
        <p>has {mostVotes} votes</p>
      </section>
    </div>
  );
};

export default App;
