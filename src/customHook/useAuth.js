import React,{useContext} from "react";
import authContext from "../Contexts/AuthContext/AuthContext";

const useAuth = ()=>{
    return useContext(authContext);
}



export default useAuth;