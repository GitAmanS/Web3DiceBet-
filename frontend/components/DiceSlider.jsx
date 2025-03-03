import { useEffect, useState } from "react";

export default function DiceSlider({ rollResult }) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (rollResult) {
      let step = 100 / 6; 
      let percentage = (rollResult - 1) * step + step / 2;
      setPosition(percentage);
    }
  }, [rollResult]);

  return (
    <div className="relative w-full max-w-lg mt-6 mx-8">
      <div className="flex w-full z-40">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="w-1/6 flex flex-col text-sm items-center justify-center"
          >
            <p>{index + 1}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="11">
              <path fill="#e5e7eb" d="m7.5 3l7.5 8H0z" />
            </svg>
          </div>
        ))}
      </div>
      
      <div className="flex items-center w-full h-2 p-8 bg-[#344452] rounded-full overflow-hidden relative">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden relative">
          <div className="absolute w-1/2 h-full left-0 bg-red-600"></div>
          <div className="absolute w-1/2 h-full right-0 bg-green-500"></div>
        </div>
      </div>

      <div
        className="absolute top-12 transition-all duration-700 ease-in-out"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-8 h-8 flex items-center justify-center bg-white text-green-600 font-bold text-xl rounded-lg shadow-2xl">
          {rollResult}
        </div>
      </div>
    </div>
  );
}