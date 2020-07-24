import React, {Component} from 'react';

import * as IMGS from '../common/images';
import * as UTILS from '../utils';
import * as COLORS from '../common/colors';

import './style.css';
import Card from '../components/Card';
import Loading from '../components/Loading';

/** Redux Begin */
import BrainStormActions from '../store/actions/BrainStorm';
import AuthActions from '../store/actions/Auth';

import {connect} from 'react-redux';
const mapStateToProps = (state) => {
    return {
        brainStormState: state.brainstorm
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        logout: () => dispatch(AuthActions.Logout()),
        brainStormGetSynWords: (i_Nth) => dispatch(BrainStormActions.GetSynonymWords(i_Nth)),
        updateBCredit: (bcredit) => dispatch(BrainStormActions.UpdateBCredit(bcredit)),
        getBCredit: () => dispatch(BrainStormActions.GetBCredit()),
    }
}
/** Redux End */

class BrainStormStart extends Component{
    constructor(props){
        super(props);
        this.state = {
            count : 10,
            cardStates: [false, false, false, false],
            firstFliped: 2, // 0-3
            targetFlip: 2, // 0-3
            successState: 0,
            title: ["Flip synonymous words", "Flip anonymous words"],
            nextReady: 0,
            isLoading: false,
            word1: null,
            word2: null,
            word3: null, 
            word4: null,
            word: [],
            shuffleArray: [],
            synOrAno: 1,
            dataloading: true,
            showChinese: false,
            cardBgColors: [COLORS.COLOR_CARD_BG_NORMAL, COLORS.COLOR_CARD_BG_NORMAL, COLORS.COLOR_CARD_BG_NORMAL, COLORS.COLOR_CARD_BG_NORMAL],
            userBCredit: 0,
        }
    }
    
    componentDidMount = async () => {
        var i_Nth;
        var shuffleArray = [1, 2, 3, 4];
        var word = [];
        var firstFliped = Math.floor(UTILS.getRandomDouble(0, 3));
        var synOrAno = Math.floor(UTILS.getRandomDouble(0, 2));

        this.setState({dataloading: true, synOrAno:synOrAno})

        await this.props.getBCredit()

        if(this.state.synOrAno === 0){
            i_Nth = Math.floor(UTILS.getRandomDouble(1, 56))
            await this.props.brainStormGetSynWords(i_Nth);
            this.setState({word1: this.props.brainStormState.synWorddata})
            await this.props.brainStormGetSynWords(i_Nth+1);
            this.setState({word2: this.props.brainStormState.synWorddata})   
            word = [this.state.word1[0], this.state.word1[1], this.state.word2[0], this.state.word2[1]];
            shuffleArray = UTILS.shuffle(shuffleArray)
            this.setState({word:[word[shuffleArray[0]-1], word[shuffleArray[1]-1], word[shuffleArray[2]-1], word[shuffleArray[3]-1]]})
            for(var i = 0 ; i < 4 ; i ++){
                if(i === firstFliped) continue;
                if(this.state.word[firstFliped].Kind === this.state.word[i].Kind){
                    this.setState({targetFlip: i});
                }
            }
        }else{
            i_Nth = Math.floor(UTILS.getRandomDouble(1, 5))
            await this.props.brainStormGetSynWords(i_Nth*4);
            this.setState({word1: this.props.brainStormState.synWorddata})
            await this.props.brainStormGetSynWords(i_Nth*4-3);
            this.setState({word2: this.props.brainStormState.synWorddata})
            await this.props.brainStormGetSynWords(i_Nth*4-2);
            this.setState({word3: this.props.brainStormState.synWorddata})
            await this.props.brainStormGetSynWords(i_Nth*4-1);
            this.setState({word4: this.props.brainStormState.synWorddata})
            word = [this.state.word1[0], this.state.word2[0], this.state.word3[0], this.state.word4[0]];
            shuffleArray = UTILS.shuffle(shuffleArray)
            this.setState({word:[word[shuffleArray[0]-1], word[shuffleArray[1]-1], word[shuffleArray[2]-1], word[shuffleArray[3]-1]]})
            for(i = 0 ; i < 4 ; i ++){
                if(i === firstFliped) continue;
                if(Math.abs(this.state.word[firstFliped].Kind - this.state.word[i].Kind) === 1){
                    this.setState({targetFlip: i});
                }
            }
            //console.log(this.state.word)
        }
        this.setState({firstFliped:firstFliped});

        //console.log(this.state.word1, this.state.word2)
        this.setState({dataloading: false})

        this.setState({isLoading:true})
        this.timeCountDown = setInterval(() => {
            ////console.log("time - ", this.state.count);
            var count = this.state.count-1;//(this.state.count-1 > 0)? this.state.count-1: 0;
            this.setState({count: count});
        }, 1000);
        this.timeoutFlipBack = setTimeout(() => {
            clearInterval(this.timeCountDown);
            this.setState({count: -2});
            this.updateCardState([true, true, true, true]);
        }, 12010)

        this.timeoutFlipFront = setTimeout(() => {
            var cardStates = [true, true, true, true];
            cardStates[this.state.firstFliped] = false;
            this.updateCardState(cardStates);
            //this.setState({successState:0})
            this.setState({isLoading:false})

        }, 13010)
    }

