"use client";
import { useState } from "react";

export default function Home() {
  const [bahtToJillInput, setBahtToJillInput] = useState("");
  const [bahtToGoldInput, setBahtToGoldInput] = useState("");
  const [bahtToJillRate, setBahtToJillRate] = useState(100);
  const [bahtToGoldRate, setBahtToGoldRate] = useState(1000);
  const [jillAmount, setJillAmount] = useState(0);
  const [goldAmount, setGoldAmount] = useState(0);

  const [jillToGold, setJillToGold] = useState(0);
  const [goldToJill, setGoldToJill] = useState(0);

  const parseRate = (text: string) => {
    const [baht, value] = text.split(":");
    const b = parseFloat(baht);
    const v = parseFloat(value);
    if (isNaN(b) || isNaN(v) || b <= 0) return 0;
    return v / b;
  };

  const handleCalculate = () => {
    const jillRate = parseRate(bahtToJillInput);
    const goldRate = parseRate(bahtToGoldInput);
    setBahtToJillRate(jillRate);
    setBahtToGoldRate(goldRate);
    const jillInGold = goldRate / jillRate;
    const goldInJill = jillRate / goldRate;
    setJillToGold(jillAmount * jillInGold);
    setGoldToJill(goldAmount * goldInJill);
  };

  const format = (num: number) =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <>
      <main className="min-h-screen bg-gray-800 p-6 flex flex-col items-center gap-6 text-gray-200">
        <h1 className="text-3xl font-bold text-gray-100">
          🔄 12 tails Currency Converter
        </h1>

        {/* Set Rates */}
        <section className="bg-gray-700 p-4 rounded-xl shadow w-full max-w-2xl space-y-4 border border-gray-600">
          <h2 className="text-xl font-semibold text-gray-100">
            Set Conversion Rates
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300">Baht : Jill</label>
              <input
                type="text"
                value={bahtToJillInput}
                onChange={(e) => setBahtToJillInput(e.target.value)}
                className="w-full border border-gray-500 rounded px-3 py-1 bg-gray-600 text-white"
                placeholder="e.g. 60:25000"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Baht : Gold</label>
              <input
                type="text"
                value={bahtToGoldInput}
                onChange={(e) => setBahtToGoldInput(e.target.value)}
                className="w-full border border-gray-500 rounded px-3 py-1 bg-gray-600 text-white"
                placeholder="e.g. 100:1000000"
              />
            </div>
          </div>
          <button
            onClick={handleCalculate}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded mt-2"
          >
            💲 Calculate Exchange Rates
          </button>
        </section>

        {/* Display Ratios */}
        <section className="bg-gray-700 p-4 rounded-xl shadow w-full max-w-2xl border border-gray-600">
          <h2 className="text-lg font-semibold text-gray-100">Currency Ratios:</h2>
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-300">
            <div>
              <p>Main Rates:</p>
              <p>1 Baht = {format(bahtToJillRate)} Jill</p>
              <p>1 Baht = {format(bahtToGoldRate)} Gold</p>
            </div>
            <div>
              <p>Cross Currency Rates:</p>
              <p>1 Jill = {format(bahtToGoldRate / bahtToJillRate)} Gold</p>
              <p>1 Gold = {format(bahtToJillRate / bahtToGoldRate)} Jill</p>
            </div>
          </div>
        </section>

        {/* Convert Section */}
        <section className="bg-gray-700 p-4 rounded-xl shadow w-full max-w-2xl space-y-6 border border-gray-600">
          <div>
            <h2 className="text-lg font-semibold text-gray-100">Jill ➜ Gold</h2>
            <div className="flex gap-2 mt-2">
              <input
                type="number"
                value={jillAmount}
                onChange={(e) => setJillAmount(Number(e.target.value))}
                className="border border-gray-500 rounded px-2 py-1 w-full bg-gray-600 text-white"
                placeholder="Jill Amount"
              />
              <button
                onClick={handleCalculate}
                className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded"
              >
                ⇄
              </button>
            </div>
            {jillAmount > 0 && (
              <p className="mt-2 text-gray-200">
                {format(jillAmount)} Jill ={" "}
                {format(jillAmount * (bahtToGoldRate / bahtToJillRate))} Gold
              </p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-100">Gold ➜ Jill</h2>
            <div className="flex gap-2 mt-2">
              <input
                type="number"
                value={goldAmount}
                onChange={(e) => setGoldAmount(Number(e.target.value))}
                className="border border-gray-500 rounded px-2 py-1 w-full bg-gray-600 text-white"
                placeholder="Gold Amount"
              />
              <button
                onClick={handleCalculate}
                className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded"
              >
                ⇄
              </button>
            </div>
            {goldAmount > 0 && (
              <p className="mt-2 text-gray-200">
                {format(goldAmount)} Gold ={" "}
                {format(goldAmount * (bahtToJillRate / bahtToGoldRate))} Jill
              </p>
            )}
          </div>
        </section>
      </main>

      {/* Watermark */}
      <div className="fixed bottom-2 right-2 text-xs text-white opacity-30 select-none pointer-events-none z-50">
        © pprm
      </div>
    </>
  );
}
