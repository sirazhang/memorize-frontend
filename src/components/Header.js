import React, {Component} from 'react';
import './style.css';

import * as IMGS from '../common/images';
/** Redux Begin */
import GuideActions from '../store/actions/Guide';

import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        guideShow: state.guide
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        guideShow: () => dispatch(GuideActions.GuideScreenShow()),
        guideHide: () => dispatch(GuideActions.GuideScreenHide())
    }
}
/** Redux End */

class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            showProfileMenu: false,
            
        }
    }

    componentDidMount(){
        window.addEventListener("mouseup", this.onHideMenus);
    }
    componentWillUnmount(){
        window.removeEventListener('mouseup', this.onHideMenus);
    }

    onHideMenus = (event) => {
        if(event.target.id.includes("menu-id")) return;
        this.setState({showProfileMenu: false})
    }

    onClickSignOut = () => {
        localStorage.removeItem("user-memorize-token");
        this.setState({showProfileMenu:false});
    }
    onClickToEnhance = () => {
        this.props.history.push("/brainstorm-home")
    }
    onClickToLearn = () => {
        this.props.history.push("/wordglob")
    }
    onClickToReview = () => {
        this.props.history.push("/review")
    }
    onClickToProfile = () => {
        this.props.history.push("/profile")
    }
    onClickHelp = () => {
        this.props.guideShow()
    }
    render(){
        let {color, auth} = this.props;
        return(
            <div className="header-container">
                <div className="brain-img">
                    <span style={{color:color}}>Memorize</span>
                    <img src={color==="white"?IMGS.IMG_BRAIN_WHITE:IMGS.IMG_BRAIN} style={{width: 54, height: 60}} alt="Null"/>
                </div>
                {/* <div className="dropdown-a">
                    <a href="/wordglob">Library</a>
                    <img src={IMGS.IMG_DROPDOWN} style = {{width: 15, height: 8}} alt="Null"/>
                </div>*/}
                {
                    auth &&
                    <div className={color==="white"?"menus-white":"menus-blue"}>
                        <div className="nav-item" onClick={this.onClickToLearn}>To Learn</div>
                        <div className="nav-item" onClick={this.onClickToEnhance}>To Enhance</div>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <div className="nav-item" style={{marginRight:0}} onClick={() => {this.setState({showProfileMenu:true})}}>My Profile</div> 
                            {
                                this.state.showProfileMenu&&
                                <div className="profile-menu">
                                    <div className="menu-item" id="menu-id-1" onClick={this.onClickToReview}>Review</div>
                                    <div className="menu-item" id="menu-id-2" onClick={this.onClickToProfile}>Account</div>
                                    <div className="menu-item" id="menu-id-3" onClick={this.onClickHelp}>Help</div>
                                    <a className="menu-item" id="menu-id-4" href="/" onClick={this.onClickSignOut}>Sign out</a>
                                </div>
                            }
                        </div>
                        <img src={IMGS.IMG_ICON_PROFILE} style={{width: 50, height: 50, marginTop:35, marginRight:90, marginLeft:5}} alt="Null"/>
                    </div>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);