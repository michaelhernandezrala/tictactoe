import Board from './Board';
import Player from './Player';

class TicTacToe {
  private board: Board;
  private turn: number;
  private players: Player[] = [];
  private static readonly NUM_PLAYERS = 2;

  public constructor() {
    this.board = new Board();
    this.turn = 0;
    for (let i = 0; i < TicTacToe.NUM_PLAYERS; i++) {
      this.players[i] = new Player(i);
    }
  }

  public async play(): Promise<void> {
    do {
      this.board.write();
      await this.players[this.turn]?.put(this.board);
      this.turn = (this.turn + 1) % TicTacToe.NUM_PLAYERS;
    } while (!this.board.isTicTacToe() && !this.board.isComplete());

    this.board.write();

    const winner = this.board.getWinner();
    if (winner) {
      console.log(`🎉 Player ${winner} wins!`);
      return;
    }
    console.log(`🤝 It's a tie!`);
  }
}

export default TicTacToe;
