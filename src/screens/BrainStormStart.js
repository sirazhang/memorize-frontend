import React, {Component} from 'react';

import * as IMGS from '../common/images';

import './style.css';
import Card from '../components/Card';

class BrainStormStart extends Component{
    onClickBack = () => {
        this.props.history.push("/brainstorm-home")
    }
    render(){
        return(
            <div className="bss-container">
                <div className="btn-back" onClick={this.onClickBack}>
                    <img src={IMGS.IMG_ICON_BACKBTN} alt="Null" />
                    <span>Back</span>
                </div>
                <div className="bss-title">BRAINSTORM</div>
                <div className="bss-content">
                    <div className="bss-ctn-left">
                        <Card />
                        <div style={{height:20}} ></div>
                        <Card />
                    </div>
                    <div className="bss-ctn-center">
                        <div>
                            <div style={{fontSize:100}}>Start!</div>
                            <div style={{fontSize:150}}>10s</div>
                        </div>
                    </div>
                    <div className="bss-ctn-right">
                        <Card />
                        <div style={{height:20}} ></div>
                        <Card />
                    </div>
                </div>
            </div>
        )
    }
}

export default BrainStormStart;