    componentWillUnmount = () => {
        clearTimeout(this.timeoutFlipBack);
        clearTimeout(this.timeoutFlipBack);
        clearTimeout(this.timeoutFlipFront);
        clearTimeout(this.timeoutTargetFlip);
        if(this.timeCountDown){
            clearInterval(this.timeCountDown);
        }
    }

    onClickBack = () => {
        this.props.history.push("/brainstorm-home")
    }

    updateCardState = (arr) => {
        this.setState({cardStates: arr});
    }

    onClickCard(idx) {
        if(this.state.firstFliped === idx) return;
        let{cardStates} = this.state;
        cardStates[idx] = !cardStates[idx];
        this.setState({cardStates: cardStates});
        if(idx === this.state.targetFlip){
            this.props.updateBCredit(1);
            this.timeoutTargetFlip = setTimeout(() => {
                let {cardBgColors} = this.state
                cardBgColors[this.state.firstFliped] = cardBgColors[this.state.targetFlip] = COLORS.COLOR_CARD_BG_CORRECT
                this.setState({cardStates:[false, false, false, false], successState: 1, showChinese: true, cardBgColors:cardBgColors})
            }, 1000)
            this.timeoutNext = setTimeout(() => {
                this.setState({nextReady: 1})
            }, 5000)
        }else{
            this.props.updateBCredit(-1);
            this.timeoutTargetFlip = setTimeout(() => {
                let {cardBgColors} = this.state
                cardBgColors[this.state.firstFliped] = cardBgColors[this.state.targetFlip] = COLORS.COLOR_CARD_BG_CORRECT
                cardBgColors[idx] = COLORS.COLOR_CARD_BG_WRONG
                this.setState({cardStates:[false, false, false, false], successState: 2, showChinese: true, cardBgColors:cardBgColors})
            }, 1000)
            this.timeoutNext = setTimeout(() => {
                this.setState({nextReady: 1})
            }, 5000)
        }
        //console.log(idx, this.state.targetFlip)    
    }

