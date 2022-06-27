import React, { useReducer,useState } from 'react';
import DigitButton from './DigitButton';
import OperatorButton from './OperatorButton';
import "./Calculator.css";

export const ACTIONS = {
        ADD_DIGIT: "add-digit",
        CLEAR: "clear",
        CHOOSE: "choose",
        DELETE: "delete",
        EQUAL:"equal"
    }

    function reducer(state, { type, payload }){
        switch (type) {
            case ACTIONS.ADD_DIGIT:
                if (state.overwrite) {
                    return {
                        ...state,
                        currentOperand: payload.digit,
                        overwrite:false
                    }
                }
                if (payload.digit === "0" && state.currentOperand === "0")  return state 
                if (payload.digit === "." && state.currentOperand.includes(".")) {
                    return state
                }
                return {
                    ...state,
                    currentOperand:`${state.currentOperand || ""}${payload.digit}`
                }
            
            case ACTIONS.CHOOSE:
                if (state.currentOperand == null && state.previousOperand == null) {
                    return state
                }

                if (state.currentOperand == null) {
                    return {
                        ...state,
                        operation:payload.operation
                    }
                }
                if (state.previousOperand == null) {
                    return {
                        ...state,
                        operation: payload.operation,
                        previousOperand: state.currentOperand,
                        currentOperand:null
                    }
                }

                return {
                    ...state,
                    previousOperand: evaluate(state),
                    operation: payload.operation,
                    currentOperand:null
                }
                
            case ACTIONS.CLEAR:
                return {}
            
            case ACTIONS.EQUAL:
                if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
                    return state
                }

                return {
                    ...state,
                    previousOperand: null,
                    overwrite:true,
                    currentOperand:evaluate(state)
                }
            
            case ACTIONS.DELETE:
                if (state.overwrite) {
                    return {
                        ...state,
                        overwrite: false,
                        currentOperand:null
                    }
                }
                if (state.currentOperand == null) return state
                if (state.currentOperand.length === 1) {
                    return {
                        ...state,
                        currentOperand:null
                    }
                }

                return {
                    ...state,
                    currentOperand:state.currentOperand.slice(0,-1)
                }
            default:
                return state;
        }

     
}
    
function evaluate({ currentOperand, previousOperand, operation }) {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev || isNaN(current))) return "" 
    let computation = "";
    switch (operation) {
        case "+":
            computation = prev + current;
            break;
        case "-":
            computation = prev - current;
            break;
        case "*":
            computation = prev * current;
            break;
        case "÷":
            computation = prev / current;
            break;
    }
    return computation.toString();
    
}
const Calculator = () => {
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});
    const [status, setStatus] = useState(false);
    //    dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit:1}})

    const onToggle = () => {
        setStatus(status => !status);
    }
  return (
      <div className={status?`calculator`:`calculator default`}>
          <div className="output">
              <div className="previous-output">{previousOperand}{ operation}</div>
              <div className="current-output">{currentOperand}</div>
               <div className="toggle-mode">
              <i class="fa-solid fa-toggle-off" onClick = {onToggle} style = {{display:status?"none":"block"}} ></i>
              <i class="fa-solid fa-toggle-on"style = {{display:status?"block":"none"}} onClick = {onToggle}></i>
          </div>
          </div>
          
 <button className="span-two" onClick = { () => (dispatch({type:ACTIONS.CLEAR}))} id="btn1">AC</button>
 <button onClick = { () => (dispatch({type:ACTIONS.DELETE}))} id = "btn2">X</button>
       <OperatorButton dispatch={dispatch} operation="÷"/>
          <DigitButton dispatch={dispatch} digit = "1"/>
          <DigitButton dispatch={dispatch} digit = "2"/>
          <DigitButton dispatch={dispatch} digit = "3"/>
       <OperatorButton dispatch={dispatch} operation = "*" />
          <DigitButton dispatch={dispatch} digit = "4"/>
          <DigitButton dispatch={dispatch} digit = "5"/>
          <DigitButton dispatch={dispatch} digit = "6"/>
        <OperatorButton dispatch={dispatch} operation = "+" />
          <DigitButton dispatch={dispatch} digit = "7"/>
          <DigitButton dispatch={dispatch} digit = "8"/>
          <DigitButton dispatch={dispatch} digit = "9"/>
        <OperatorButton dispatch={dispatch} operation="-" />
             <DigitButton dispatch={dispatch} digit = "."/>
             <DigitButton dispatch={dispatch} digit = "0"/>
              <button className="span-two" id='orange-background' onClick={() => (dispatch({ type: ACTIONS.EQUAL }))}>=</button>
              
    </div>
  )
}

export default Calculator;