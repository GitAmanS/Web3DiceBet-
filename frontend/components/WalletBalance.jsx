export default function WalletBalance({ balance }) {
    return (
      <div className="mb-4 p-4 bg-gray-800  text-center">
        <h2 className="text-lg">Balance: <span className="text-green-400">ETH {balance.toFixed(2)}</span></h2>
      </div>
    );
  }
  