import React,{useEffect, useReducer, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import './CreateAccount.css';
import useAuth from "../../customHook/useAuth";
import useFetch from "../../customHook/useFetch";


const CreateAccount = (props)=>{
    const [accountName,setAccountName] = useState(''); // set account name state
    const [createStatus,setCreateStatus] = useState(null); // set creation status
    const [accountNameExistStatus,setAccountNameExistStatus] = useState(null); // set account name exists status
    const { refetch } = useFetch();
    const { accessToken } = useAuth();

    const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE;
    
    const accountReducer = (state,action)=>{
        switch(action.type){
            case "Basic":
                return {
                    accountType:"Basic",
                    accountLimit:20000
                }

            case "Business":
                return {
                    accountType:"Business",
                    accountLimit:200000
                }

            case "Corporate":
                return {
                    accountType:"Corporate",
                    accountLimit:2000000
                }

            default:
                return {
                    accountType:"",
                    accountLimit:null
                }
        }
    }
    const [ state,dispatch ] = useReducer(accountReducer,{
        accountType:"",
        accountLimit:null
    })
    
    const submit = async (accountName,accountState)=>{
        try{
            let { accountType,accountLimit } = accountState; // destructures account state object

            if(!accountType) return;

            let res = await fetch(`${SERVER_BASE_URL}/account/createAccount`,{
                method:"POST",
                body:JSON.stringify({
                    accountName:accountName,
                    accountLimit:accountLimit,
                    accountType:accountType
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${accessToken}`
                }
            });

            res = await res.json();

            console.log(res);

            if(res.statusCode===200){
                props.onrefetch();
                setCreateStatus(true);
                return;
            }
            console.log(accountType);
            console.log(accountLimit);
        }

        catch(error){
            console.log(error);
            return;
        }
    }

    useEffect(()=>{
        if(createStatus){
            setTimeout(()=>{
                setCreateStatus(false);
            },3000)
        }
    },[createStatus]) // side effect runs on initial render (on mount) and on dependency array change


    return (
        <div id="create-account-container">
            {createStatus?"Succesfully Created":""}
            <h4>Create An Account</h4>

            <form id="form-container">
                <div className="input-group">
                    <input type="text" id="account-name" placeholder="Account Name" onChange={(event)=>setAccountName(event.target.value)}/>
                </div>

                <div className="input-group">
                    <select id="account-types" name="accounts" placeholder="Your Car" onChange={(event)=>dispatch({type:event.target.value})}>
                        <option value=""></option>
                        <option value="Basic">Basic</option>
                        <option value="Business">Business</option>
                        <option value="Corporate">Corporate</option>
                    </select>
                </div>

                <input id="create-account-btn" type="button" value="Create" onClick={()=>submit(accountName,state)}/>
            </form>

            <FontAwesomeIcon id="exit-button" icon={faXmark} size="2x" color="white" onClick={props.onExitButton}/>
        </div>
    )
}



export default CreateAccount;