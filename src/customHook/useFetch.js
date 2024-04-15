import React,{useState,useEffect} from "react";
import useAuth from "./useAuth";


const useFetch = (URL)=>{
    const [data,setData] = useState(null); // sets data state 
    const [loading,setLoading] = useState(true); // sets loading state 
    const [error,setError] = useState(false); // sets error state
    const [refetchIndex, setRefetchIndex] = useState(0); // sets refetch state 
    const { accessToken} = useAuth();

    const refetch = ()=> setRefetchIndex((prevFetchIndex)=>prevFetchIndex+1); // method increments fetch state
    
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
    },[URL,accessToken,refetchIndex])  // side effect which runs on mount and dependency array change

    return {data,loading,error,refetch} // return state object
}



export default useFetch;