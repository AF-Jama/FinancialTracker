import React,{useState,useReducer,useRef} from "react";
import ActionButton from "../ActionButton";
import useAuth from "../../../customHook/useAuth";
import './NavBar.css';


const NavBar = (props)=>{
    const { isAuthenticated,isLoading,accessToken,refreshToken,user,Logout } = useAuth();


    return (
        <nav className={props.visibility?"visible":"hide"}>
            {/* <div id="nav-links">
                <a href="#" className="nav-link">Home</a>
                <a href="#" className="nav-link">Dashboard</a>
                <a href="#" className="nav-link">Github</a>
            </div> */}

            <div id="login-logout-btn-container">
                {isAuthenticated?<ActionButton text="Logout" onClick={()=>Logout()} style={{color:"red",padding:"0.5rem 1.5rem",backgroundColor:"transparent",border:"0.5px solid red"}}/>:<ActionButton text="Login" onClick = {()=>window.location.href="/login"} style={{color:"green",padding:"0.5rem 1.5rem",backgroundColor:"transparent",border:"0.5px solid green"}}/>}
            </div>
        </nav>
    )
}



export default NavBar;