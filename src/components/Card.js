import React, {Component} from 'react';
import './style.css';

class Card extends Component{
    render(){
        return (
            <div className="card-container">
                <label>
                    <input type="checkbox"/>
                    <div className="card">
                        <div className="front">circumspect</div>
                        <div className="back"></div>
                    </div>
                </label>
            </div>
        )
    }
}


export default Card;