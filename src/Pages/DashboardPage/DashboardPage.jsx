import React,{useState,useEffect, useReducer} from "react";
import { Navigate } from "react-router";
import useSize from "../../customHook/useSize";
import Header from "../../Components/Header";
import SideBar from "../../Components/SideBar";
import Home from "../../Components/Home";
import Accounts from "../../Components/Accounts";
import CreateAccount from "../../Components/CreateAccount";
import SingleAccount from "../../Components/SingleAccount";
import useFetch from "../../customHook/useFetch";
import useAuth from "../../customHook/useAuth";
import './DashboardPage.css';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE; // returns server base URL

const DashBoardPage = ()=>{
    const { isAuthenticated,isLoading,accessToken,refreshToken,user,Logout } = useAuth();
    const { data,loading,error,refetch } = useFetch(`${SERVER_BASE_URL}/account/getAccountDetails`);
    const [dashboardPageState,setDashboardPageState] = useState(1); // set dashboard page state
    
    const accountDataReducer = (state,action)=>{
        console.log(action.payload);
        return {...action.payload};
    }
    
    const [ accountDataState,dispatch ] = useReducer(accountDataReducer,{
        accountData:null
    });

    console.log(data);

    
    const onHomeDashboard = (event)=>{
        event.preventDefault();

        setDashboardPageState(1);
    }

    const onBankAccountsDashboard = (event)=>{
        event.preventDefault();

        console.log("Account Dashboard");
        
        setDashboardPageState(2);
    }

    const onJointAccountDashboard = (event)=>{
        event.preventDefault();
        
        setDashboardPageState(3);
    }

    const onSingleAccountDashboardClick = (accountData)=>{

        dispatch({payload:accountData});
        // console.log(accountData);
        setDashboardPageState(4);
    }


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
    

    if(isLoading){
        return(
            <div id="spinner-container">
                <div id="spinner-grow" class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if(!isAuthenticated){
        return <Navigate to='/'/>
    }

    if(isAuthenticated && !isLoading){
        return (
            <div id="dashboard-page-container">
                <Header/>
    
    
                <main>
                    <div id="dashboard-inner-container">
                        <SideBar onHomeClick={onHomeDashboard} onAccountsClick={onBankAccountsDashboard} onJointAccountClick={onJointAccountDashboard}/>
                        {(dashboardPageState===1) && <Home dashboardData = {data} onHomeClick={onHomeDashboard} onAccountsClick={onBankAccountsDashboard} onJointAccountClick={onJointAccountDashboard}/> }
                        {(dashboardPageState===2) && <Accounts accountData={data} onSingleAccountClick={onSingleAccountDashboardClick} onrefetch = {refetch}/>} 

                        {(dashboardPageState===4) && <SingleAccount accountData={accountDataState}/>}
                    </div>
                </main>
            </div>
        )
    }
   
}



export default DashBoardPage;