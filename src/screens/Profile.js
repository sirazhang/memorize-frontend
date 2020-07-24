import React, {Component} from 'react';
//import Header from '../components/Header';
import * as IMGS from '../common/images';

import './style.css';
import Header from '../components/Header';
//import WordReviewLine from '../components/WordReviewLine';
//import WordDetailLine from '../components/WordDetailLine';
//import Pagination from '../components/Pagination';

/** Redux Begin */
import ReviewActions from '../store/actions/Review';
import AuthActions from '../store/actions/Auth';
import {connect} from 'react-redux';
const mapStateToProps = (state) => {
    return {
        reviewState: state.review,
        userStudy: state.userstudy,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getWordDataByPage: (pageNumber, pageSize, searchValue) => dispatch(ReviewActions.Get_WordData_ByPage(pageNumber, pageSize, searchValue)),
        saveUserStudy: (wordId, studyStatus, pageNumber, pageSize, searchValue) => dispatch(ReviewActions.Save_UserStudy(wordId, studyStatus, pageNumber, pageSize, searchValue)),
        seleclistUserStudy: (reviewed) => dispatch(ReviewActions.SelectList_UserStudy(reviewed)),
        logout: () => dispatch(AuthActions.Logout())
    }
}
/** Redux End */

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            isEditMode: true,
        }
    }

    componentDidMount(){
        this.setState({isLoading:true})
    }
    
    render(){

        return(
            <div className="profile-container">
                <Header auth={true} color="#206ea7" history={this.props.history}/>
                <div style={{height:100}} />
                <div className="profile-bg">
                    <img src={IMGS.IMG_BG_REVIEW} alt="Null" />
                </div>
                <div className="profile-content">
                    <div className="profile-portfolio">
                        <div className="profile-avatar">
                            <img src={IMGS.IMG_SAMPLE_AVATAR} alt="Null" />
                        </div>
                        <div className="profile-pf-content">
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
                            <div style={{marginTop: 20, cursor:"pointer"}}>
                                <span style={{fontFamily:"Helvetica", fontSize:16, fontWeight:"bold", color:"#222222"}}>GRE</span>
                            </div>
                            <div style={{marginTop: 20}}>
                                <div style={{fontFamily:"Helvetica", fontSize:12, color:"#575e62"}}>Your Progress</div>
                                <div style={{height: 15}}></div>
                                <div style={{backgroundColor:"#eaeaea", height:12}}>
                                    <div style={{backgroundColor:"#77f5d8", height:12, width:"50%"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        !this.state.isEditMode &&
                    <div className="profile-settings">
                        <div className="formgroup">
                            <div className="glabel">User Name:</div>
                            <div className="gfield">incredible</div>
                        </div>
                        <div className="formgroup">
                            <div className="glabel">Email:</div>
                            <div className="gfield">incredible01@gmail.com</div>
                        </div>
                        <div className="formgroup">
                            <div className="glabel">Password:</div>
                            <div className="gfield">incredible</div>
                        </div>
                        <div style={{display:"flex", justifyContent:"flex-end", marginTop: 30}}>
                            <button className="btnconfirm">Edit Profile</button>
                        </div>
                    </div>
                    }
                    {
                        this.state.isEditMode &&
                        <div className="profile-settings">
                            <div className="formgroup">
                                <div className="glabel">User Name:</div>
                                <div className="gfield">
                                    <input placeholder="Enter your username" value="" />
                                </div>
                            </div>
                            <div className="formgroup">
                                <div className="glabel">Email:</div>
                                <div className="gfield">
                                    <input placeholder="Enter your email" value="" />
                                </div>
                            </div>
                            <div className="formgroup">
                                <div className="glabel">Password:</div>
                                <div className="gfield">
                                    <input type="password" placeholder="Enter ..." value="incredible" />
                                </div>
                            </div>
                            <div style={{display:"flex", justifyContent:"flex-end", marginTop: 30}}>
                                <button className="btnconfirm">Confirm</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
