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

                <div id="b-btn-container" className={visibility?"change":"ontainer"} onClick={()=>setVisibility(!visibility)}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>

                
            </div>
        </header>
    )
}



export default Header;