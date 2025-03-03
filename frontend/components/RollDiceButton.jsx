export default function RollDiceButton({ onRoll }) {
    return (
      <button
        onClick={onRoll}
        className="mt-4 bg-green-400 text-black font-bold py-3 px-6 rounded-sm text-sm transition hover:bg-green-600"
      >
        Bet
      </button>
    );
  }
  