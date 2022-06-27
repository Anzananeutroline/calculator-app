import React from 'react';
import { ACTIONS } from "./Calculator";
import "./Operator.css";


const OperatorButton = ({dispatch,operation}) => {
    return (
        <button id = "button" onClick = {() => dispatch({type:ACTIONS.CHOOSE,payload:{operation}})} >{ operation}</button>
      
  )
}

export default OperatorButton;