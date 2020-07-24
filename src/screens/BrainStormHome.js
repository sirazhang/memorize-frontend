import React, {Component} from 'react';
//import Header from '../components/Header';
import * as IMGS from '../common/images';
import Carousel from "nuka-carousel";

import './style.css';
import Header from '../components/Header';
/** Redux Begin */
import BrainStormActions from '../store/actions/BrainStorm';
import AuthActions from '../store/actions/Auth';
import GuideActions from '../store/actions/Guide';

import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        brainStormState: state.brainstorm,
        guideState: state.guide,
        authState: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        logout: () => dispatch(AuthActions.Logout()),
        brainStormGetSynWords: (i_Nth) => dispatch(BrainStormActions.GetSynonymWords(i_Nth)),
        updateBCredit: (bcredit) => dispatch(BrainStormActions.UpdateBCredit(bcredit)),
        getBCredit: () => dispatch(BrainStormActions.GetBCredit()),
        guideShow: () => dispatch(GuideActions.GuideScreenShow()),
        guideHide: () => dispatch(GuideActions.GuideScreenHide()),
        getUserContent: () => dispatch(AuthActions.GetUserContent()),
    }
}
/** Redux End */
class BrainStormHome extends Component{
    constructor(props){
        super(props);
        this.state = {
            slideIndex: 0,
            underlineHeader: false,
            length: 6,
            currentSlide: 0,
            guideImgs: [
                IMGS.IMG_GUIDE_BRAINSTORM_1, 
                IMGS.IMG_GUIDE_BRAINSTORM_2, 
                IMGS.IMG_GUIDE_BRAINSTORM_3, 
                IMGS.IMG_GUIDE_BRAINSTORM_4
            ],
            guideDesc: [
                "You will have 10 seconds to memorize\n Four words’ Position and Meaning", 
                "Words will be covered \n Complete Instruction",
                "One correct word is given",
                "Correctly complete the mission \n to get credit reward"
            ]
        }
    }
    
    componentDidMount = async () => {
        this.props.guideShow();
        await this.props.getUserContent()
        await this.props.getBCredit()
    }

    onClickBrainStorm = () => {
        this.props.history.push("/brainstorm-start")
    }
    
    render(){

        let {bcredit} = this.props.brainStormState
        let {guideShow} = this.props.guideState
        if(bcredit === null) bcredit = 0
        if(bcredit > 100) bcredit = 100
        if(bcredit < 0) bcredit = 0

        return(
            <div className="bsh-container">
                <Header auth={true} color="white" history={this.props.history}/>
                {guideShow && 
                    <div className="guide-container">
                    <Carousel
                        withoutControls={false}
                        transitionMode={"scroll3d"}
                        horizontal
                        cellAlign={"center"}
                        
                        slidesToShow={1}
                        slidesToScroll={"auto"}
                        wrapAround={false}
                        slideIndex={0}
                        heightMode={"max"}
                        animation={"zoom"}
                        zoomScale={0.85}
                        swiping
                        renderBottomCenterControls={({currentSlide}) => {
                            return (
                                <div
                                    style={{
                                        fontSize:22,
                                        fontWeight:"bold",
                                        fontFamily: "Helvetica",
                                        color: "#fff",
                                        textAlign:"center",
                                        paddingBottom:50
                                    }}
                                >
                                    {this.state.guideDesc[currentSlide]}
                                </div>
                            )}
                        }
                    >
                        {this.state.guideImgs.map((gImg, index) => (
                            <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100vh"}} key={"guide-brainstorm-"+index}>
                                <img src={gImg} style={{width:"80%", height:"auto"}} alt="None"/>
                            </div>
                        ))}
                    </Carousel>
                    <div className="skip-button" onClick={() => {this.props.guideHide()}}> Skip </div>
                </div>
                }
                <div className="bsh-portfolio">
                    <div className="bsh-avatar">
                        <img src={IMGS.IMG_SAMPLE_AVATAR} alt="Null" />
                    </div>
                    <div className="bsh-pf-content">
                        <div>
                            <span style={{fontFamily:"Helvetica", fontSize:23, fontWeight:"bold", color:"#206ea7"}}>Welcome, </span> 
                            <span style={{fontFamily:"Helvetica", fontSize:23, color:"#206ea7"}}> {this.props.authState.id} </span>
                        </div>
                        <div style={{marginTop:20}}>
                            <span style={{fontFamily:"Helvetica", fontSize:16, fontWeight:"bold", color:"#222222"}}>Your achievement</span>
                        </div>
                        <div style={{marginTop:20}}>
                            <div style={{fontFamily:"Helvetica", fontSize:12, color:"#575e62"}}>BrainStorm Credit</div>
                            <div style={{height:5}}></div>
                            <div style={{backgroundColor:"#eaeaea", height:12}}>
                                <div style={{backgroundColor:"#77f5d8", height:12, width:""+bcredit+"%"}}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BrainStormHome);
