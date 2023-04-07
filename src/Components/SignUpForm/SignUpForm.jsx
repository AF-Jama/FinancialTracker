import React,{useEffect, useReducer, useRef, useState} from "react";
import { useForm } from 'react-hook-form';
import './SignUpForm.css';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE; // returns server base endpoint


const SignUpForm = ()=>{
    const { register,handleSubmit,resetField,setError,clearErrors,unregister,formState:{errors}} = useForm({
        defaultValues:{
            username:"",
            email:"",
            password:""
        },
        reValidateMode:'onSubmit'
    });

    const usernameReducer = (state,action)=>{
        switch(action.type){
            case "UPDATE":
                return {...action.payload}; // returns state, payload spread operator
                
            case "CLEAR":
                return {value:"",validity:false};
        }
    }

    const emailReducer = (state,action)=>{
        switch(action.type){
            case "UPDATE":
                return {...action.payload}; // returns state, payload spread operator
                
            case "CLEAR":
                return {value:"",validity:false};
        }

    }

    const passwordReducer = (state,action)=>{
        switch(action.type){
            case "UPDATE":
                return {...action.payload};
        }
    }
    

    const [username,dispatch] = useReducer(usernameReducer,{value:'',validity:false}); // set username state
    const [email,emailDispatch] = useReducer(emailReducer,{value:"",validity:false}); // set email state 
    const [password,passwordDispatch] = useReducer(passwordReducer,{value:"",validity:false}); // set password state
    const [submitState,setSubmitState] = useState(null);

    const userNameContainerRef = useRef();
    const emailContainerRef = useRef();
    console.log(username);

    const onFormSubmit = async (data)=>{
        console.log(data)
        console.log(username.validity);
        console.log(email.validity)
        if(username.validity && email.validity){
            console.log("SYCCESJ")
            // triggered if submitted username and email are valid
            const { username,email,password } = data;
            
            const payload = JSON.stringify({
                username:username,
                email:email,
                password:password                
            })

            let res = await fetch(`${SERVER_BASE_URL}/auth/signup`,{
                method:"POST",
                body:payload,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            })

            res = await res.json();

            if(res.statusCode===201){
                // triggered on succesfull post
                setSubmitState(true);
                return;
            }else{
                setSubmitState(false);
                return;
            }
        }
    }

    const onUsernameChange = (event)=>{
        // triggered on username, username must be checked for validity through regex and then check if username is usable

        event.preventDefault();

        console.log(event.target.value);

        const usernameRegexExpression = "^[a-zA-Z0-9_-]{3,20}$"; // username regex expression

        const regexResult = RegExp(usernameRegexExpression).test(event.target.value);

        if(!regexResult){
            dispatch({type:"UPDATE",payload:{value:event.target.value,validity:false}});
            return;
        }
        
        fetch(`${SERVER_BASE_URL}/users/username/validity?username=${event.target.value}`)
        .then(res=>res.json())
        .then(res=>{
            if(!res){
                dispatch({type:"UPDATE",payload:{value:event.target.value,validity:false}});
                return;    
            }
            dispatch({type:"UPDATE",payload:{value:event.target.value,validity:true}});
        })
        .catch(error=>{
            dispatch({type:"UPDATE",payload:{value:event.target.value,validity:false}});
        });
        
    }

    const onEmailChange = (event)=>{
        // triggered on username, username must be checked for validity through regex and then check if username is usable

        event.preventDefault();

        // const EmailRegexExpression = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"; // email regex expression

        // const regexResult = RegExp(EmailRegexExpression).test(event.target.value);
        // console.log(regexResult);

        // if(!regexResult){
        //     emailDispatch({type:"UPDATE",payload:{value:event.target.value,validity:false}});
        //     return;
        // }
        // console.log("here")
        
        fetch(`${SERVER_BASE_URL}/users/email/validity?email=${event.target.value}`)
        .then(res=>res.json())
        .then(res=>{
            if(!res){
                emailDispatch({type:"UPDATE",payload:{value:event.target.value,validity:false}});
                return;    
            }
            console.log("dsds")
            emailDispatch({type:"UPDATE",payload:{value:event.target.value,validity:true}});
            return;
        })
        .catch(error=>{
            emailDispatch({type:"UPDATE",payload:{value:event.target.value,validity:false}});
        });
        
    }

    const onPasswordChange = (event)=>{
        event.preventDefault();

        const passwordRegexExpression = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";

        const regexResult = RegExp(passwordRegexExpression).test(event.target.value);

        if(!regexResult){
            passwordDispatch({type:"UPDATE",payload:{value:event.target.value,validity:false}});
            return;
        }
        passwordDispatch({type:"UPDATE",payload:{value:event.target.value,validity:true}});
        return;
    }

    console.log(errors);

    useEffect(()=>{
        if(submitState){
            setTimeout(() => {
                setSubmitState(null);
            }, 3000);
        }

        if(!submitState){
            setTimeout(()=>{
                setSubmitState(null);
            },3000)
        }
    },[username,email,submitState]); 



    return (
        <form id="sign-form-container" className= "" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="input-group">
                <input type="text" className="input-text-form" style={(username.value && username.validity===false)?{border:"2px solid red"}:{border:"2px solid transparent"}} {...register('username',{
                    minLength:3,
                    maxLength:20,
                    required:"Valid username required",
                    onChange:onUsernameChange,
                    // required:'Username is required',    
                })} placeholder='username' />
                <p style={{color:"red"}}>{(username.value && username.validity===false)?"Username not valid or already taken":""}</p>
            </div>

            <div className="input-group">
                <input type="text" className="input-text-form" style={(errors.email?.message)?{border:"2px solid red"}:{border:"2px solid transparent"}} {...register('email',{
                    required:"Email is required",
                    pattern:{
                        value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message:"Please enter a valid password"
                    },
                    onChange:onEmailChange,     
                })} placeholder='Email'/>
                <p style={{color:"red"}}>{(email.value && email.validity===false)?"":""}</p>
            </div>

            <div className="input-group">
                <input type="password" className="input-text-form" {...register('password',{
                    maxLength:50, 
                    required:"Valid Password required",
                    pattern:{
                        value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
                    },
                    onChange:onPasswordChange,
                })} placeholder='password'/> 
                <p style={{color:"red"}}>{errors.password?.message?"Invalid Password":""}</p>
            </div>

            <input id="submit-btn" type="submit" value="Submit" />
            {(submitState===true) && 'Succesful Created Account'}
            {(submitState===false) && 'Unable to create account'}
        </form>
    )
}



export default SignUpForm;