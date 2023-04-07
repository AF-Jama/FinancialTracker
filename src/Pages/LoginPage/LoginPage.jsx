import React from "react";
import LoginForm from "../../Components/LoginForm";
import './LoginPage.css';


const LoginPage = ()=>{






    return (
        <div id="login-page-container">
            <div id="login-page-inner-container">
                <div className="login-column">
                    <img src="https://cdn-icons-png.flaticon.com/512/1907/1907675.png" alt="" height="80px" width="80px" />
                    <LoginForm/>
                    <a href="/create">Don't have account? Create here</a>
                </div>

                <div className="login-column">
                    
                </div>
            </div>
        </div>
    )
}



export default LoginPage;