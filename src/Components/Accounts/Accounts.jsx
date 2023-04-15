import React,{useState,useEffect} from "react";
import useFetch from "../../customHook/useFetch";
import paginationRight from '../../assets/pagination-right.svg';
import paginationLeft from '../../assets/pagination-left.svg';
import CreateAccount from "../CreateAccount";
import DeleteAccount from "../DeleteAccount";
import './Accounts.css';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE;

const Accounts = (props)=>{
    // const { data,loading,error } = useFetch(`${SERVER_BASE_URL}/`);
    const [createAccountState,setCreateAccountState] = useState(false);
    const [deleteAccountState,setDeleteAccountState] = useState(false); // set delete account state
    const [accountState,setAccountState] = useState(null); 

    const onDeleteAccountClick = (accountData)=>{
        setAccountState(accountData);

        setDeleteAccountState(true);
    }



    return (

        <div id="accounts-container" className={(accountState || deleteAccountState)?"darker-background":""}>
            <div id="accounts-overview-section">
                <h2>Your Bank Accounts</h2>

                <div id="create-bank-account-container">
                    <button id="create-bank-account-btn" onClick={(deleteAccountState)?"":()=>setCreateAccountState(true)}>Create Bank Account</button>
                </div>
            </div>

            <div id="accounts-table-container">
            {
            
            (props.accountData.statusCode!==200)
            
            &&
                <div class="spinner-grow" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            }


            {(props.accountData.statusCode ===200) && 
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.accountData?.accountDetails[0].accounts.map(element=>(
                            <tr key={element}>
                                <td className="account-name">{element.accountName}</td>
                                <td className="account-type">{element.accountType}</td>
                                <td className="transaction-count">{element._count.transaction}</td>
                                <td className="account-actions">
                                    <div className="view-btn-container">
                                        <button className="account-action-btn" onClick={()=>props.onSingleAccountClick(element)}>View Account</button>
                                    </div>

                                    <div className="delete-btn-container">
                                        <button className="account-action-btn" onClick={(createAccountState)?"":()=>onDeleteAccountClick(element)}>Delete Account</button>
                                    </div>
                                </td>
                        </tr>
                        ))}

                    </tbody>
            </table>
            
            }    
            
            </div>
            {/* <img className="pagination-left" src={paginationLeft} alt="" />
            <img className="pagination-right" src={paginationRight} alt="" /> */}
            {createAccountState && <CreateAccount onExitButton={()=>setCreateAccountState(false)} onrefetch = {props.onrefetch}/> }
            {deleteAccountState && <DeleteAccount onExitButton = {()=>setDeleteAccountState(false)} accountData={accountState} onrefetch = {props.onrefetch}/> }
        </div>  
        
    )
}



export default Accounts;