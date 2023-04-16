import React,{useState,useEffect,useReducer} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import './TransactionCard.css';
import useAuth from "../../customHook/useAuth";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE;


const TransactionCard = (props)=>{
    const { accessToken } = useAuth();
    const [errorState,setErrorState] = useState(false);
    const [succesfulState,setSuccesfulState] = useState('');
    console.log(props.accountData);


    const transactionReducer = (state,action)=>{
        console.log(action.payload);
        switch(action.type){
            case "UPDATE_AMOUNT":
                return {...state,...action.payload};

            case "UPDATE_TRANSACTION_TYPE":
                return {...state,...action.payload};

            case "UPDATE_ACCOUNT_TO":
                return {...state,...action.payload};

            case "UPDATE_DESCRIPTION":
                return {...state,...action.payload};


            default:
                return {
                    amount:null, // transaction type
                    description:null, // transaction description
                    accountTo:null, // transaction account to (required transfer transaction)
                    accountFrom:props.accountData.accountId, // transaction account from 
                    accountType:props.accountData.accountType // account type            
                };
        }
    }


    const [ state,dispatch ] = useReducer(transactionReducer,{
        amount:null, // transaction type
        description:null, // transaction description
        transactionType:null, // transaction type
        accountTo:null, // transaction account to (required transfer transaction)
        accountFrom:props.accountData.accountId, // transaction account from 
        accountType:props.accountData.accountType // account type
    });


    console.log(state);


    const onTransactionSubmit = async ()=>{
        try{
            const { accountId,balance,accountLimit,accountName,accountType,userId } = props.accountData;
            let { accountType:stateAccountTypes,accountFrom:stateAccountFrom,accountTo:stateAccountTo,transactionType:stateTransactionType,description:stateDescription,amount:stateAmount } = state;
            
            if(!stateAmount) throw new Error("Amount must be specified"); // 

            if(!stateTransactionType) throw new Error("Transaction type must be specified");

            if(stateTransactionType==="Transfer" && !stateAccountTo) throw new Error("The account being funds are being tranferred to must be specified");
            
            if(stateTransactionType==="Deposit" && ((parseFloat(stateAmount) + balance)>accountLimit) ) throw new Error("Cannot Deposit an amount that will exceed your account limit");
            
            if(stateTransactionType==="Withdrawal" && ((balance - parseFloat(stateAmount))<0)) throw new Error(`Cannot withdraw more than $${balance}`);
            
            if(stateTransactionType === "Transfer" && ((balance - parseFloat(stateAmount))<0)) throw new Error(`Cannot withdraw more than $${balance}`);
            
            let body = JSON.stringify({
                ...state,
                newBalance: (stateTransactionType=== "Deposit")?parseFloat(stateAmount) + balance:balance - parseFloat(stateAmount),
                accountLimit:accountLimit,
                accountId:accountId
            });

            let res = await fetch(`${SERVER_BASE_URL}/account/createTransaction`,{
                method:"POST",
                body:body,
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${accessToken}`
                }
            })

            res = await res.json();

            if(res.statusCode!==200) throw new Error(res.message);

            props.onrefetch();

            setSuccesfulState("Succesful Transaction");





        }catch(error){
            console.log(error);
            setErrorState(error.message);
        }
    }


    useEffect(()=>{
        if(errorState){
            setTimeout(()=>{
                setErrorState(false);
            },3000)
        }

        if(succesfulState){
            setTimeout(()=>{
                setSuccesfulState('');
            },3000)
        }
    },[errorState,succesfulState]);



    return (
        <div id="transaction-card-container">
            {errorState && errorState}
            {succesfulState && succesfulState}
            <h2>Add Transaction</h2>

            <div id="form-transaction-container">
                <div className="transaction-input">
                    <input type="number"  placeholder="Amount (0.00)" onChange={(event)=>dispatch({
                        type:"UPDATE_AMOUNT",
                        payload:{
                            amount:event.target.value===""?null:parseFloat(event.target.value).toFixed(2)
                        }
                    })}/>
                </div>

                <div className="transaction-input">
                    <select id="transaction-types" name="transactions" placeholder="Transaction Type" onChange={(event)=>dispatch({type:"UPDATE_TRANSACTION_TYPE",payload:{
                        transactionType:event.target.value,
                        accountTo:(event.target!=="Transfer") && null
                    }})}>
                            <option value=""></option>
                            <option value="Deposit">Deposit</option>
                            <option value="Transfer">Transfer</option>
                            <option value="Withdrawal">Withdrawal</option>
                    </select>
                </div>

                {
                    (state.transactionType==="Transfer")

                    &&

                <div className="transaction-input">
                    <input type="text" placeholder="Account to address" onChange={(event)=>dispatch({type:"UPDATE_ACCOUNT_TO",payload:{
                        accountTo:event.target.value
                    }})}/>
                </div>
                }

                <div className="transaction-input">
                    <input type="text" placeholder="description" onChange={(event)=>dispatch({type:"UPDATE_DESCRIPTION",payload:{
                        description:(event.target.value==='')?null:event.target.value
                    }})} />
                </div>
            </div>

            <div className="transaction-btn-container">
                <div id="transaction-submit-btn" className="transaction-btn">
                    <button onClick={onTransactionSubmit}>Add transaction</button>
                </div>
                <div id="transaction-cancel-btn" className="transaction-btn">
                        <button onClick={props.onExitButton}>Cancel</button>
                </div>
            </div>
        </div>
    )
}



export default TransactionCard;