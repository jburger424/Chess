import React, {Component} from 'react';
import Square from './square.js';
import '../assets/css/board.css';
import Piece from "./piece";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      pieces: {
        '0,0': 'r-w',
        '1,0': 'n-w',
        '2,0': 'b-w',
        '3,0': 'k-w',
        '4,0': 'q-w',
        '5,0': 'b-w',
        '6,0': 'n-w',
        '7,0': 'r-w',
        '0,1': 'p-w',
        '1,1': 'p-w',
        '2,1': 'p-w',
        '3,1': 'p-w',
        '4,1': 'p-w',
        '5,1': 'p-w',
        '6,1': 'p-w',
        '7,1': 'p-w',
        '0,6': 'p-b',
        '1,6': 'p-b',
        '2,6': 'p-b',
        '3,6': 'p-b',
        '4,6': 'p-b',
        '5,6': 'p-b',
        '6,6': 'p-b',
        '7,6': 'p-b',
        '0,7': 'r-b',
        '1,7': 'n-b',
        '2,7': 'b-b',
        '3,7': 'k-b',
        '4,7': 'q-b',
        '5,7': 'b-b',
        '6,7': 'n-b',
        '7,7': 'r-b',
      }
    }
  }

  movePiece(oldLoc, newLoc){
    let pieces = this.state.pieces;
    const piece = pieces[oldLoc.x+","+oldLoc.y];
    delete pieces[oldLoc.x+","+oldLoc.y];
    pieces[newLoc.x+","+newLoc.y] = piece;
    this.setState({pieces: pieces});
    this.setState({active: null});
  }

  handleSquareClick(x,y) {
    if(this.state.active === null && this.state.pieces[x+","+y] !== undefined){
      this.setState({active:{x:x, y:y}});
    }
    else if(this.state.active !== null){
      this.movePiece(this.state.active,{x:x,y:y});
    }


  }

  genBoard() {
    const gridSize = 8;
    let tempBoard = [];
    for (let y = 0; y < gridSize; y++) {
      let tempRow = [];
      for (let x = 0; x < gridSize; x++) {
        const color = (y + x) % 2 === 0 ? 'w' : 'b';
        let piece = this.state.pieces[x+','+y];
        if(piece !== undefined && piece !== null){
          piece = piece.split('-');
          piece = <Piece
            type={piece[0]}
            color={piece[1]}
          />
        }
        else{
          piece = null;
        }
        tempRow.push(
          <Square
            onClick={() => {
              this.handleSquareClick(x,y)
            }}
            x={x}
            y={y}
            color={color}
            piece={piece}
            key={x + "," + y}
          />
        );
      }
      tempBoard.push(<div className="row"> {tempRow} </div>);
    }
    return tempBoard;
  }

  render() {
    return (
      <div className='Board'>
        {this.genBoard()}
      </div>
    );
  }
}

export default Board;

