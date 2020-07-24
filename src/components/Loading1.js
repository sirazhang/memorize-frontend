import React, {Component} from 'react';
import Header from '../components/Header';
import * as IMGS from '../common/images';

import './style.css';

class Loading1 extends Component{
    constructor(props){
        super(props)
        this.state = {
            percent: 0,
        }
    }
    componentDidMount = () => {
        this.timeInterval = setInterval(() => {
            this.setState({percent: this.state.percent+1})
            if(this.state.percent >= 100){
                clearInterval(this.timeInterval);
            }
        }, 10)
    }

    componentWillUnmount = () => {
        clearInterval(this.timeInterval);
    }
    render(){

        return(
            <div className="home-container" style={{position: "absolute", top: 0, zIndex: 1005}}>
                <Header color="white" onClickSignin={this.onClickSignin}/>
                <div className="home-body">
                    <div className="home-followus">
                        <div className="home-followus-title">Follow us</div>
                        <div className="home-followus-icons">
                            <img src={IMGS.IMG_ICON_INSTAGRAM} style={{width:13, height:13, marginRight:5}} alt="Null"/>
                            <img src={IMGS.IMG_ICON_FACEBOOK} style={{width:7, height:13, marginRight:5}} alt="Null"/>
                            <span>memor_ize 2020</span>
                        </div>
                        <div className="home-followus-icons">
                            <img src={IMGS.IMG_ICON_TWITTER} style={{width:13, height:13, marginRight:5}} alt="Null"/>
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
                <div className="loading-circle">
                    <svg className="svg-circle-counter" viewBox="0 0 300 300" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
                            {/* <circle className="circle-chart__background" stroke="#efefef" strokeWidth="10" fill="none" cx="90" cy="90" r="85" /> */}
                        <circle className="circle-chart__circle" stroke="#ffffff" strokeWidth="10" strokeDasharray={""+2*Math.PI*145*(this.state.percent)/100+","+2*Math.PI*145} strokeLinecap="none" fill="none" cx="145" cy="145" r="140" />
                        <circle stroke="#f8f9ffa0" strokeWidth="1" cx="145" cy="145" r="145" fill="none"/>
                        <circle stroke="#f8f9ffa0" strokeWidth="1" cx="145" cy="145" r="135" fill="none"/>
                        <circle className="circle-chart__circle" stroke="#ffffff" strokeWidth="4" strokeLinecap="none" fill="none" cx="145" cy="145" r="120" />
                        <circle className="circle-chart__circle" stroke="#ffffff" strokeWidth="5" strokeLinecap="none" fill="none" cx="145" cy="145" r="95" />
                    </svg>
                    <div className="loading-text">
                        Loading <br />
                        {this.state.percent}%
                    </div>
                </div>
            </div>
        )
    }
}

export default Loading1;
