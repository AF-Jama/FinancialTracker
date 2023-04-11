import React,{useState,useEffect} from "react";
import useAuth from "./useAuth";


const useFetch = (URL)=>{
    const [data,setData] = useState(null); // sets data state 
    const [loading,setLoading] = useState(true); // sets loading state 
    const [error,setError] = useState(false); // sets error state
    const { accessToken} = useAuth();
    
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                let res = await fetch(URL,{
                    headers:{
                        "Authorization":`Bearer ${accessToken}`
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
                setError(true);
            }
        }

        fetchData();
    },[URL,accessToken])  // side effect which runs on mount and dependency array change

    return {data,loading,error} // return state object
}



export default useFetch;