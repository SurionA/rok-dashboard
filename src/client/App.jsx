import { useState } from "react";

import Paragraph from "./Paragraph";
import styles from "./styles.module.css";

const App = ({ stats, profile }) => {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Rok - dashboard - 3</h1>
      <div className={styles.profile}>
        <img
          className={styles.avatar}
          src={`https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`}
        />
        <p>{profile.global_name}</p>
      </div>
      <Paragraph />
      <div>
        <div>{count}</div>
        <button onClick={() => setCount(count + 1)}>Count</button>
        <pre>{JSON.stringify(stats, null, 2)}</pre>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    </main>
  );
};

export default App;
