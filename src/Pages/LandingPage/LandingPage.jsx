import React,{useState} from "react";
import financialLogo from '../../assets/financial-image.svg';
import financialLock from '../../assets/financial-lock.jpg';
// import transfer from '../../assets/transfer.jpg';
// import available from '../../assets/available.jpg';
import available from '../../assets/time.svg';
import conference from '../../assets/conference.svg';
import transfer from '../../assets/transfer.svg';
import Header from "../../Components/Header";
import ActionButton from "../../Components/Common/ActionButton";
import './LandingPage.css';


const LandingPage = ()=>{

    return (
        <div id="landing-page-container">
            <Header/>

            <main>
                <div id="inner-main-container">
                    <div id="get-started-container">
                        <div id="text-container">
                            <h3>Financial Tracking brought to <br /> <span id="you">you</span> by <span id="us">us</span>.<a className="hidden-get-started" onClick="{}">Get Started</a></h3>
                            <ActionButton text="Get Started" onClick = "{}"/>
                        </div>
                        <div id="get-started-img-container">
                            <img src={financialLogo} alt="" />
                        </div>
                    </div>

                    <div id="goals-section-container">
                        <h3>Our Promise</h3>
                        <div id="goals-card-container">
                            <div id="financial-lock" className="goal-card">
                                <img src={conference} alt="" />

                                <div id="info-description" className="info">
                                    <h4 className="info-headers">Financial Confidence</h4>

                                    <p className="info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>

                            <div className="goal-card">
                                <img src={transfer} alt="" />

                                <div id="info-description" className="info">
                                    <h4 className="info-headers">Easy Transfer between accounts</h4>

                                    <p className="info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>

                            </div>

                            <div className="goal-card">
                                <img src={available} alt="" />

                                <div id="info-description" className="info">
                                    <h4 className="info-headers">24 Hours Availibilty</h4>

                                    <p className="info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="results-section-container">
                        <div id="slide-container">
                        </div>
                    </div>
                </div>
            </main>           
        </div>
    )
}



export default LandingPage;