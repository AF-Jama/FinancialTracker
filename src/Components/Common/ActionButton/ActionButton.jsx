import React,{useState} from "react";
import './ActionButton.css';


const ActionButton = (props)=>{
    return (
        <button id="action-btn" onClick={props.onClick} style={props.style}>{props.text}</button>
    )
}



export default ActionButton;