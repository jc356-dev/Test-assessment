import React, { useState } from "react";

interface State {
  display: string;
  waitingForOperand: boolean;
  prevValue: number | null;
  operator: string | null;
}
export default function IPhoneCalculator(): React.JSX.Element {
  const [state, setState] = useState<State>({
    display: "0",
    waitingForOperand: false,
    prevValue: null,
    operator: null,
  });

  const partialStateUpdate = (newState: Partial<State>): void => {
    setState((prevState) => {
      return { ...prevState, ...newState };
    });
  };

  const calculateResult = () => {
    const { display, prevValue, operator } = state;
    const currentValue = parseFloat(display);
    let result = prevValue as number;
    switch (operator) {
      case "+":
        result += currentValue;
        break;
      case "-":
        result -= currentValue;
        break;
      case "x":
        result *= currentValue;
        break;
      case "/":
        result /= currentValue;
        break;
      default:
        break;
    }
    partialStateUpdate({
      display: result.toString(),
      waitingForOperand: false,
      prevValue: result,
      // operator,
    });
  };

  const handleDigitClick = (digit: string): void => {
    const { display, waitingForOperand } = state;
    if (waitingForOperand) {
      partialStateUpdate({ display: digit, waitingForOperand: false });
    } else {
      partialStateUpdate({
        display: display === "0" ? digit : display + digit,
      });
    }
  };

  const handleOperatorClick = (operator: string): void => {
    const { display, prevValue, operator: prevOperator } = state;
    if (prevValue !== null && !prevOperator) {
      calculateResult();
    } else {
      partialStateUpdate({
        prevValue: parseFloat(display),
      });
    }
    partialStateUpdate({
      operator,
      waitingForOperand: true,
    });
  };

  const handleEqualsClick = (): void => {
    calculateResult();
    partialStateUpdate({waitingForOperand: true})
  };

  const handleClearClick = () => {
    partialStateUpdate({
      display: "0",
      prevValue: null,
      operator: null,
      waitingForOperand: false,
    });
  };

  const handleNegateClick = () => {
    const { display } = state;
    if (display !== "0") {
      partialStateUpdate({
        display: display.charAt(0) === "-" ? display.slice(1) : "-" + display,
      });
    }
  };

  const handleDecimalClick = () => {
    const { display } = state;
    if (!display.includes(".")) {
      partialStateUpdate({
        display: display + ".",
      });
    }
  };

  const handlePercentageClick = () => {
    const { display } = state;
    const value = parseFloat(display);
    const percentageValue = value / 100;
    partialStateUpdate({ display: percentageValue.toString() });
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{state.display}</div>
      <div className="calculator-buttons">
        <div className="calculator-row">
          <button onClick={handleClearClick} className="bg-lightgray">
            AC
          </button>
          <button onClick={handleNegateClick} className="bg-lightgray">
            +/-
          </button>
          <button onClick={handlePercentageClick} className="bg-lightgray">
            %
          </button>
          <button
            onClick={() => handleOperatorClick("/")}
            className="bg-orange"
          >
            &divide;
          </button>
        </div>
        <div className="calculator-row">
          <button onClick={() => handleDigitClick("7")}>7</button>
          <button onClick={() => handleDigitClick("8")}>8</button>
          <button onClick={() => handleDigitClick("9")}>9</button>
          <button
            onClick={() => handleOperatorClick("x")}
            className="bg-orange"
          >
            x
          </button>
        </div>
        <div className="calculator-row">
          <button onClick={() => handleDigitClick("4")}>4</button>
          <button onClick={() => handleDigitClick("5")}>5</button>
          <button onClick={() => handleDigitClick("6")}>6</button>
          <button
            onClick={() => handleOperatorClick("-")}
            className="bg-orange"
          >
            -
          </button>
        </div>
        <div className="calculator-row">
          <button onClick={() => handleDigitClick("1")}>1</button>
          <button onClick={() => handleDigitClick("2")}>2</button>
          <button onClick={() => handleDigitClick("3")}>3</button>
          <button
            onClick={() => handleOperatorClick("+")}
            className="bg-orange"
          >
            +
          </button>
        </div>
        <div
          className="calculator-row"
          style={{ gridTemplateColumns: "2fr 1fr 1fr" }}
        >
          <button onClick={() => handleDigitClick("0")} className="">
            0
          </button>
          <button onClick={handleDecimalClick}>.</button>
          <button onClick={handleEqualsClick} className="bg-orange">
            =
          </button>
        </div>
      </div>
    </div>
  );
}
