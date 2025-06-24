import Token from './Token';

class Board {
  private tokens: Token[][] = [];
  private static COLOR: string[] = ['X', 'O'];

  public constructor() {
    this.initializeBoard();
  }

  private initializeBoard(): void {
    this.tokens = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => new Token('_')));
  }

  public write(): void {
    let output = '';

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        output += this.tokens[i]![j]!.getValue() + ' ';
      }
      output += '\n';
    }

    console.log(output);
  }
}

export default Board;
