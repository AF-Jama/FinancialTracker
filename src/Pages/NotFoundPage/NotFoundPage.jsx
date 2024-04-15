import React,{useState,useEffect} from "react";
import leftArrow from '../../assets/white-left-arrow.svg';
import './NotFoundPage.css';


const NotFoundPage = ()=>{






    return (
        <div id="not-found-page-container">
            <h2>Page Not Found</h2>
            <a href="/"><img src={leftArrow} color="#fff" alt="" /></a>
        </div>
    )
}



export default NotFoundPage;