import React,{useState,useEffect} from "react";
import useFetch from "../../customHook/useFetch";
import paginationRight from '../../assets/pagination-right.svg';
import paginationLeft from '../../assets/pagination-left.svg';
import CreateAccount from "../CreateAccount";
import './Accounts.css';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE;

const Accounts = (props)=>{
    const { data,loading,error } = useFetch(`${SERVER_BASE_URL}/`);
    const [createAccountState,setCreateAccountState] = useState(false);



    return (

        <div id="accounts-container">
            <div id="accounts-overview-section">
                <h2>Your Bank Accounts</h2>

                <div id="create-bank-account-container">
                    <button id="create-bank-account-btn" onClick={()=>setCreateAccountState(true)}>Create Bank Account</button>
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
                            <th>Transaction Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.accountData?.accountDetails[0].accounts.map(element=>(
                            <tr>
                                <td className="account-name">{element.accountName}</td>
                                <td className="account-type">{element.accountType}</td>
                                <td className="transaction-count">{element._count.transaction}</td>
                                <td className="account-actions">
                                    <div className="view-btn-container">
                                        <button className="account-action-btn">View Account</button>
                                    </div>

                                    <div className="delete-btn-container">
                                        <button className="account-action-btn">Delete Account</button>
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
            {createAccountState && <CreateAccount onExitButton={()=>setCreateAccountState(false)}/> }
        </div>  
        
    )
}



export default Accounts;