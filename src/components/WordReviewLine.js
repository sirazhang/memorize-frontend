import React, {Component} from 'react';
import * as IMGS from '../common/images';

class WordReviewLine extends Component{
    constructor(props){
        super(props)
        this.state = {
            word: this.props.word,
            isReviewed: this.props.isReviewed
        }
    }

    onClickReviewed(word){
        //console.log(this.props)
        let {pageNumber, pageSize, searchValue} = this.props
        this.setState({isReviewed: 1});
        this.props.onSaveUserStudy(word.id, 1, pageNumber, pageSize, searchValue)
    }

    onClickUnfamiliar(word){
        let {pageNumber, pageSize, searchValue} = this.props
        this.setState({isReviewed: 2});
        this.props.onSaveUserStudy(word.id, 2, pageNumber, pageSize, searchValue)
    }

    render(){
        let {word, isReviewed} = this.props
        return(
            <div className="word">
                <div style={{width:"30%"}}>{word.Word}</div>
                <div onClick={() => this.onClickReviewed(word)}>
                    <img src={isReviewed === 1?IMGS.IMG_ICON_DOT_CHECK:IMGS.IMG_ICON_DOT_UNCHECK} style={{width:34, height:24, cursor:"pointer"}} alt="Null" />
                </div>
                <div style={{width:"20%", marginLeft:20}}>Reviewed</div>
                <div onClick={() => this.onClickUnfamiliar(word)}>
                    <img src={isReviewed === 1?IMGS.IMG_ICON_DOT_UNCHECK:IMGS.IMG_ICON_DOT_CHECK} style={{width:34, height:24, cursor:"pointer"}} alt="Null" />
                </div>
                <div style={{width:"20%",marginLeft:20}}>Unfamiliar</div>
            </div>
        )
    }
}

export default WordReviewLine;
