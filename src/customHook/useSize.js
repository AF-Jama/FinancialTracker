import React,{useState,useEffect} from "react";


const useSize = ()=>{
    const [size,getSize] = useState(window.innerWidth); // sets size state which references window inner width

    const resizeHandler = (event)=>{
        event.preventDefault();

        getSize(event.target.value)
    }

    useEffect(()=>{
        window.addEventListener('resize',resizeHandler)

        return ()=> window.addEventListener('resize',resizeHandler);
    },[window.innerWidth]) // side effect runs on initial render (on mount) and on dependecy array change


    return {size}; // return state
}



export default useSize;