    render(){
        if(this.state.dataloading){
            return (
                <div></div>
            )
        }

        let {bcredit} = this.props.brainStormState
        if(bcredit === null) bcredit = 0
        if(bcredit > 100) bcredit = 100
        if(bcredit < 0) bcredit = 0

        return(
            <div className="bss-container">
                <div className="btn-back" onClick={this.onClickBack}>
                    <img src={IMGS.IMG_ICON_BACKBTN} alt="Null" />
                    <span>Back</span>
                </div>
                <div className="bss-title">BRAINSTORM</div>
                
                <div className="bss-content">
                    <div className="bss-ctn-left">
                        <Card open={this.state.cardStates[0]} onClick={() => this.onClickCard(0)} engWord={this.state.word[0].Word} chnWord={this.state.word[0].ChineseMeaning} showChinese={this.state.showChinese} bgColor={this.state.cardBgColors[0]}/>
                        <div style={{height: 20}}></div>
                        <Card open={this.state.cardStates[1]} onClick={() => this.onClickCard(1)} engWord={this.state.word[1].Word} chnWord={this.state.word[1].ChineseMeaning} showChinese={this.state.showChinese} bgColor={this.state.cardBgColors[1]}/>
                    </div>
                    <div className="bss-ctn-center">
                    {this.state.count === 10 &&
                        <div>
                            <div style={{fontSize:100}}>Start!</div>
                            <div style={{fontSize:150}}>10s</div>
                        </div>
                    }
                    {this.state.count !== 10 && this.state.count !== -2 &&
                        <div style={{position: "relative"}}>
                            {/* <img src={IMGS.IMG_BRAIN_COUNTDOWN} style={{width:"75%", height:"auto"}} alt="None"/> */}
                            <div className="bss-ctn-countdown">{this.state.count+1}<span style={{fontSize:40}}>S</span></div>
                            <svg className="svg-circle-counter" viewBox="0 0 230 230" width="230" height="230" xmlns="http://www.w3.org/2000/svg">
                                {/* <circle className="circle-chart__background" stroke="#efefef" strokeWidth="10" fill="none" cx="90" cy="90" r="85" /> */}
                                <circle className="circle-chart__circle" stroke="#f8f9ffa0" strokeWidth="10" strokeDasharray={""+2*Math.PI*110*(this.state.count+1)/10+","+2*Math.PI*110} strokeLinecap="none" fill="none" cx="115" cy="115" r="110" />
                                <circle stroke="#f8f9ffa0" strokeWidth="1" cx="115" cy="115" r="100" fill="none"/>
                            </svg>
                        </div>
                    }
                    {this.state.count === -2 && this.state.successState === 0 &&
                        <div>
                            <div className="bss-ctn-title">{this.state.title[this.state.synOrAno]}</div>
                        </div>
                    }
                    {this.state.count === -2 && this.state.successState === 1 &&
                        <div className="bss-ctn-success">
                            <img src={IMGS.IMG_SAMPLE_AVATAR} style={{width:122, height:122}} alt="None"/>
                            <div style={{height:20}} />
                            <div style={{fontFamily:"Helvetica", fontsize:20, fontWeight:"bold", textAlign:"left"}}>Brainstorm Credit</div>
                            <div style={{height:20}} />
                            <div style={{width:"100%", height:10, backgroundColor:"#EAEAEA", borderRadius:5}}>
                                <div style={{width:""+bcredit+"%", height:10, backgroundColor:"#1C8B9A", borderRadius: 5}}></div>
                            </div>
                            <div style={{height:20}} />
                            {this.state.nextReady === 1 &&
                                <button className="bss-ctn-btn-next">Next</button>
                            }
                            {this.state.nextReady === 0 &&
                                <div style={{fontFamily:"Helvetica", fontSize:60, fontWeight:"bold", fontStyle:"italic"}}>Good Job !</div>
                            }
                        </div>
                    }
                    {this.state.count === -2 && this.state.successState === 2 &&
                        <div className="bss-ctn-failed">
                            <img src={IMGS.IMG_SAMPLE_AVATAR} style={{width:122, height:122}} alt="None"/>
                            <div style={{height:20}} />
                            <div style={{fontFamily:"Helvetica", fontsize:20, fontWeight:"bold", textAlign:"left"}}>Brainstorm Credit</div>
                            <div style={{height:20}} />
                            <div style={{width:"100%", height:10, backgroundColor:"#EAEAEA", borderRadius:5}}>
                                <div style={{width:""+bcredit+"%", height:10, backgroundColor:"#1C8B9A", borderRadius: 5}}></div>
                            </div>
                            <div style={{height:20}} />
                            {this.state.nextReady === 1 &&
                                <button className="bss-ctn-btn-next">Next</button>
                            }
                            {this.state.nextReady === 0 &&
                                <div style={{fontFamily:"Helvetica", fontSize:60, fontWeight:"bold", fontStyle:"italic"}}>Failed</div>
                            }
                        </div>
                    }
                    </div>
                    <div className="bss-ctn-right">
                        <Card open={this.state.cardStates[2]} onClick={() => this.onClickCard(2)} engWord={this.state.word[2].Word} chnWord={this.state.word[2].ChineseMeaning} showChinese={this.state.showChinese} bgColor={this.state.cardBgColors[2]}/>
                        <div style={{height: 20}}></div>
                        <Card open={this.state.cardStates[3]} onClick={() => this.onClickCard(3)} engWord={this.state.word[3].Word} chnWord={this.state.word[3].ChineseMeaning} showChinese={this.state.showChinese} bgColor={this.state.cardBgColors[3]}/>
                    </div>
                </div>
                {
                    this.state.isLoading && 
                    <Loading showLoadingGif={false} bgColor={"#00000000"}/>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrainStormStart);
