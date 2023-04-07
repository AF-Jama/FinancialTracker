import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import './LoginForm.css';


const LoginForm = ()=>{
    const { register,handleSubmit,resetField,setError,clearErrors,unregister,formState:{errors}} = useForm({
        defaultValues:{
            email:"",
            password:""
        },
        reValidateMode:'onSubmit'
    });

    const onFormSubmit = (data)=>{
        console.log("SUBMITTED");
    }


    useEffect(()=>{

    },[])




    return (
        <form id="login-form-container" className="" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="input-group">
                <input className="input-text-form" {...register('email',{
                    required:'email is required',
                    pattern:{
                        value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message:"Should be a valid email"
                    },
                    onChange:"onEmailChange"
                })} placeholder='Email' />
                <p>{errors.email?.message}</p>
            </div>
            <div className="input-group">
                <input style={{color:"black"}} className="input-text-form" {...register('master_password',{
                    minLength:12,
                    maxLength:50,
                    required:"Master Password is required",
                    onChange:"onPasswordChange"
                })} placeholder="Password" />
                <p>{errors.master_password?.message}</p>
            </div>
            <input id="submit-btn" type="submit" value='Login'/>
        </form>
    )
}



export default LoginForm;