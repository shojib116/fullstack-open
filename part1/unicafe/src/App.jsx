import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <section id="feedback">
        <h1>give feedback</h1>
        <button type="button" onClick={() => setGood(good + 1)}>
          good
        </button>
        <button type="button" onClick={() => setNeutral(neutral + 1)}>
          neutral
        </button>
        <button type="button" onClick={() => setBad(bad + 1)}>
          bad
        </button>
      </section>
      <section id="statistics">
        <h1>statistics</h1>
        <p>
          good {good}
          <br />
          neutral {neutral}
          <br />
          bad {bad}
        </p>
      </section>
    </div>
  );
};
export default App;
