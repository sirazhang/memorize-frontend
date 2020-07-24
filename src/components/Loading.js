import React, {Component} from 'react';
import * as IMGS from '../common/images';

export default class Loading extends Component{
    render(){
        let {showLoadingGif, bgColor} = this.props
        return (
            <div className="loading-container" style={{backgroundColor:bgColor}}>
                {
                    showLoadingGif &&
                    <img src={IMGS.IMG_LOADING} style={{position:"absolute", left:"50%", top:"50%"}} alt="None"/>
                }
            </div>
        )
    }
}
