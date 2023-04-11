import React,{useState} from "react";
import './SideBar.css';
import useAuth from "../../customHook/useAuth";


const SideBar = (props)=>{
    const { isAuthenticated,isLoading,user } = useAuth();

    let userObject = JSON.parse(user);

    // console.log(userObject.username);




    return (
        <div id="side-bar-container">
            <div id="welcome-container">
                <h3>Welcome, {userObject.username}!</h3> 
            </div>

            <div id="side-bar-links">
                <h4 onClick={props.onHomeClick}>Home</h4>
                <h4 onClick={props.onAccountsClick}>Bank Accounts</h4>
                <h4 onClick={props.onJointAccountClick}>Joint</h4>
            </div>
        </div>
    )
}



export default SideBar;