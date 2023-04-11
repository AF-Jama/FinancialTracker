import React,{useState,useReducer,useEffect} from "react";
import './SingleAccount.css';


const SingleAccount = ()=>{





    return (
        <div id="single-account-container">
            <div id="account-balance" className="account-stat-card">
                <h4>Current Balance</h4>
            </div>
            <div id="account-spending" className="account-stat-card">
                <h4>Spending</h4>
            </div>
            <div id="account-deposit" className="account-stat-card">
                <h4>Deposits</h4>
            </div>

            <div id="account-details-section">

            </div>

            <div id="transactions-container">

            </div>
        </div>
    )
}



export default SingleAccount;