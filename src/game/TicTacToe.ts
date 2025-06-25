import Board from './Board';

class TicTacToe {
  private board: Board;
  private turn: number;

  public constructor() {
    this.board = new Board();
    this.turn = 0;
  }

  public async play(): Promise<void> {
    do {
      this.board.write();
      await this.board.put(this.turn);
      this.turn = (this.turn + 1) % 2;
    } while (!this.board.isTicTacToe() && !this.board.isComplete());

    const winner = this.board.getWinner();
    if (winner) {
      console.log(`🎉 Player ${winner} wins!`);
      return;
    }
    console.log(`🤝 It's a tie!`);
  }
}

export default TicTacToe;
