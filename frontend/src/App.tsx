import React from 'react';

/**
 * Theme colors and small style helpers
 */
const theme = {
  primary: '#3b82f6',
  secondary: '#64748b',
  success: '#06b6d4',
  error: '#EF4444',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
};

type Player = 'X' | 'O' | null;

/**
 * Utility to calculate the winner of a tic tac toe board.
 */
function calculateWinner(squares: Player[]): Player {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * Square: Clickable cell for the game board.
 */
function Square({
  value,
  onClick,
  disabled,
  highlight,
}: {
  value: Player;
  onClick: () => void;
  disabled?: boolean;
  highlight?: boolean;
}) {
  // Accessibility: role="button" + aria-pressed to indicate state
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={!!value}
      aria-label={`Board square ${value ?? 'empty'}`}
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        backgroundColor: theme.surface,
        border: `2px solid ${highlight ? theme.primary : '#e5e7eb'}`,
        borderRadius: 12,
        color:
          value === 'X'
            ? theme.primary
            : value === 'O'
            ? theme.success
            : theme.text,
        fontWeight: 800,
        fontSize: 'clamp(24px, 6vw, 48px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'transform 120ms ease, border-color 120ms ease, box-shadow 120ms ease',
        boxShadow: highlight ? `0 6px 20px -8px rgba(59,130,246,.35)` : 'none',
        outline: 'none',
      }}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)';
        }
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
      }}
    >
      {value}
    </button>
  );
}

/**
 * PUBLIC_INTERFACE
 * Board: 3x3 grid of Squares.
 */
function Board({
  squares,
  onSquareClick,
  winningLine,
  isBoardDisabled,
}: {
  squares: Player[];
  onSquareClick: (index: number) => void;
  winningLine: number[] | null;
  isBoardDisabled: boolean;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(64px, 120px))',
        gap: 12,
        width: '100%',
        maxWidth: 380,
      }}
    >
      {squares.map((sq, idx) => {
        const highlight = winningLine?.includes(idx) ?? false;
        return (
          <Square
            key={idx}
            value={sq}
            onClick={() => onSquareClick(idx)}
            disabled={isBoardDisabled || !!sq}
            highlight={highlight}
          />
        );
      })}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * App: Root application managing game state and layout.
 * - Alternates turns between X and O
 * - Detects winner or draw
 * - Displays current player and result status
 * - Provides a restart button
 */
export function App() {
  const [squares, setSquares] = React.useState<Player[]>(Array<Player>(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState<boolean>(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((s) => s !== null);

  // compute winning line to highlight
  const winningLine = React.useMemo(() => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ] as number[][];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [a, b, c];
      }
    }
    return null;
  }, [squares]);

  const handleSquareClick = (index: number) => {
    if (squares[index] || winner) return; // ignore clicks on filled cells or after game end
    setSquares((prev) => {
      const next = [...prev];
      next[index] = xIsNext ? 'X' : 'O';
      return next;
    });
    setXIsNext((prev) => !prev);
  };

  const restart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "It's a draw!"
    : `Current player: ${xIsNext ? 'X' : 'O'}`;

  const statusColor = winner
    ? theme.primary
    : isDraw
    ? theme.secondary
    : theme.text;

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: theme.background,
        color: theme.text,
        display: 'grid',
        placeItems: 'center',
        padding: 16,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 540,
          background: theme.surface,
          borderRadius: 16,
          padding: 20,
          boxShadow:
            '0 10px 15px -3px rgba(17,24,39,0.08), 0 4px 6px -4px rgba(17,24,39,0.06)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <header style={{ textAlign: 'center' }}>
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: 800,
              letterSpacing: 0.2,
              color: theme.text,
            }}
          >
            Tic Tac Toe
          </h1>
          <p
            style={{
              marginTop: 8,
              marginBottom: 0,
              color: statusColor,
              fontWeight: 600,
            }}
            aria-live="polite"
          >
            {status}
          </p>
        </header>

        <main
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Board
            squares={squares}
            onSquareClick={handleSquareClick}
            winningLine={winningLine}
            isBoardDisabled={!!winner || isDraw}
          />
        </main>

        <footer
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            onClick={restart}
            style={{
              padding: '10px 16px',
              background:
                winner ? theme.primary : isDraw ? theme.secondary : theme.primary,
              color: 'white',
              border: 'none',
              borderRadius: 10,
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: 0.2,
              boxShadow: '0 6px 16px -8px rgba(59,130,246,.55)',
              transition: 'transform 120ms ease, filter 160ms ease',
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            }}
            aria-label="Restart game"
          >
            Restart Game
          </button>
        </footer>

        <div
          style={{
            marginTop: 4,
            fontSize: 12,
            color: theme.secondary,
            textAlign: 'center',
          }}
        >
          <span>Play locally: X and O take turns on the same device.</span>
        </div>
      </div>
    </div>
  );
}

export default App;
