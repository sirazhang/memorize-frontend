import React, {Component} from 'react';
import Header from '../components/Header';
import * as IMGS from '../common/images';

import './style.css';

/** Redux Begin */
import AuthActions from '../store/actions/Auth';
import RegisterActions from '../store/actions/Register'
import {connect} from 'react-redux';
const mapStateToProps = (state) => {
    return {
        authState: state.auth,
        registerState: state.register
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        loginAction: (username, password) => dispatch(AuthActions.Login(username, password)),
        registerAction: (name, username, email, password) => dispatch(RegisterActions.Register(name, username, email, password, ["USER"]))
    }
}
/** Redux End */

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            openSignupModal: false,
            openSigninModal: false,
            isAcceptTerms: false,
            username: '',
            password: '',
            email: '',
            openNotifi: false,
            notification: '',
            notificationState: 0,
            /** Form Validate */
            isValidUserName: false,
            isValidPassword: false,
            isValidEmail: false,
        }
    }

    onHideDlg = (event) => {
        if(event.target.id.includes("home-signup-") || event.target.id.includes("home-signin-")) return;
        this.setState({openSignupModal: false, openSigninModal: false})
    }

    onClickSignin = () => {
        this.setState({openSigninModal: true})
    }

    onClickConfirmSignup = () =>{
        this.props.registerAction(this.state.username, this.state.username, this.state.password, this.state.email)
    }

    onClickConfirmSignin = () => {
    }

    componentDidMount(){
        window.addEventListener("mouseup", this.onHideDlg);
    }

    componentWillUnmount(){
        window.removeEventListener('mouseup', this.onHideDlg);
    }

    render(){
        return(
            <div className="home-container">
                <Header onClickSignin={this.onClickSignin}/>
                <img className="bg-dot" src={IMGS.IMG_BG_DOT} alt="Null"/>
                <div className="home-body">
                    <div className="home-signpan">
                        <div className="home-signpan-des-title">MEMORIZE  IS  FOCUSING  ON</div>
                        <div className="home-signpan-des-content">Revolutionizing English vocabulary</div>
                        <div className="home-signpan-des-content">learning for a new generation</div>
                        <div className="home-signbtns">
                            <button className="home-signfreebtn"
                                onClick={() => {this.setState({openSignupModal:true})}}
                            >
                                Sign up for free
                            </button>
                            <button className="home-signfreebtn">
                                <img src={IMGS.IMG_ICON_GOOGLE} style={{width:20, height:20, marginRight:10}} alt="Null"/>
                                <span>Sign up with google</span>
                            </button>
                        </div>
                    </div>
                    <div className="home-followus">
                        <span>Follow us</span>
                        <div className="home-followus-icons">
                            <img src={IMGS.IMG_ICON_INSTAGRAM} style={{width:25, height:25, marginRight:20}} alt="Null"/>
                            <img src={IMGS.IMG_ICON_FACEBOOK} style={{width:13, height:25, marginRight:20}} alt="Null"/>
                            <img src={IMGS.IMG_ICON_TWITTER} style={{width:25, height:17, marginRight:20}} alt="Null"/>
                        </div>
                    </div>
                    <div className="home-contactus">
                        <div className="home-contactus-brain">
                            <span>Memorize</span>
                            <img src={IMGS.IMG_BRAIN_WHITE} style={{width: 36, height: 41}} alt="Null"/>
                        </div>
                        <div className="home-contactus-text">Contact us</div>
                        <div className="home-contactus-email">zhihuiz@usc.edu</div>
                        <div className="home-contactus-address">University of Southern California</div>
                        <div className="home-contactus-address">Address: Los Angeles, CA 90007</div>
                    </div>
                </div>
                {
                    this.state.openSignupModal && 
                    <div className="home-signup" id="home-signup">
                        <div className="home-signup-modal" id="home-signup-1">
                            <div className="home-signup-modal-title" id="home-signup-2">
                                SIGN UP <span style={{color:"red", fontSize: 10}}><strong>Error - User Name cannot be empty</strong></span>
                            </div>
                            <div className="form-group-input" id="home-signup-3">
                                <div className="input-template" id="home-signup-4">
                                    <div className="title" id="home-signup-5">User Name</div>
                                    <input id="home-signup-6" type="text" placeholder="Enter user name" value={this.state.username} onChange={(e) => {this.setState({username: e.target.value})}}/>
                                </div>
                                <div className="input-template" id="home-signup-7">
                                    <div className="title" id="home-signup-8">Password</div>
                                    <input type="password" placeholder="Enter password"  id="home-signup-9" value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}}/>
                                </div>
                                <div className="input-template" id="home-signup-10">
                                    <div className="title" id="home-signup-11">E-mail</div>
                                    <input type="text" placeholder="Enter your email"  id="home-signup-12" value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}}/>
                                </div>
                                <div className="terms" id="home-signup-13">
                                    <div className={this.state.isAcceptTerms?"checkbox":"uncheckbox"} id="home-signup-14">
                                        <div className="checkmark" onClick={() => this.setState({isAcceptTerms: !this.state.isAcceptTerms})} id="home-signup-15">
                                            <img src={IMGS.IMG_CHECKMARK} style={{width:12, height:9}} alt="Null"  id="home-signup-16"/>
                                        </div>
                                    </div>
                                    <div className="contents" id="home-signup-17">I accept the terms and conditions of the information</div>
                                </div>
                                <button className="button-submit" id="home-signup-18" >
                                    {
                                        this.props.registerState.registerState == 0 &&
                                        <img src={IMGS.IMG_LOADING} style={{width:32, height:32}} />
                                    }
                                    {
                                        this.props.registerState.registerState == -2 &&
                                        <span>Confirm</span>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                }
                {
                    this.state.openSigninModal && 
                    <div className="home-signin" id="home-signin">
                        <div className="home-signin-modal" id="home-signin-1">
                            <div className="home-signin-modal-title" id="home-signin-2">
                                SIGN IN
                            </div>
                            <div className="form-group-input" id="home-signin-3">
                                <div className="input-template" id="home-signin-4">
                                    <div className="title" id="home-signin-5">User Name</div>
                                    <input id="home-signin-6" type="text" placeholder="Enter user name" value={this.state.username} onChange={(e) => {this.setState({username: e.target.value})}}/>
                                </div>
                                <div className="input-template" id="home-signin-7">
                                    <div className="title" id="home-signin-8">Password</div>
                                    <input type="password" placeholder="Enter password"  id="home-signin-9" value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}}/>
                                </div>
                                <button className="button-submit" id="home-signin-18" onClick={this.onClickConfirmSignin}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);