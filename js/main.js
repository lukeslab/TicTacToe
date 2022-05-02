const ticTacToe = {
  "DOMBoard": document.querySelectorAll(".game-board > div"),
  "currentRound" : 0,
  "isPlayerTurn":true,
  "gameOver":false,
  "winner": 0,
  "currentBoard" : [null,null,null,null,null,null,null,null,null],
  "winConditions" : [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ],

  "addPlayerToken" : function(target){
    if (this.isPlayerTurn){
      // if a player or computer token is already in that box then exit the function.
      if (target.classList.contains("cross") || target.classList.contains("circle")) return;
      if (!target.innerHTML) {
        target.innerHTML = `<div class='circle'></div>`;
        this.currentRound++;
        this.isPlayerTurn = false;
      }
      this.updateCurrentBoard();
    }
  },
  "addComputerToken": function(){
    if (!this.gameOver){
      // select a random available cell
      const cell = Math.floor(Math.random()*9)
      console.log(cell)
      if (!this.currentBoard[cell]) {
        console.log(this.DOMBoard[cell])
        this.DOMBoard[cell].innerHTML =`<div class='cross'></div>`
        this.currentRound++;
        this.isPlayerTurn = true;
      } else {
        this.addComputerToken();
      }
      this.updateCurrentBoard()
    }
  },
  "updateCurrentBoard":function(){
    console.log(this.DOMBoard)
    this.DOMBoard.forEach( (e,i) =>{
      if(e.children[0]){
        e.children[0].className === 'cross' ? this.currentBoard[i] = 'cross':this.currentBoard[i]='circle'
      }
    })
    console.log(this.currentBoard)
    this.determineWinner();
  },
  "checkGameCells": function(a,b,c){

    console.log(a,b,c)
    // If  of the win condition has any cell on the current board with the value of null, then there currently is no winner.
    if (!this.currentBoard[a] || !this.currentBoard[b] || !this.currentBoard[c]) {
      console.log("Winner should be 0")
      return;
    }

    // If the win condition has all of its cells on the current board equal to each other, then there is a winner.
    if (this.currentBoard[a] === this.currentBoard[b] && this.currentBoard[b] === this.currentBoard[c]){
      // Since all the cells are equal, test one. If it is a cross, the computer wins. Otherwise, player wins.
      console.log("Winner should be 2 or 1")
      this.currentBoard[a] === 'cross' ? this.winner = 2: this.winner = 1;
      return;
    }
  },
  "determineWinner":function(){
    this.winConditions.forEach(condition => {
      if (!this.winner) this.checkGameCells(...condition);
    });

    console.log(this.winner);
    if (!this.winner){
      if (this.currentRound === 9) {
        console.log('Draw!')
        this.gameOver = true;
        return;
      }
      console.log(`There is not a winner yet! Round ${this.currentRound}`)
    } else {
      this.gameOver = true;
      if (this.winner === 1) console.log(`Player 1 wins!`)
      else console.log(`Computer wins!`)
    }
  }
}


document.querySelector(".game-board").addEventListener('click', e=>{
  ticTacToe.addPlayerToken(e.target);

  if (!ticTacToe.gameOver){
    setTimeout(function(){
      ticTacToe.addComputerToken();
    },3000)
  }
});
