import React, {Component} from 'react';
import './style.css';

import * as IMGS from '../common/images';

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
                        <div className="nav-item">To Learn</div>
                        <div className="nav-item">To Enhance</div>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <div className="nav-item" style={{marginRight:0}} onClick={() => {this.setState({showProfileMenu:true})}}>My Profile</div> 
                            {
                                this.state.showProfileMenu&&
                                <div className="profile-menu">
                                    <div className="menu-item" id="menu-id-1">Review</div>
                                    <div className="menu-item" id="menu-id-2">Account</div>
                                    <a className="menu-item" id="menu-id-3" href="/" onClick={this.onClickSignOut}>Sign out</a>
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

export default Header