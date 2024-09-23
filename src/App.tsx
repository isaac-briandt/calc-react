import { useState } from "react";

function CalcButton({
  value,
  className,
  onClick,
}: {
  value: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={`border bg-white border-black/50 hover:bg-blue-100 ${className}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default function Calculator() {
  const [calc, setCalc] = useState({
    current: "0",
    total: "0",
    isInitial: true,
    preOp: "",
  });

  const handleNumbersClick = (value: string) => {
    if (calc.isInitial === false) {
      value = calc.current + value;
    }
    setCalc({
      current: value,
      total: calc.total,
      isInitial: false,
      preOp: calc.preOp,
    });
  };

  const handleOperator = (value: string) => {
    const total = doCalculation();
    setCalc({
      current: total.toString(),
      total: total.toString(),
      isInitial: true,
      preOp: value,
    });
  };

  const doCalculation = () => {
    let total = parseInt(calc.total);

    switch (calc.preOp) {
      case "+":
        total += parseInt(calc.current);
        break;
      case "-":
        total -= parseInt(calc.current);
        break;
      case "/":
        total /= parseInt(calc.current);
        break;
      case "*":
        total *= parseInt(calc.current);
        break;
      default:
        total = parseInt(calc.current);
    }

    return total;
  };

  const handleCancel = () => {
    setCalc({
      current: "0",
      total: "0",
      isInitial: true,
      preOp: "",
    });
  };

  const renderDisplay = () => {
    return calc.current;
  };

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="flex justify-center items-center">
        <div className="w-[35rem] h-full">
          <div className="border-2 w-full border-black h-20 text-3xl flex justify-end items-end p-2 overflow-x-auto">
            {renderDisplay()}
          </div>
          <div className="grid grid-cols-4 h-56">
            <CalcButton onClick={() => handleNumbersClick("7")} value="7" />
            <CalcButton onClick={() => handleNumbersClick("8")} value="8" />
            <CalcButton onClick={() => handleNumbersClick("9")} value="9" />
            <CalcButton
              className="bg-gray-400 hover:bg-gray-300"
              onClick={() => handleOperator("/")}
              value="/"
            />

            <CalcButton onClick={() => handleNumbersClick("4")} value="4" />
            <CalcButton onClick={() => handleNumbersClick("5")} value="5" />
            <CalcButton onClick={() => handleNumbersClick("6")} value="6" />
            <CalcButton
              className="bg-gray-400 hover:bg-gray-300"
              value="*"
              onClick={() => handleOperator("*")}
            />

            <CalcButton onClick={() => handleNumbersClick("1")} value="1" />
            <CalcButton onClick={() => handleNumbersClick("2")} value="2" />
            <CalcButton onClick={() => handleNumbersClick("3")} value="3" />
            <CalcButton
              className="bg-gray-400 hover:bg-gray-300"
              value="-"
              onClick={() => handleOperator("-")}
            />

            <CalcButton onClick={handleCancel} value="C" />
            <CalcButton onClick={() => handleNumbersClick("0")} value="0" />
            <CalcButton onClick={() => handleOperator("=")} value="=" />
            <CalcButton
              className="bg-gray-400 hover:bg-gray-300"
              value="+"
              onClick={() => handleOperator("+")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
