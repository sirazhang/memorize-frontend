import React, {Component} from 'react';
//import Header from '../components/Header';
import * as IMGS from '../common/images';

import './style.css';
import Header from '../components/Header';

class BrainStormHome extends Component{
    onClickBrainStorm = () => {
        this.props.history.push("/brainstorm-start")
    }
    render(){
        return(
            <div className="bsh-container">
                <Header auth={true} color="white" history={this.props.history}/>
                <div className="bsh-portfolio">
                    <div className="bsh-avatar">
                        <img src={IMGS.IMG_SAMPLE_AVATAR} alt="Null" />
                    </div>
                    <div className="bsh-pf-content">
                        <div>
                            <span style={{fontFamily:"Helvetica", fontSize:23, fontWeight:"bold", color:"#206ea7"}}>Welcome, </span> 
                            <span style={{fontFamily:"Helvetica", fontSize:23, color:"#206ea7"}}> incredible!</span>
                        </div>
                        <div style={{marginTop:20}}>
                            <span style={{fontFamily:"Helvetica", fontSize:16, fontWeight:"bold", color:"#222222"}}>Your achievement</span>
                        </div>
                        <div style={{marginTop:20}}>
                            <div style={{fontFamily:"Helvetica", fontSize:12, color:"#575e62"}}>BrainStorm Credit</div>
                            <div style={{height:5}}></div>
                            <div style={{backgroundColor:"#eaeaea", height:12}}>
                                <div style={{backgroundColor:"#77f5d8", height:12, width:"50%"}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bsh-wdgames">
                    <div className="title">Word Games</div>
                    <div className="btn-brainstorm" onClick={this.onClickBrainStorm}>Brainstorm</div>
                </div>
            </div>
        )
    }
}

export default BrainStormHome;