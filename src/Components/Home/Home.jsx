import React,{useState} from "react";
import eye from '../../assets/eye.png';
import CreateAccount from "../CreateAccount";
import './Home.css';


const Home = (props)=>{
    const [createAccountVisibility,setCreateAccountVisibility] = useState(false); // set create account visibility state

    const onExitButton = (event)=>{
        event.preventDefault();

        setCreateAccountVisibility(false);
    }

    console.log("SUCCCESFUL");


    return (
        <div id="home-dashboard-container">
            <div className="dashboard-card" id="number-bank-accounts-card">
                <h5>Accounts</h5>

                <p>{(props.dashboardData?.statusCode === 200)?props.dashboardData?.accountDetails[0].accounts.length:"Loading"}</p>
            </div>

            <div className="dashboard-card" id="number-transactions-card">
                <h5>Transactions</h5>

                <p>{(props.dashboardData?.statusCode===200)?props.dashboardData?.accountDetails[0].accounts.reduce((accumalator,a)=>accumalator+a._count.transaction,0):"Loading"}</p>
            </div>

            <div className="dashboard-card" id="total-spent-card">
                <h5>Spent</h5>

                <p>${(props.dashboardData?.statusCode===200)?parseFloat(props.dashboardData?.accountDetails[0]?.accounts.reduce((accumalator,a)=>accumalator+a.transaction.reduce((accumalator2,b)=>accumalator2+b.transactionAmount,0),0)).toFixed(2):"Loading.."}</p>
            </div>

            <div id="home-action-container">
                <h4>Things To Do!</h4>

                <div id="home-action-btn-container">
                    <h5 id="view-account-btn" className="actions" onClick={props.onAccountsClick}>View Your account</h5>
                    <h5 id="create-account-btn" className="actions" onClick={props.onJointAccountClick}>View Joint Account</h5>
                </div>
            </div>
        </div>
    )
}




export default Home;