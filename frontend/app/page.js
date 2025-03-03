"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import BetControls from "../components/BetControls.jsx";
import WalletBalance from "../components/WalletBalance.jsx";
import RollDiceButton from "../components/RollDiceButton.jsx";
import DiceSlider from "../components/DiceSlider.jsx";
import UsernameModal from "../components/UsernameModal.jsx";
import Sidebar from "@/components/Sidebar.jsx";

export default function Home() {
  const [betAmount, setBetAmount] = useState(1);
  const [balance, setBalance] = useState(5);
  const [rollResult, setRollResult] = useState(1);
  const [username, setUsername] = useState(null);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");

  const BaseApi = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (username) {
      axios
        .get(`${BaseApi}/api/wallet/${username}`)
        .then(({ data }) => setBalance(data.ethBalance));
    }
  }, [username]);

  const handleRollDice = async () => {
    console.log("Rolling dice...");
    try {
      if (!username) return alert("Enter username first!");

      console.log("Rolling dice...");
      const { data } = await axios.post(`${BaseApi}/api/roll-dice`, {
        address: username,
        bet: betAmount,
        clientSeed: "random123",
      });

      setRollResult(data.roll);
      setBalance(data.ethBalance);
    } catch (error) {
      alert(error.response?.data?.error || "Error rolling dice");
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || isNaN(depositAmount) || depositAmount <= 0) {
      alert("Enter a valid deposit amount!");
      return;
    }

    try {
      const { data } = await axios.post(`${BaseApi}/api/wallet/deposit`, {
        address: username,
        amount: parseFloat(depositAmount),
      });

      setBalance(data.ethBalance);
      setShowDepositModal(false);
      setDepositAmount("");
    } catch (error) {
      alert(error.response?.data?.error || "Error depositing balance");
    }
  };

  return (
    <div className="flex">
      <div className="w-[20%]">
        <Sidebar betAmount={betAmount} setShowDepositModal={setShowDepositModal} setBetAmount={setBetAmount} balance={balance} onRoll={handleRollDice}/>
      </div>
      
      <div className="min-h-screen w-[80%] flex flex-col items-center justify-center bg-gray-900 text-white">
        {!username && <UsernameModal setUsername={setUsername} />}
        
        {username && (
          <>
            <DiceSlider className="" rollResult={rollResult} />
            

          </>
        )}
      </div>

      {showDepositModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-white">Deposit Balance</h2>
            <input
              type="number"
              className="w-full mt-2 p-2 text-white rounded-md"
              placeholder="Enter amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md"
                onClick={() => setShowDepositModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md"
                onClick={handleDeposit}
              >
                Deposit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
