import React, {Component} from 'react';
import './style.css';

import * as IMGS from '../common/images';

class Header extends Component{

    render(){
        return(
            <div className="header-container">
                <div className="brain-img">
                    <span>Memorize</span>
                    <img src={IMGS.IMG_BRAIN_WHITE} style={{width: 54, height: 60}} alt="Null"/>
                </div>
                {/* <div className="dropdown-a">
                    <a href="/wordglob">Library</a>
                    <img src={IMGS.IMG_DROPDOWN} style = {{width: 15, height: 8}} alt="Null"/>
                </div>
                <a href="/wordglob">Membership</a>
                <a href="/wordglob">Community</a>
                <a onClick={this.props.onClickSignin}>Sign in</a> */}
            </div>
        )
    }
}

export default Header