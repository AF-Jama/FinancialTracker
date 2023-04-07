import React,{useState,useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import useSize from "../../customHook/useSize";
import Header from "../../Components/Header";
import SideBar from "../../Components/SideBar";
import Home from "../../Components/Home";
import CreateAccount from "../../Components/CreateAccount";
import './DashboardPage.css';
import useFetch from "../../customHook/useFetch";

const DashBoardPage = ()=>{
    const { data,loading,error } = useFetch("http://localhost:5000/authorized");

    // console.log(data);


    // useEffect(()=>{
    //     const fetchAccessToken = async ()=>{
    //         let accessToken = await getAccessTokenSilently();
    //         let accessId = await getIdTokenClaims();

    //         console.log(accessToken);
    //         console.log(accessId);
    //         console.log(user);
    //     }

    //     fetchAccessToken();
    // },[]); // side effect which runs on initial render (on mount) and on dependency array change

    if(1){
        return(
            <div id="spinner-container">
                <div id="spinner-grow" class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if(1){
        return (
            <div id="dashboard-page-container">
                <Header/>
    
    
                <main>
                    <div id="dashboard-inner-container">
                        <SideBar/>
                        <Home/>
                        <CreateAccount/>
                    </div>
                </main>
            </div>
        )
    }
   
}



export default DashBoardPage;