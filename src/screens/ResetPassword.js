import React, {Component} from 'react';
import Header from '../components/Header';
import * as IMGS from '../common/images';

import './style.css';

/** Redux Begin */
import ResetActions from '../store/actions/ResetPassword';
import {connect} from 'react-redux';
const mapStateToProps = (state) => {
    return {
        resetState: state.reset
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        resetAction: (email, password) => dispatch(ResetActions.Reset(email, password)),
        resetInitAction: () => dispatch(ResetActions.ResetInit()),
    }
}
/** Redux End */

class ResetPassword extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    onInitState = () => {

    }

    onClickConfirmReset = () => {
        this.props.resetAction(this.state.email, this.state.password);
    }

    render(){
        let{resetState} = this.props.resetState;
        if(resetState === 1){
            this.props.history.push("/");
        }
        if(resetState === -1){
            this.props.resetInitAction();
        }
        return(
            <div className="home-container">
                <Header />
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
                    <div className="home-signin" id="home-signin">
                        <div className="home-signin-modal" id="home-signin-1">
                            <div className="home-signin-modal-title" id="home-signin-2">
                                Reset Password
                            </div>
                            <div style={{height:20}} ></div>
                            <div className="form-group-input" id="home-signin-3">
                                <div className={resetState !== -1? "input-template":"input-template-error"} id="home-signin-4">
                                    <div className="title" id="home-signin-5">E-mail</div>
                                    <input id="home-signin-6" type="text" placeholder="Enter your email address" value={this.state.email} autoComplete="off" onChange={(e) => {this.setState({email: e.target.value})}}/>
                                </div>
                                <div style={{height:40}} ></div>
                                <div className={resetState !== -1? "input-template":"input-template-error"} id="home-signin-4">
                                    <div className="title" id="home-signin-5">Password</div>
                                    <input id="home-signin-7" type="password" placeholder="Enter password" value={this.state.password} autoComplete="off" onChange={(e) => {this.setState({password: e.target.value})}}/>
                                </div>
                                <div className="msg-error" id="home-signin-22">{resetState === -1 && "Sorry!  Please check the E-mail and Password again"}</div>
                                <button className="button-resetpw-cofirm" id="home-signin-18" onClick={this.onClickConfirmReset}>
                                {
                                    resetState === 0 &&
                                    <img id="home-signup-19" src={IMGS.IMG_LOADING} style={{width:32, height:32, marginTop:5}} alt="Null"/>
                                }
                                {
                                    resetState !== 0 &&
                                    <span id="home-signup-20">Confirm</span>
                                }
                                </button>
                                <div style={{height:30}}></div>
                            </div>
                        </div>                        
                    </div>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
