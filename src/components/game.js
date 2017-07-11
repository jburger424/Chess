import React, { Component } from 'react';
import Board from "./board";

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            }
        }
    render() {

        return(
            <div className='Game'>
                <Board/>
            </div>
        );
    }
}

export default Game;

