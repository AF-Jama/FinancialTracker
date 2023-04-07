import React,{useState,useReducer,useRef} from "react";
import ActionButton from "../ActionButton";
import './NavBar.css';


const NavBar = (props)=>{

    return (
        <nav className={props.visibility?"visible":"hide"}>
            <div id="nav-links">
                <a href="#" className="nav-link">Home</a>
                <a href="#" className="nav-link">Dashboard</a>
                <a href="#" className="nav-link">Github</a>
            </div>

            <div id="login-logout-btn-container">
                {1?<ActionButton text="Logout" onClick = {()=>"logout()"}/>:<ActionButton text="Login" onClick = {()=>"loginWithRedirect()"}/>}
            </div>
        </nav>
    )
}



export default NavBar;