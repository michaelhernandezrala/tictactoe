import Board from './Board';

class TicTacToe {
  private board: Board;
  private turn: number;

  public constructor() {
    this.board = new Board();
    this.turn = 0;
  }

  public play(): void {
    this.board.write();
  }
}

export default TicTacToe;
