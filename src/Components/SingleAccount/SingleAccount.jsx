import React,{useState,useReducer,useEffect} from "react";
import TransactionCard from "../TransactionCard";
import DeleteAccount from "../DeleteAccount";
import './SingleAccount.css';


const SingleAccount = (props)=>{
    const [ transactionCardState,setTransactionCardState ] = useState(false);
    const [deleteStatus,setDeleteStatus] = useState(false); // set delete status
    // console.log(props.accountData);
    // console.log(JSON.stringify(props.accountData));
    console.log(props.accountData);



    return (
        <div id="single-account-container">
            <div id="account-balance" className="account-stat-card">
                <h4>Balance</h4>

                <p className="c-balance">${parseFloat(props.accountData.balance).toFixed(2)}</p>
            </div>
            <div id="account-spending" className="account-stat-card">
                <h4>Spending</h4>

                <p className="spending">${props.accountData.transaction.filter(element=>element.transactionType==="Withdrawal").reduce((accumalator,a)=>accumalator+a.transactionAmount,0)}</p>
            </div>
            <div id="account-deposit" className="account-stat-card">
                <h4>Deposits</h4>

                <p className="deposit">${parseFloat(props.accountData.transaction.filter(element=>element.transactionType==="Deposit").reduce((accumalator,a)=>accumalator+a.transactionAmount,0)).toFixed(2)}</p>
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
                        <button onClick={()=>setDeleteStatus(true)}>Delete Account</button>
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
                                <td id="table-amount" style={(element.transactionType==="Transfer" || element.transactionType==="Withdrawal")?{color:"red"}:{color:"#26a526"}}>${element.transactionAmount}</td>
                                <td id="table-transactionType">{element.transactionType}</td>
                                <td id="table-accountTo-date">{(element.transactionType==="Transfer")?element.accountTo.substring(0,5) + "...":"N/A"}</td>
                                <td id="table-date">{new Date(element.transactionTimeStamp).toDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div id="transaction-btn-container">
                    <button onClick={()=>setTransactionCardState(true)}>Add Transaction</button>
                </div>
            </div>
            {transactionCardState && <TransactionCard accountData={props.accountData} onExitButton = {()=>setTransactionCardState(false)} onrefetch = {props.onrefetch}/>}
            {deleteStatus && <DeleteAccount onExitButton = {()=>setDeleteStatus(false)} accountData={props.accountData} onfetch = {props.onrefetch}/>}
        </div>
    )
}



export default SingleAccount;