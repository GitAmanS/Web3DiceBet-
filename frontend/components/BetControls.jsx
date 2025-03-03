export default function BetControls({ betAmount, setBetAmount }) {
    return (
      <div className="bg-gray-600 p-[1px] flex items-center space-x-4">
        <input
          type="number"
          className="w-full p-2 bg-gray-800 text-white text-center"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
        />
        <button onClick={() => setBetAmount((prev) => prev / 2)} className="px-3 py-2 ">
          ½
        </button>
        <button onClick={() => setBetAmount((prev) => prev * 2)} className="px-3 py-2 ">
          2×
        </button>
      </div>
    );
  }
  