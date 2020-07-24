import React, {Component} from 'react';
import './style.css';

class Card extends Component{
    render(){
        let {open, onClick, engWord, chnWord, showChinese, bgColor} = this.props;
        return (
            <div className="card-container">
                <label>
                    <input type="checkbox" checked={open} onClick={onClick} readOnly/>
                    <div className="card">
                        <div className="front" style={{backgroundColor: bgColor}}>
                            <span>{engWord}</span>
                            {showChinese &&
                                <span style={{fontSize:25}}>{chnWord}</span>
                            }
                        </div>
                        <div className="back"></div>
                    </div>
                </label>
            </div>
        )
    }
}

export default Card;