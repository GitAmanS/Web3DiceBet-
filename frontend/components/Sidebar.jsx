import React from "react";
import WalletBalance from "./WalletBalance";
import BetControls from "./BetControls";
import RollDiceButton from "./RollDiceButton";

const Sidebar = ({
  betAmount,
  setBetAmount,
  balance,
  onRoll,
  setShowDepositModal,
}) => {
  return (
    <div className="bg-[#344452] w-full p-1 h-full flex flex-col">
      <WalletBalance balance={balance} />
      <label>
        <span className=" text-sm text-gray-300">Bet Amount:</span>
      </label>
      <BetControls betAmount={betAmount} setBetAmount={setBetAmount} />
      <RollDiceButton onRoll={onRoll} />

      <button
        className="mt-4 px-4 py-2 bg-green-500 rounded-sm"
        onClick={() => setShowDepositModal(true)}
      >
        Add Etherium
      </button>
    </div>
  );
};

export default Sidebar;
