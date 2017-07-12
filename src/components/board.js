import React, {Component} from 'react';
import Square from './square.js';
import '../assets/css/board.css';
import Piece from "./piece";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      turn: 'w',
      winner: null,
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
  squareContainsPiece(loc){
    const piece = this.state.pieces[loc.x+','+loc.y];
    return piece !== undefined;
  }
  doesCollide(oldLoc, newLoc){
    //up down
    if(oldLoc.x === newLoc.x && oldLoc.y !== newLoc.y){
      console.log("up down");
      let oldY = oldLoc.y;
      let newY = newLoc.y;
      //assuming newLoc is above oldLoc, will change if otherwise
      if(newY < oldY){
        const tempLoc = newY;
        newY = oldY;
        oldY = tempLoc;
      }
      console.log(oldY+"   "+newY);
      for(let i=oldY+1; i<newY; i++){
        console.log("y: "+i);
        if(this.squareContainsPiece({x:oldLoc.x, y:i})){
          console.log("does collide @ "+oldLoc.x+', '+i);
          return true;
        }
      }
      return false;
    }

    //left right
    //up down
    if(oldLoc.x !== newLoc.x && oldLoc.y === newLoc.y){
      console.log("left right");
      let oldX = oldLoc.x;
      let newX = newLoc.x;
      //assuming newLoc is above oldLoc, will change if otherwise
      if(newX < oldX){
        const tempLoc = newX;
        newX = oldX;
        oldX = tempLoc;
      }
      console.log(oldX+"   "+newX);
      for(let i=oldX+1; i<newX; i++){
        console.log("X: "+i);
        if(this.squareContainsPiece({x:i, y:oldLoc.y})){
          console.log("does collide @ "+i+', '+oldLoc.x);
          return true;
        }
      }
      return false;
    }
    //TODO seems to be working, will resolve if any issues
    //diag
    if(oldLoc.x !== newLoc.x && oldLoc.y !== newLoc.y && (this.state.pieces[oldLoc.x+','+oldLoc.y].split('-')[0]) === 'q' || this.state.pieces[oldLoc.x+','+oldLoc.y].split('-')[0] === 'b');{
      console.log("left right");
      let oldX = oldLoc.x;
      let newX = newLoc.x;
      //assuming newLoc is above oldLoc, will change if otherwise
      if(newX < oldX){
        const tempLoc = newX;
        newX = oldX;
        oldX = tempLoc;
      }
      console.log(oldX+"   "+newX);
      for(let i=oldX+1; i<newX; i++){
        console.log("X: "+i);
        if(this.squareContainsPiece({x:i, y:oldLoc.y})){
          console.log("does collide @ "+i+', '+oldLoc.x);
          return true;
        }
      }
      return false;
    }
    return false;
  }
  isLegalMove(piece, oldLoc, newLoc){

    piece = piece.split('-');
    const color = piece[1];
    piece = piece[0];
    let pieceNewLoc = this.state.pieces[newLoc.x+","+newLoc.y];
    let potentialKill = false;
    if(pieceNewLoc !== undefined){
      pieceNewLoc = pieceNewLoc.split('-');
      if(pieceNewLoc[1] === color){
        return false;
      }
      else{
        potentialKill = true;
      }
    }

    let diffX = newLoc.x - oldLoc.x;
    let diffY = newLoc.y - oldLoc.y;

    if(diffX === 0 && diffY === 0){
      console.log("same location");
      return false;
    }
    console.log("diffX: "+diffX+" diffY: "+diffY);
    switch (piece){
      case 'p':
        if(color === 'b'){
          diffY = -1*diffY;
        }
        if(diffY === 1 && Math.abs(diffX) <= 1){
          if(!potentialKill && diffX !== 0){
            return false;
          }
          else if(potentialKill && diffX===0){
            return false;
          }
          return true;
        }
        //how can this be simplified as WebStorm suggests?
        else if(((color === 'b' && oldLoc.y===6) ||
          (color === 'w' && oldLoc.y===1))&&
          diffY===2 && diffX===0){
          return true;
        }
        else{
          return false;
        }
      case 'b':
        console.log(Math.abs(diffX)===Math.abs(diffY));
        return (Math.abs(diffX) === Math.abs(diffY));
      case 'q':
        return(Math.abs(diffX) === Math.abs(diffY) ||
        (Math.abs(diffX) === 0 ||
            Math.abs(diffY) === 0)
        );
      case 'k':
        return (Math.abs(diffX) <= 1 &&  Math.abs(diffY)<= 1);
      case 'r':
        return (diffX === 0 || diffY === 0);
      case 'n':
        return ((Math.abs(diffY)===2 && Math.abs(diffX)===1) ||
                (Math.abs(diffY)===1 && Math.abs(diffX)===2));



    }
  }

  movePiece(oldLoc, newLoc){
    let pieces = this.state.pieces;
    const piece = pieces[oldLoc.x+","+oldLoc.y];
    const newLocPiece = pieces[newLoc.x+","+newLoc.y];
    //unnecessary to send piece here
    console.log('collides: '+this.doesCollide(oldLoc,newLoc));

    if(this.isLegalMove(piece,oldLoc,newLoc) && !this.doesCollide(oldLoc,newLoc)){
      if(newLocPiece!==undefined && newLocPiece.split('-')[0] === 'k'){
        this.setState({winner: this.state.turn});
      }
      console.log('make move');
      delete pieces[oldLoc.x+","+oldLoc.y];
      pieces[newLoc.x+","+newLoc.y] = piece;
      this.setState({pieces: pieces});
      this.setState({active: null});
      this.setState({turn: this.state.turn==='b'?'w':'b'});
    }
  }

  handleSquareClick(x,y) {
    let piece = this.state.pieces[x+","+y];
    const color = piece !== undefined?piece.split('-')[1]:"";
    if(piece !== undefined && color == this.state.turn){
      this.setState({active:{x:x, y:y}});
    }
    else if(this.state.active !== null){
      this.movePiece(this.state.active,{x:x,y:y});
    }


  }

  genBoard() {
    console.log("gen board");
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
        let className = "";
        if(this.state.active !== null){
          className = this.state.active.x === x && this.state.active.y === y?"active":"";
        }
        tempRow.push(
          <Square
            className={className}
            onMouseDown={() => {
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
    let footerText = <div className="turn">
                        Turn: {this.state.turn.toUpperCase()}
                     </div>
    if(this.state.winner !== null){
      footerText = <h2>{this.state.winner.toUpperCase()} Wins!!!!!</h2>
    }
    let hasActiveSquare = null;
    if(this.state.active !== null){
      hasActiveSquare="has-active-square";
    }
    return (
      <div>
      <div className={'Board turn-'+this.state.turn+" "+hasActiveSquare}>
        {this.genBoard()}
      </div>
    {footerText}
      </div>
    );
  }
}

export default Board;

