import React, {Component} from 'react';

class WordReviewLine extends Component{
    render(){
        let {word} = this.props
        return(
            <div className="word">
                <div style={{width:"30%"}}>{word.Word}</div>
                <div style={{width:"70%", display:"flex", flexDirection:"column"}}>
                    <div>{word.EnglishMeaning}</div>
                    <div style={{height:10}}></div>
                    <div>{word.ChineseMeaning}</div>
                </div>
            </div>
        )
    }
}

export default WordReviewLine;
