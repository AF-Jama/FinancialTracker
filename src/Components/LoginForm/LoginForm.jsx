import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import './LoginForm.css';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE; // returns server base URL


const LoginForm = ()=>{
    const { register,handleSubmit,resetField,setError,clearErrors,unregister,formState:{errors}} = useForm({
        defaultValues:{
            email:"",
            password:""
        },
        reValidateMode:'onSubmit'
    });
    const [submissionState,setSubmissionState] = useState(null);

    const onFormSubmit = async (data)=>{
        console.log(SERVER_BASE_URL)
        try{
            const { email,password } = data; // destructure data object

            const payload = JSON.stringify({
                email:email,
                password:password                
            })

            let res = await fetch(`${SERVER_BASE_URL}/auth/login`,{
                method:"POST",
                body:payload,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            })

            res = await res.json(); // returns json promise value

            if(res.statusCode == 201){
                // triggered on succesful login
                const { access_token,refresh_token,user } = res; // destructuring res object

                Cookies.set("access_token",access_token);
                Cookies.set("refresh_token",refresh_token);
                Cookies.set("user",JSON.stringify(user));

                return window.location.replace("/dashboard");

            }else{
                // triggered on UNsuccesful login
                setSubmissionState(true);
    
                return;
            }
        }catch(error){
            return;
        }
    }


    useEffect(()=>{
        if(submissionState){
            // triggered if submissionState evaluates to true
            setTimeout(()=>{
                setSubmissionState(false);
            },5000)
        }
    },[setSubmissionState])




    return (
        <form id="login-form-container" className="" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="input-group">
                <input className="input-text-form" {...register('email',{
                    required:'email is required',
                    pattern:{
                        value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message:"Should be a valid email"
                    }
                })} placeholder='Email' />
                <p>{errors.email?.message}</p>
            </div>
            <div className="input-group">
                <input type="password" style={{color:"black"}} className="input-text-form" {...register('password',{
                    minLength:12,
                    maxLength:50,
                    required:"Password must be valid",
                    pattern:{
                        value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
                    }

                })} placeholder="Password" />
                <p>{errors.master_password?.message}</p>
            </div>
            <input id="submit-btn" type="submit" value='Login'/>
            {submissionState?<p style={{fontWeight:"200",margin:"0 0 1rem 0"}}>Error while trying to log in</p>:""}
        </form>
    )
}



export default LoginForm;