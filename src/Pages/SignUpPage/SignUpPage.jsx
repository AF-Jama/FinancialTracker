import React,{useState,useEffect} from "react";
import SignUpForm from "../../Components/SignUpForm";
import next from '../../assets/next.png';
import './SignUpPage.css';


const SignUpPage = ()=>{




    return (
        <div id="sign-up-page-container">
            <div id="sign-up-inner-container">
                <div className="column" id="slogan-column">
                    <img src="https://cdn-icons-png.flaticon.com/512/1907/1907675.png" alt="" height="80px" width="80px" />

                    <div className="flex-grow-slogan-container" >
                        <h1>Financial Tracker</h1>

                        <div id="slogan-container">
                            Take Control of Your Finances: Bank on Our App
                        </div>
                    </div>
                </div>
                <div className="column" id="sign-up-form-container">
                    {/* <h2>Welcome</h2> */}
                    <img src={next} alt="" style={{height:"80px",width:"80px",margin:"0.9rem auto"}} />
                    <p style={{fontSize:"18px",fontFamily:"sans-serif"}}>Create Account on Financial Tracker to start your money management</p>
                    <SignUpForm/>

                    <a href="/login"><p style={{fontWeight:"500"}}>Already have an account? Login Here</p></a>

                    <div id="oauth-providers-btns">
                        <div href="#" id="google-provider" className="auth-provider">Google</div>
                        <div href="#" id="apple-provider" className="auth-provider">Apple</div>
                        <div href="#" id="linkedin-provider" className="auth-provider">Linkedin</div>
                        <div href="#" id="microsoft-provider" className="auth-provider">Microsoft</div>
                    </div>

                </div>
            </div>
        </div>
    )
}



export default SignUpPage;