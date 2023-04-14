import React,{useState,useReducer,useEffect} from "react";
import './SingleAccount.css';


const SingleAccount = (props)=>{
    console.log(props.accountData);
    console.log(JSON.stringify(props.accountData));



    return (
        <div id="single-account-container">
            <div id="account-balance" className="account-stat-card">
                <h4>Balance</h4>

                <p className="c-balance">${props.accountData.balance}</p>
            </div>
            <div id="account-spending" className="account-stat-card">
                <h4>Spending</h4>

                <p className="spending">${props.accountData.transaction.filter(element=>element.transactionType==="Withdrawal").reduce((accumalator,a)=>accumalator+a.transactionAmount,0)}</p>
            </div>
            <div id="account-deposit" className="account-stat-card">
                <h4>Deposits</h4>

                <p className="deposit">${props.accountData.transaction.filter(element=>element.transactionType==="Deposit").reduce((accumalator,a)=>accumalator+a.transactionAmount,0)}</p>
            </div>

            <div id="account-details-section">
                <h1>Bank Account Details</h1>

                <p className="account-details" id="account-name"><span>Name</span>: {props.accountData.accountName}</p>
                <p className="account-details" id="account-type"><span>Type</span>: {props.accountData.accountType}</p>
                <p className="account-details" id="account-balance"><span>Starting balance</span>: 0</p>
                <p className="account-details" id="account-balance-alert"><span>Low Balance Alert</span>: None</p>

                <div id="account-details-btn-container">
                    <div id="edit-btn-container" className="account-details-btns">
                        <button>Edit Details</button>
                    </div>
                    <div id="delete-btn-container" className="account-details-btns">
                        <button>Delete Account</button>
                    </div>
                </div>
            </div>

            <div id="transactions-container">
                <table className="transaction-table">
                    <thead>
                            <tr>
                                <th className="table-header">Amount</th>
                                <th className="table-header">Type</th>
                                <th className="table-header">Account To</th>
                                <th className="table-header">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {props.accountData.transaction.map(element=>(
                                <tr>
                                    <td id="table-amount" style={(element.transactionType==="Transfer")?{color:"#26a526"}:{color:"red"}}>${element.transactionAmount}</td>
                                    <td id="table-transactionType">{element.transactionType}</td>
                                    <td id="table-accountTo-date">{(element.transactionType==="Transfer")?element.accountTo.substring(0,5) + "...":"N/A"}</td>
                                    <td id="table-date">04-04-1988</td>
                                </tr>
                            ))}
                        </tbody>
                </table>

                <div id="transaction-btn-container">
                    <button>Add Transaction</button>
                </div>
            </div>
        </div>
    )
}



export default SingleAccount;