import React,{useState,useEffect} from "react";
import { useAuth0 } from '@auth0/auth0-react';


const useFetch = (URL)=>{
    const [data,setData] = useState(null); // sets data state 
    const [loading,setLoading] = useState(true); // sets loading state 
    const [error,setError] = useState(false); // sets error state
    const { getAccessTokenSilently } = useAuth0();


    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                let accessToken = await getAccessTokenSilently(); // returns access token promise value
                let res = await fetch(URL,{
                    headers:{
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
                if(!res.ok) throw Error;

                res = await res.json();

                setData(res);
                setLoading(false);
                setError(false);
            }catch(error){
                setData(null);
                setLoading(true);
                setError(error);
            }
        }

        fetchData();
    },[URL])  // side effect which runs on mount and dependency array change

    return {data,loading,error} // return state object
}



export default useFetch;