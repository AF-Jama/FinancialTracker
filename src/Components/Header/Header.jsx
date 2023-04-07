import React,{useReducer,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faX } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/logo.png';
import NavBar from "../Common/NavBar";
import './Header.css';


const Header = ()=>{
    const [visibility,setVisibility] = useState(false); // set visibility state



    return (
        <header>
            <div id="inner-header-container">
                <div id="img-container">
                    <img src={logo} alt="" />
                </div>

                <NavBar visibility = {visibility}/>

                <div id="burger-btn-container">
                    {visibility?<FontAwesomeIcon id="btn" icon={faX} onClick={()=>setVisibility(false)} size="2x" color="white"/>:<FontAwesomeIcon id="btn" icon={faBars} onClick={()=>setVisibility(true)} size="2x" color="black"/>}
                </div>

                
            </div>
        </header>
    )
}



export default Header;