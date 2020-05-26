import React, {Component} from 'react';
import Header from '../components/Header';
import * as IMGS from '../common/images';
import * as UTILS from '../utils';

import './style.css';

/** Redux Begin */
import AuthActions from '../store/actions/Auth';
import RegisterActions from '../store/actions/Register'
import SendEmailResetActions from '../store/actions/SendEmailReset';

import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
const mapStateToProps = (state) => {
    return {
        authState: state.auth,
        registerState: state.register,
        sendEmailState: state.send_email_reset,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        loginAction: (email, password) => dispatch(AuthActions.Login(email, password)),
        registerAction: (name, username, email, password) => dispatch(RegisterActions.Register(name, username, email, password)),
        registerInitAction: () => dispatch(RegisterActions.RegisterInit()),
        sendEmailResetAction: (email) => dispatch(SendEmailResetActions.SendEmailReset(email)),
        sendEmailResetInitAction: () => dispatch(SendEmailResetActions.SendEmailResetActions()),
    }
}
/** Redux End */

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            openSignupModal: false,
            openSigninModal: false,
            openForgotPassw: false,
            openResetPasswd: false,
            openTermsCondit: false,
            isAcceptTerms: false,
            username: '',
            password: '',
            email: '',
            openNotifi: false,
            notification: '',
            notificationState: 0,
            /** Form Validate */
            isValidUserName: null,
            isValidPassword: null,
            isValidEmail: null,
        }
    }
    onInitState = () => {

    }
    onHideDlg = (event) => {
        if(event.target.id.includes("home-signup-") || event.target.id.includes("home-signin-") || event.target.id.includes("home-terms")) return;
        this.setState({
            openSignupModal: false, 
            openSigninModal: false,
            openResetPasswd: false,
            openTermsCondit: false
        })
    }

    onClickSignUpFree = () => {
        this.setState({
            openSignupModal: true,
            openResetPasswd: false,
            openSigninModal: false,
            openTermsCondit: false
        })
    }
    onClickSignin = () => {
        this.props.registerInitAction();
        this.setState({
            openSignupModal: false,
            openResetPasswd: false,
            openSigninModal: true,
            openTermsCondit: false
        })
    }

    onClickConfirmSignup = () =>{
        this.props.registerAction(this.state.username, this.state.username, this.state.password, this.state.email)
    }

    onClickConfirmSignin = () => {
        this.props.loginAction(this.state.email, this.state.password)
    }

    onClickPwResetEmail = () => {
        this.setState({
            openSigninModal: false,
            openSignupModal: false,
            openResetPasswd: true,
            openTermsCondit: false
        })
    }
    onClickSendEmailReset = () => {
        this.props.sendEmailResetAction(this.state.email);
    }
    onChangeFormData(stateName, stateValue){
        this.setState({[stateName]: stateValue})
    }

    componentDidMount(){
        // If user is already logged in then redirect to word glob screen
        if(UTILS.checkJWTValidate()){
            this.props.history.push("/wordglob");
            return;
        }
        window.addEventListener("mouseup", this.onHideDlg);
    }

    componentWillUnmount(){
        window.removeEventListener('mouseup', this.onHideDlg);
    }

    render(){
        let {openSigninModal, openSignupModal, openResetPasswd, openTermsCondit} = this.state;
        let {registerState} = this.props.registerState;
        let {loginState} = this.props.authState;
        let {sendEmailResetState} = this.props.sendEmailState;

        //console.log(this.props.registerState)
        if(this.props.registerState.registerState === 1) {
            openSigninModal = false;
            openSignupModal = false;
            openResetPasswd = false;
            openTermsCondit = true;
            //this.props.registerInitAction();
        }
        //console.log(this.props.authState)
        if(loginState === 1){
            //console.log("Success Login")
            //this.props.history.push("/wordglob");
            return (<Redirect to="/wordglob" />)
        }
        return(
            <div className="home-container">
                <Header color="white" onClickSignin={this.onClickSignin}/>
                <img className="bg-dot" src={IMGS.IMG_BG_MAP} alt="Null"/>
                {/* <div className="bg-dot"></div> */}
                <div className="home-body">
                    <div className="home-signpan">
                        <div className="home-signpan-des-title">MEMORIZE  IS  FOCUSING  ON</div>
                        <div className="home-signpan-des-content">Revolutionizing English vocabulary</div>
                        <div className="home-signpan-des-content">learning for a new generation</div>
                        <div className="home-signbtns">
                            <button className="home-signfreebtn"
                                onClick={this.onClickSignUpFree}
                            >
                                Sign up for free
                            </button>
                            <button className="home-signfreebtn" onClick={() => {this.setState({openSigninModal: true})}}>
                                {/* <img src={IMGS.IMG_ICON_GOOGLE} style={{width:20, height:20, marginRight:10}} alt="Null"/> */}
                                <span>Log in</span>
                            </button>
                        </div>
                    </div>
                    <div className="home-followus">
                        <div className="home-followus-title">Follow us</div>
                        <div className="home-followus-icons">
                            <img src={IMGS.IMG_ICON_INSTAGRAM} style={{width:25, height:25, marginRight:20}} alt="Null"/>
                            <img src={IMGS.IMG_ICON_FACEBOOK} style={{width:13, height:25, marginRight:20}} alt="Null"/>
                            <span>memor_ize 2020</span>
                        </div>
                        <div className="home-followus-icons">
                            <img src={IMGS.IMG_ICON_TWITTER} style={{width:25, height:25, marginRight:20}} alt="Null"/>
                            <span>@Memorize41986293</span>
                        </div>
                    </div>
                    <div className="home-contactus">
                        <div className="home-contactus-brain">
                            <span>Memorize</span>
                            <img src={IMGS.IMG_BRAIN_WHITE} style={{width: 36, height: 41}} alt="Null"/>
                        </div>
                        <div className="home-contactus-text">Contact us</div>
                        <div className="home-contactus-email">Reach us at hello zhihuiz@usc.edu</div>
                        <div className="home-contactus-address">University of Southern California</div>
                        <div className="home-contactus-address">Address: Los Angeles, CA 90007</div>
                    </div>
                </div>
                {
                    openSignupModal && 
                    <div className="home-signup" id="home-signup">
                        <div className="home-signup-modal" id="home-signup-1">
                            <div className="home-signup-modal-title" id="home-signup-2">
                                SIGN UP {/*<span style={{color:"red", fontSize: 10}}><strong>Error - User Name cannot be empty</strong></span>*/}
                            </div>
                            <div className="form-group-input" id="home-signup-3">
                                <div className={registerState !== -2?"input-template":"input-template-error"} id="home-signup-4">
                                    <div className="title" id="home-signup-5">User Name</div>
                                    <input id="home-signup-6" type="text" placeholder="Enter user name" value={this.state.username} autoComplete="off" onChange={(e) => {this.setState({username: e.target.value})}}/>
                                </div>
                                <div className={registerState !== -3?"input-template":"input-template-error"} id="home-signup-7">
                                    <div className="title" id="home-signup-8">Password</div>
                                    <input type="password" placeholder="Enter password"  id="home-signup-9" value={this.state.password}  autoComplete="off" onChange={(e) => {this.setState({password: e.target.value})}}/>
                                </div>
                                <div className={registerState !== -1?"input-template":"input-template-error"} id="home-signup-10">
                                    <div className="title" id="home-signup-11">E-mail</div>
                                    <input type="text" placeholder="Enter your email"  id="home-signup-12" value={this.state.email}  autoComplete="off" onChange={(e) => {this.setState({email: e.target.value})}}/>
                                </div>
                                {/* <div className="terms" id="home-signup-13">
                                    <div className={this.state.isAcceptTerms?"checkbox":"uncheckbox"} id="home-signup-14">
                                        <div className="checkmark" onClick={() => this.setState({isAcceptTerms: !this.state.isAcceptTerms})} id="home-signup-15">
                                            <img src={IMGS.IMG_CHECKMARK} style={{width:12, height:9}} alt="Null"  id="home-signup-16"/>
                                        </div>
                                    </div>
                                    <div className="contents" id="home-signup-17">I accept the terms and conditions of the information</div>
                                </div> */}
                                <div id="home-signup-21" style={{fontSize: 12, color: "#ed6d24", fontFamily: "Helvetica", paddingTop:10}}>
                                    {registerState === -1 && "Sorry! Please check the E-mail again"}
                                    {registerState === -2 && "Sorry! Please check the User Name again"}
                                    {/* {registerState === -3 && "Sorry! Please check the Password again"} */}
                                </div>
                                <button className="button-submit" id="home-signup-18" onClick={this.onClickConfirmSignup}>
                                {
                                    this.props.registerState.registerState === 0 &&
                                    <img id="home-signup-19" src={IMGS.IMG_LOADING} style={{width:32, height:32, marginTop:5}} alt="Null"/>
                                }
                                {
                                    this.props.registerState.registerState !== 0 &&
                                    <span id="home-signup-20">Confirm</span>
                                }
                                </button>
                            </div>
                        </div>
                    </div>
                }
                {
                    openSigninModal && 
                    <div className="home-signin" id="home-signin">
                        <div className="home-signin-modal" id="home-signin-1">
                            <div className="home-signin-modal-title" id="home-signin-2">
                                SIGN IN
                            </div>
                            <div style={{height:20}}></div>
                            <div className="form-group-input" id="home-signin-3">
                                <div className={loginState!==-1?"input-template":"input-template-error"} id="home-signin-4">
                                    <div className="title" id="home-signin-5">E-mail</div>
                                    <input id="home-signin-6" type="text" placeholder="Enter e-mail address" value={this.state.email} autoComplete="off" onChange={(e) => {this.setState({email: e.target.value})}}/>
                                </div>
                                <div className="forgot-password" id="home-signin-19" onClick={this.onClickPwResetEmail}><span id="home-signin-20">Forgot your password?</span></div>
                                <div className={loginState!==-1?"input-template":"input-template-error"} id="home-signin-7">
                                    <div className="title" id="home-signin-8">Password</div>
                                    <input type="password" placeholder="Enter password"  id="home-signin-9" value={this.state.password}  autoComplete="off" onChange={(e) => {this.setState({password: e.target.value})}}/>
                                </div>
                                <div id="home-signup-21" style={{fontSize: 12, color: "#ed6d24", fontFamily: "Helvetica", paddingTop:10}}>
                                    {loginState === -1 && "Sorry!  Please check the E-mail and Password again"}
                                </div>
                                <button className="button-submit" id="home-signin-18" onClick={this.onClickConfirmSignin}>
                                    Confirm
                                </button>
                                <button className="button-free-signup" id="home-signin-21" onClick={this.onClickSignUpFree}>
                                    Sign up for free
                                </button>
                            </div>
                        </div>
                    </div>
                }
                {
                    openResetPasswd &&
                    <div className="home-signin" id="home-signin">
                        <div className="home-signin-modal" id="home-signin-1">
                            <div className="home-signin-modal-title" id="home-signin-2">
                                Reset Password
                            </div>
                            <div style={{height:20}}></div>
                            <div className="form-group-input" id="home-signin-3">
                                <div className={sendEmailResetState !== -1 ? "input-template" : "input-template-error"} id="home-signin-4">
                                    <div className="title" id="home-signin-5">E-mail</div>
                                    <input id="home-signin-6" type="text" placeholder="Enter user name" value={this.state.email} autoComplete="off" onChange={(e) => {this.setState({email: e.target.value})}}/>
                                </div>
                                <div className="msg-error" id="home-signin-22">
                                {
                                    sendEmailResetState === -1 && 
                                    "Sorry! Please check the E-mail again"
                                }
                                </div>
                                {
                                    sendEmailResetState === 1 &&
                                    <div style={{fontSize: 20, fontFamily:"Helvetica", fontWeight: "bold", textAlign:"center"}} id="home-signin-17">You will receive an email from Memorize <br/>
                                    shortly with instructions to reset your password.</div>
                                }
                                {
                                    sendEmailResetState !== 1 &&
                                    <button className="button-resetpw" id="home-signin-18" onClick={this.onClickSendEmailReset}>
                                        Send password reset email
                                    </button>
                                }
                                <div style={{height:30}}></div>
                                <button className="button-free-signup" id="home-signin-21" onClick={this.onClickSignin}>
                                    Back to Sign in
                                </button>
                            </div>
                        </div>                        
                    </div>
                }
                {
                    openTermsCondit &&
                    <div className="home-terms-modal" id="home-terms-00">
                        <div className="terms-content" id="home-terms-01">
                            Memorize does not sell your data to others or use it for advertising. We will never read or access your private notes without written or verbal consent - unless compelled by law enforcement.
                            Please read these Terms and Conditions (“Terms” or “Terms and Conditions”) carefully before using the Memorize website. For purposes of these Terms, “you” and “your” means you as the user of the Service.<br/>
                            Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who wish to access or use the Service.<br/>
                            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, then you do not have permission to access the Service. If you are accessing or using the Service on behalf of a business or entity, then your business or entity is legally and financially responsible for your access to and use of the Service as well as for the use of your account by others affiliated with your entity, including any employees, agents or contractors.
                        </div>
                        <div className="terms-checker" id="home-terms-13">
                            <div className={"checkbox"} id="home-terms-14">
                                <div className="checkmark" id="home-terms-15">
                                    <img src={IMGS.IMG_CHECKMARK} style={{width:12, height:9}} alt="Null"  id="home-terms-16"/>
                                </div>
                            </div>
                            <div className="contents" id="home-terms-17">I accept the terms and conditions of the information</div>
                        </div>
                        <div className="button-signin" id="home-terms-18" onClick={this.onClickSignin}>
                            Sign in
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
