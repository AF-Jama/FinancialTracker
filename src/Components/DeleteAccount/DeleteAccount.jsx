import React,{useState,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import './DeleteAccount.css';
import useAuth from "../../customHook/useAuth";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE;

const DeleteAccount = (props)=>{
    const [deleteStatus,setDeleteStatus] = useState(null); // set delete status
    const { accessToken } = useAuth(); 

    const onDeleteButton = async ()=>{
        try{
            let res = await fetch(`${SERVER_BASE_URL}/account/accountDel?accountId=${props.accountData.accountId}`,{
                method:"DELETE",
                headers:{
                    "Authorization":`Bearer ${accessToken}`
                }
            })

            res = await res.json();

            if(res.statusCode!==200) throw Error;

            props.onrefetch();

            setDeleteStatus(true);

            setTimeout(()=>{
                props.onExitButton();
            },1000);
        }catch(error){
            setDeleteStatus(false);
        }
    }


    useEffect(()=>{
        setTimeout(()=>{
            if(deleteStatus===true || deleteStatus===false){
                setDeleteStatus(null);
            }
        },2000);
    },[deleteStatus])




    return (
        <div id="delete-account-container">
            {(deleteStatus===true) && <p>Succesful Deletion</p>}
            {(deleteStatus===false) && <p>Unsuccesful deletion</p>}
            <p>You are deleting account -  {props.accountData.accountName}</p>

            <div id="btn-container">
                <div id="cancel-btn" className="del-account-btn">
                    <button id="cancel-btn" onClick={props.onExitButton}>Cancel</button>
                </div>
                <div id="delete-btn" className="del-account-btn">
                    <button onClick={onDeleteButton}>Delete</button>
                </div>
            </div>

            {/* <div id="burger-btn-container">
                <FontAwesomeIcon id="btn" icon={faX} onClick={props.onExitButton} size="1x" color="black"/>
            </div> */}
        </div>
    )
}



export default DeleteAccount;