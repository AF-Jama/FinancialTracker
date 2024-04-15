import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import './ErrorPage.css';


const ErrorPage = (props)=>{



    return (
        <div id="error-page-container">
            <div id="error-container">
                <h2>404 | Not Found</h2>
            </div>
            <div id="left-back-container">
                <FontAwesomeIcon icon={faArrowLeft} color="white" size="2x" onClick={()=>window.location.href='/'}/>
            </div>
        </div>
    )
}



export default ErrorPage;