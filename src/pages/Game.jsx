import React, { useState } from "react";
import { Plincko } from "../component/Plincko";

export const Game = () => {
    const [activeTab, setActiveTab] = useState("manual"); // Set default active tab
    const [balance, setBalance] = useState(1000);
    const [amount, setAmount] = useState(100);
    const [iplay, setIplay] = useState(false);
    const [obstacle, setObstacle] = useState(16)

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    console.log(obstacle);



    const playgame = () => {

        if ((balance > 0) && (balance >= amount)) {
            setBalance((prev) => (prev - amount))
            setIplay(true);
            setTimeout(() => setIplay(false), 100);
        } else {
            alert("Low On Money")
        }
    };
    const playgameautomatic = () => {
        if (balance > 0 && balance >= amount) {

            const interval = setInterval(() => {

                if (balance >= amount) {

                    setBalance((prev) => {
                        const newBalance = prev - amount;
                        return newBalance;
                    });
                    setIplay(true);
                    setTimeout(() => setIplay(false), 1000);
                } else {
                    clearInterval(interval);
                    alert("Low On Money");
                }
            }, 100);
        } else {
            alert("Low On Money");
        }
    };


    console.log(balance);

    return (
        <>
            <div className="row flex">
                <div className="col-md-4 p-5 pb-3 justify-Content-center">

                    <div className="w-96 border rounded-2xl shadow-md p-0">
                        {/* Tab Navigation */}
                        <div className="flex  border-b border-gray-200">
                            <button
                                className={`flex-1 py-2 cust text-center font-medium ${activeTab === "manual"
                                    ? "border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-500"
                                    }`}
                                onClick={() => handleTabClick("manual")}
                            >
                                Manual
                            </button>
                            <button
                                className={`flex-1 py-2 cust text-center font-medium ${activeTab === "auto"
                                    ? "border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-500"
                                    }`}
                                onClick={() => handleTabClick("auto")}
                            >
                                Auto
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="mt-4">
                            {activeTab === "manual" && (
                                <div className="text-dark">
                                    <div className="flex gapbetween">
                                        <label htmlFor="betamount" className="form-label">Bet Amount</label>
                                        <span className="amount">₹{balance}</span>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="form-control sadainput"
                                            aria-label="Bet Amount"
                                        />

                                    </div>

                                    <div className="mb-3 flex">
                                        <button onClick={() => setAmount(100)} className="btn btn-primary me-2">+100</button>
                                        <button onClick={() => setAmount(1000)} className="btn btn-primary me-2">+1000</button>
                                    </div>
                                    <div className="mb-3 flex">
                                        <button onClick={() => setAmount(10000)} className="btn btn-primary me-2">+10000</button>
                                        <button onClick={() => setAmount(100000)} className="btn btn-primary me-2">+100000</button>
                                    </div>

                                    <div className="mb-3 relative">
                                        <label htmlFor="cars" className="form-label block text-gray-700 font-medium">Risk</label>
                                        <select
                                            name="cars"
                                            id="cars"
                                            className="form-select bg-green-500 text-white border-2 border-gray-300 rounded-md px-4 py-2 appearance-none"
                                        >
                                            <option value="volvo">Low</option>
                                            <option value="volvo">Medium</option>
                                            <option value="volvo">High</option>
                                        </select>
                                        {/* <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-xl pointer-events-none">▼</span> */}
                                    </div>


                                    <div className="">
                                        <label htmlFor="row" className="form-label">Rows</label>
                                        <input
                                            type="range"
                                            id="vol"
                                            name="vol"
                                            value={obstacle}
                                            onChange={(e) => setObstacle(e.target.value)}
                                            min="8"
                                            max="16"
                                            className="form-range"
                                        />

                                    </div>
                                    <div className="flex gapbetween ranges "><span>8</span><span>{obstacle}</span></div>

                                    <div className="mt-3">
                                        <button onClick={playgame} className="btn custom_butn">
                                            BET NOW
                                        </button>
                                    </div>
                                </div>
                            )}
                            {activeTab === "auto" && (
                                <div className="text-dark">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="form-control"
                                            aria-label="Bet Amount"
                                        />
                                        <label htmlFor="betamount" className="form-label">Bet Amount</label>
                                        <div>{balance}</div>
                                    </div>

                                    <div className="mb-3">
                                        <button onClick={() => setAmount(100)} className="btn btn-primary me-2">+100</button>
                                        <button onClick={() => setAmount(1000)} className="btn btn-primary me-2">+1000</button>
                                    </div>
                                    <div className="mb-3">
                                        <button onClick={() => setAmount(10000)} className="btn btn-primary me-2">+10000</button>
                                        <button onClick={() => setAmount(100000)} className="btn btn-primary me-2">+100000</button>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="cars" className="form-label">Risk</label>
                                        <select name="cars" id="cars" className="form-select">
                                            <option value="volvo">Low</option>
                                            <option value="volvo">Medium</option>
                                            <option value="volvo">High</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="row" className="form-label">Rows</label>
                                        <input
                                            type="range"
                                            id="vol"
                                            name="vol"
                                            value={obstacle}
                                            onChange={(e) => setObstacle(e.target.value)}
                                            min="8"
                                            max="16"
                                            className="form-range"
                                        />
                                    </div>

                                    <div className="mt-3">
                                        <button onClick={playgameautomatic} className="btn btn-danger">
                                            BET NOW
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
                <div className="col-md-8">
                    <Plincko play={iplay}
                        numofobstacles={obstacle} />
                </div>
            </div>
        </>
    );
};
