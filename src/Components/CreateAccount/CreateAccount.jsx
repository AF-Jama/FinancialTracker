import React,{useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import './CreateAccount.css';


const CreateAccount = (props)=>{
    const [accountType,setAccountType] = useState(''); // set account type state
    const [accountName,setAccountName] = useState(''); // set account name state
    const [createStatus,setCreateStatus] = useState(null); // set creation status
    const [accountNameExistStatus,setAccountNameExistStatus] = useState(null); // set account name exists status
    console.log(accountType);
    console.log(accountName);

    const submit = (accountName,accountType)=>{
        // method triggered on submit
    }

    useEffect(()=>{
        // use effect runs to call endpoint to check if account name already exists
        const fetch =  async ()=>{
            try{
                let res = await fetch('');

                if(!res.ok) throw new Error("Error");

                res = await res.json();

                if(!res.exists){
                    // triggered is account name does not exist under user
                    setAccountNameExistStatus(false);
                }else{
                    throw Error('Account exists')
                }
            }catch(error){
                setAccountNameExistStatus(true);
            }
        }
    },[accountName]) // side effect runs on initial render(on mount) and on dependency array change

    useEffect(()=>{
        setTimeout(()=>{

        },3000)
    },[createStatus]) // side effect runs on initial render (on mount) and on dependency array change


    return (
        <div id="create-account-container" className={props.createAccountVisibility?"visible":"hidden"}>
            {createStatus?"Succesfully Created":""}
            <h4>Create An Account</h4>

            <form id="form-container">
                <div className="input-group">
                    <input type="text" id="account-name" placeholder="What do you want to call your account?" onChange={(event)=>setAccountName(event.target.value)}/>
                </div>

                <div className="input-group">
                    <select id="account-types" name="accounts" placeholder="Your Car">
                        <option value="basic" onSelect={(event)=>setAccountType(event.target.value)}>Basic</option>
                        <option value="Business" onSelect={(event)=>setAccountType(event.target.value)}>Business</option>
                        <option value="Corporate" onSelect={(event)=>setAccountType(event.target.value)}>Corporate</option>
                    </select>
                </div>

                <input id="create-account-btn" type="button" value="Create" onClick={console.log("SUCCESFUL")}/>
            </form>

            <FontAwesomeIcon id="exit-button" icon={faXmark} size="2x" color="white" onClick={props.onExitButton}/>
        </div>
    )
}



export default CreateAccount;