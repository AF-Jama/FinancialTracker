import React,{useState} from "react";
import './SideBar.css';


const SideBar = ()=>{





    return (
        <div id="side-bar-container">
            <div id="welcome-container">
                <h3>Welcome, User!</h3> 
            </div>

            <div id="side-bar-links">
                <h4>Home</h4>
                <h4>Bank Accounts</h4>
                <h4>Joint</h4>
            </div>
        </div>
    )
}



export default SideBar;