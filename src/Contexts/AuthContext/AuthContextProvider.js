import React,{useState,useEffect,useContext, useReducer} from "react";
import Cookies from 'js-cookie';
import authContext from "./AuthContext";

const reducer = (state,action)=>{
    // reducer method
    switch(action.type){
        case "UPDATE":
            return {...action.payload}; // returns updated state

        case "REMOVE":
                return {}; // returns empty state
            
    }
}

const initialState = {
    username:"",
    email:"",
    verified:false
} // initial state object


const AuthContextProvider = ({children})=>{
    // const [user,dispatch] = useReducer(reducer,initialState);  
    const [user,setUser] = useState(null); 
    const [accessToken,setAccessToken] = useState(null); // initial state of login context provider is null, a logged in user represents a existing jwt in a user request cookie.
    const [refreshToken,setRefreshToken] = useState(null); // refresh token state, initial state null  
    const [isLoading,setIsLoading] = useState(true); // set isLoading state
    const [isAuthenticated,setIsAuthenticated] = useState(false); // authentication state which is bool value


    const Logout = ()=>{
        Cookies.remove("access_token"); // removes access token
        Cookies.remove("refresh_token"); // removes refresh token
        Cookies.remove("user"); // removes user
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        setIsLoading(false);
        setIsAuthenticated(false);
    }


    useEffect(()=>{
        const cookieAccessToken = Cookies.get("access_token"); // returns cookie access token
        const cookieRefreshToken = Cookies.get("refresh_token"); // returns cookie refresh token
        const cookieUser = Cookies.get("user"); // returns user cookie

        if(cookieAccessToken && cookieRefreshToken && cookieUser){
            // triggered if block evaulates to true
            setAccessToken(cookieAccessToken);
            setRefreshToken(cookieRefreshToken);
            setUser(cookieUser);
            setIsLoading(false);
            setIsAuthenticated(true);
        }

        else{
            Logout(); // logout routinE
        }

    },[Cookies.get("access_token"),Cookies.get("refresh_token"),Cookies.get("user")]); // runs on mount and on dependecy array change



    return (
        <authContext.Provider value={{isAuthenticated,isLoading,accessToken,refreshToken,Logout,user}}>
            {children}
        </authContext.Provider>
    )
}



export default AuthContextProvider;