import React, {Component} from 'react';
import './style.css';

class Card extends Component{
    render(){
        return (
            <div className="card-container">
                <label>
                    <input type="checkbox"/>
                    <div class="card">
                        <div class="front">circumspect</div>
                        <div class="back"></div>
                    </div>
                </label>
            </div>
        )
    }
}


export default Card;