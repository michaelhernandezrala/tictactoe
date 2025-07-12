import TicTacToe from './TicTacToe';

class Turn {
  private value: number;

  public constructor() {
    this.value = 0;
  }

  public change(): void {
    this.value = this.notTake();
  }

  public take(): number {
    return this.value;
  }

  public notTake(): number {
    return (this.value + 1) % TicTacToe.NUM_PLAYERS;
  }
}

export default Turn;
