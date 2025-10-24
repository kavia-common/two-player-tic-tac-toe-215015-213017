import React from 'react';

/**
 * Root application component placeholder.
 * Replace with full Tic Tac Toe implementation in later tasks.
 */
export function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ padding: 24 }}>
      <h1>Tic Tac Toe</h1>
      <p>Scaffold in place. Replace with game implementation.</p>
      <button onClick={() => setCount((c) => c + 1)}>Clicked {count} times</button>
    </div>
  );
}

export default App;
