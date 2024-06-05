import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all === 0) return <p>No feedback given</p>;
  const average = (good - bad) / all;
  const positive = good / all;
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive * 100}%`} />
      </tbody>
    </table>
  );
};

const Button = ({ handler, text }) => {
  return (
    <button type="button" onClick={handler}>
      {text}
    </button>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div>
      <section id="feedback">
        <h1>give feedback</h1>
        <Button handler={() => setGood(good + 1)} text="good" />
        <Button handler={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handler={() => setBad(bad + 1)} text="bad" />
      </section>
      <section id="statistics">
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </section>
    </div>
  );
};
export default App;
