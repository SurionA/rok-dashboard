import { useState } from "react";

const App = ({ data }) => {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Rok - dashboard</h1>
      <p>Test</p>
      <div>
        <div>{count}</div>
        <button onClick={() => setCount(count + 1)}>Count</button>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </main>
  );
};

export default App;
