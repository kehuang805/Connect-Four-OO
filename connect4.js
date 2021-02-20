/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Game {
  constructor(height=6, width=7, player1, player2) {
    this.WIDTH = width;
    this.HEIGHT = height;
    this.board = [];
    this.player1 = player1;
    this.player2 = player2;
    this.currPlayer = player1;
    this.emptyBoard();
    this.makeBoard();
    this.makeHtmlBoard();
    
  }

  //function to empty board
  emptyBoard() {
    this.board =[];
    let gameBoard = document.getElementById('board');
    gameBoard.innerHTML = '';
  }

  /** makeBoard: create in-JS board structure:
  *   board = array of rows, each row is array of cells  (board[y][x])
  */
  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops. */

  makeHtmlBoard() {
    let gameBoard = document.getElementById('board');

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');



    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));

    

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    gameBoard.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
      gameBoard.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */

  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.colorName;
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  /** endGame: announce game end */

  endGame(msg) {
    alert(msg);
  }

  /** handleClick: handle click of column top to play piece */

  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      if (this.currPlayer = this.player1) {
        return this.endGame("Player 1 won!");
      } else {
        return this.endGame("Player 2 won!");
      }
    }

    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }

    // switch players
    this.currPlayer = this.currPlayer === this.player1 ? this.player2 : this.player1;

  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {
    let HEIGHT = this.HEIGHT;
    let WIDTH = this.WIDTH;
    let board = this.board;
    let currPlayer = this.currPlayer;
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < HEIGHT &&
          x >= 0 &&
          x < WIDTH &&
          board[y][x] === currPlayer
      );
    }

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player{
  constructor(colorName) {
    this.colorName = colorName;
  }
}


const buttonRow =document.createElement('div');
const button = document.createElement('button');
const player1Form = document.createElement('input');
player1Form.classList.add("placeholder");
player1Form.placeholder = "Player 1 color";
const player2Form = document.createElement('input');
player2Form.classList.add("placeholder");
player2Form.placeholder = "Player 2 color";
buttonRow.append(player1Form, player2Form);

button.setAttribute('id', 'begin-game');
button.innerHTML = 'begin game';

button.addEventListener('click', function(){
 
  let player1 = new Player(player1Form.value);
  let player2 = new Player(player2Form.value);
  new Game(6, 7, player1, player2);

});
let buttonPlace = document.getElementById("game");
buttonRow.append(button);
buttonPlace.prepend(buttonRow);



