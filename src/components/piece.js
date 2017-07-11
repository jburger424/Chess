import React, { Component } from 'react';
import '../assets/css/piece.css';

class Piece extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    icon(){
        if(this.props.color===null || this.props.type===null){
            return;
        }
        const imagePath = require('../assets/img/'+this.props.type+'-'+this.props.color+'.png');
        console.log(imagePath);
        return(
            <img className="piece" src={imagePath}/>
        );
    }
    handlePieceClick(){
        console.log("click");
    }
    render() {
        if(this.props.type === null){
            return null;
        }
        return(
            <div className={'Piece'}>
                {this.icon()}
            </div>
        );
    }
}

export default Piece;

