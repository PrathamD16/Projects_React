import React from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import { useReducer } from "react";
import "./style.css";

//List of action
export const ACTION = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVAL: "eval",
};

//Here our action will be type and payload
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTION.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      // Exception Handling for corner cases
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTION.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null)
        return {}; //Corner case for selecting a operation first

      //This is for scenario where current operand is not NULL
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      //A error handling when user wants to change operation when it enters the current operand
      //Ex: if we type 6+ and you want to replace + by * then it should display 6*
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTION.CLEAR:
      return {};

    case ACTION.EVAL:
      if (
        state.currentOperand == null ||
        state.operation == null ||
        state.previousOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };

    case ACTION.DELETE_DIGIT:
      if (state.overwrite)
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      if (state.currentOperand == null) {
        return state;
      }
      if (state.currentOperand.length == 1) {
        return { ...state, currentOperand: null };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0,-1) 
      }
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(currentOperand);
  const curr = parseFloat(previousOperand);
  if (isNaN(prev) || isNaN(curr)) return "";
  let ans = "";
  switch (operation) {
    case "+":
      ans = prev + curr;
      break;
    case "-":
      ans = prev - curr;
      break;
    case "*":
      ans = prev * curr;
      break;
    case "÷":
      ans = prev / curr;
      break;
  }
  return ans.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits: 0
})

function formatOperand(operand){
  if(operand == null)return 
  const [integer,decimal] = operand.split('.')
  if(decimal == null)return INTEGER_FORMATTER.format(integer )
  return `${INTEGER_FORMATTER.format(integer )}.${decimal}`
}

function App() {
  //here we divde states into currOperand,previousOperand and Operation
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <div className="calci-grid">
      <div className="output">
        <div className="pre-operand">
          {previousOperand} {operation}
        </div>
        <div className="curr-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => {
          dispatch({ type: ACTION.CLEAR });
        }}
      >
        AC
      </button>
      <button
        onClick={() => {
          dispatch({ type: ACTION.DELETE_DIGIT });
        }}
      >
        DEL
      </button>
      <OperationButton operation="÷" dispatch={dispatch} />

      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />

      <OperationButton operation="*" dispatch={dispatch} />

      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton dispatch={dispatch} digit="6" />

      <OperationButton operation="+" dispatch={dispatch} />

      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />

      <OperationButton operation="-" dispatch={dispatch} />

      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTION.EVAL })}
      >
        =
      </button>
    </div>
  );
}

export default App;