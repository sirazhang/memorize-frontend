import React, {Component} from 'react';
import Carousel from 'nuka-carousel'
//import Header from '../components/Header';
import * as IMGS from '../common/images';

import './style.css';
import Header from '../components/Header';
import WordReviewLine from '../components/WordReviewLine';
import WordDetailLine from '../components/WordDetailLine';
import Pagination from '../components/Pagination';

/** Redux Begin */
import ReviewActions from '../store/actions/Review';
import AuthActions from '../store/actions/Auth';
import GuideActions from '../store/actions/Guide';

import {connect} from 'react-redux';
const mapStateToProps = (state) => {
    return {
        reviewState: state.review,
        userStudy: state.userstudy,
        guideState: state.guide,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getWordDataByPage: (pageNumber, pageSize, searchValue) => dispatch(ReviewActions.Get_WordData_ByPage(pageNumber, pageSize, searchValue)),
        saveUserStudy: (wordId, studyStatus, pageNumber, pageSize, searchValue) => dispatch(ReviewActions.Save_UserStudy(wordId, studyStatus, pageNumber, pageSize, searchValue)),
        seleclistUserStudy: (reviewed) => dispatch(ReviewActions.SelectList_UserStudy(reviewed)),
        logout: () => dispatch(AuthActions.Logout()),
        guideShow: () => dispatch(GuideActions.GuideScreenShow()),
        guideHide: () => dispatch(GuideActions.GuideScreenHide()),
    }
}

/** Redux End */

class Review extends Component{
    constructor(props){
        super(props);
        this.state = {
            wordDataByPage: null,
            totalRowCount: null,
            pageSize: 6,
            pageNumber: 1,
            wordViewState: 0,
            checkButtonname:"Check",
            showLearningRoute: false,
            isLoading: false,
            guideImgs:[
                IMGS.IMG_GUIDE_REVIEW_1,
                IMGS.IMG_GUIDE_REVIEW_2,
                IMGS.IMG_GUIDE_REVIEW_3,
                IMGS.IMG_GUIDE_REVIEW_4,
            ],
            guideDesc:[
                "All you unknown words will show here",
                "If you have mastered words\n Click 'Reviewed' if not 'Unfamiliar'",
                "Click the progress bar\n Your study time will show",
                "Here (Your Learning Routine)\n reflects your learning progress and cognition learning"
            ],
        }
    }

    async componentDidMount(){
        this.props.guideShow();
        this.setState({isLoading:true})
        await this.props.getWordDataByPage(1, this.state.pageSize, "");
        await this.props.seleclistUserStudy(1)
        this.setState({
            wordDataByPage: this.props.reviewState.wordDataByPage,
            totalRowCount: this.props.reviewState.totalRowCount,
            isLoading: false
        })
    }
    onClickBrainStorm = () => {
        this.props.history.push("/brainstorm-start")
    }

    onClickCheck = () => {
        if(this.state.wordViewState !== 0){
            this.setState({wordViewState: 0, checkButtonname:"Check"})
        }else{
            this.setState({wordViewState: 1, checkButtonname:"Back"})
        }
    }
    
