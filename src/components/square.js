import React, { Component } from 'react';
import '../assets/css/square.css';
import Piece from "./piece";

class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    handleClick(){
      console.log("click "+this.props.x+", "+this.props.y);
      console.log(this.props.piece);
    }
    render() {
        return(
            <div className={'Square '+this.props.color+" "+this.props.className} onClick={()=>{this.props.onClick()}}>
                {this.props.piece}
            </div>
        );
    }
}

export default Square;