    render(){
        let {wordDataByPage, totalRowCount, status} = this.props.reviewState
        let {data} = this.props.userStudy
        let {guideShow} = this.props.guideState;
        
        if(status === -2){
            this.props.logout();
        }
        return(
            <div className="review-container">
                <Header auth={true} color="#206ea7" history={this.props.history}/>
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

                <div style={{height:100}} />
                <div className="review-bg">
                    <img src={IMGS.IMG_BG_REVIEW} alt="Null" />
                </div>
                <div className="review-content">
                    <div className="review-portfolio">
                        <div className="review-avatar">
                            <img src={IMGS.IMG_SAMPLE_AVATAR} alt="Null" />
                        </div>
                        <div className="review-pf-content">
                            <div style={{marginTop: 20}}>
                                <span style={{fontFamily:"Helvetica", fontSize:23, fontWeight:"bold", color:"#222222"}}>Welcome, </span>
                                <span style={{fontFamily:"Helvetica", fontSize:23, color:"#222222"}}> incredible!</span>
                            </div>
                            <div style={{marginTop: 20, cursor:"pointer"}}>
                                <span style={{fontFamily:"Helvetica", fontSize:16, fontWeight:"bold", color:"#222222"}}>Your achievement</span>
                            </div>
                            <div style={{marginTop: 20}}>
                                <div style={{fontFamily:"Helvetica", fontSize:12, color:"#575e62"}}>BrainStorm Credit</div>
                                <div style={{height: 15}}></div>
                                <div style={{backgroundColor:"#eaeaea", height:12}}>
                                    <div style={{backgroundColor:"#77f5d8", height:12, width:"50%"}}></div>
                                </div>
                            </div>
                            <div style={{marginTop: 20 , cursor:"pointer"}}>
                                <span style={{fontFamily:"Helvetica", fontSize:16, fontWeight:"bold", color:"#222222"}} onClick={() => this.setState({showLearningRoute: true})}>Your Learning routine            ></span>
                            </div>
                        </div>
                    </div>
                    {
                        !this.state.showLearningRoute &&
                        <div className="review-words">
                        <div className="title">Words not mastered</div>
                        <div className="progress">
                            <div className="bar" style={{
                                backgroundColor: "#dee0e5", 
                                borderRadius: 10, 
                                width: data != null ? ""+Math.floor(data.length/totalRowCount*100)+"%": "0%", 
                                height: 17, display: "flex", 
                                justifyContent: "center", 
                                alignItems: "center"}}
                            >
                                <span style={{color: "#2062a7", fontSize: 15, fontFamily:"Helvetica", marginLeft:25}}>{data != null ? ""+Math.floor(data.length/totalRowCount*100)+"%": "0%"}</span>
                            </div>
                        </div>
                        <div className="words"> 
                        {
                            this.state.wordViewState === 0 && wordDataByPage && wordDataByPage.map((word, index) => {
                                return(
                                    <WordReviewLine 
                                        word={word} 
                                        isReviewed={word.StudyStatus} 
                                        key={"word-review-line"+index}
                                        onSaveUserStudy={this.props.saveUserStudy}
                                        pageNumber={this.state.pageNumber}
                                        pageSize={this.state.pageSize}
                                        searchValue={""}
                                    />    
                                );
                            })
                        }
                        {
                            this.state.wordViewState === 1 && wordDataByPage && wordDataByPage.map((word, index) => {
                                if(word.StudyStatus !== 1)
                                {
                                    return(
                                        <div key={"word-detail-line"+index}>
                                            <WordDetailLine 
                                                word={word} 
                                            />    
                                            <div style={{height:1, backgroundColor:"#e8e8e8", width:"100%"}}></div>
                                        </div>
                                    );
                                }else{
                                    return <div key={"word-detail-line"+index}></div>
                                }
                            })
                        }
                            <div style={{height:1, backgroundColor:"#e8e8e8", width:"100%"}} ></div>
                            <div className="paginate" style={{display:"flex", justifyContent:"center", marginTop: 30}}>
                                <Pagination 
                                    total={totalRowCount%this.state.pageSize === 0 ? Math.floor(totalRowCount/this.state.pageSize) : Math.floor(totalRowCount/this.state.pageSize+1)}
                                    onPage={this.props.getWordDataByPage}
                                    onPageChange={(pageNumber) => {this.setState({pageNumber:pageNumber})}}
                                    pageSize={this.state.pageSize}
                                    searchValue={""}
                                />
                            </div>
                            <button className="btncheck" onClick={this.onClickCheck}>{this.state.checkButtonname}</button>
                        </div>
                    </div>
                    }
                    {
                        this.state.showLearningRoute &&
                        <div className="review-words">
                            <div className="title">Your Learning Routine</div>
                            <div>
                                <img src={IMGS.IMG_LEARNING_ROUTE} style={{marginLeft: 50}} alt="Null"/>
                            </div>
                            <div style={{marginLeft:50, fontSize: 25, color: "#206ea7", fontFamily: "Helvetica", fontWeight: 500, cursor:"pointer"}} onClick={() => this.setState({showLearningRoute: false})}>{"< Back"}</div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
