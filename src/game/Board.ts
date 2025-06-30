import Color from './Color';

class Board {
  public static readonly DIMENSION = 3;
  private tokens: Color[][] = [];

  public constructor() {
    this.initializeBoard();
  }

  private initializeBoard(): void {
    this.tokens = Array.from({ length: Board.DIMENSION }, () =>
      Array.from({ length: Board.DIMENSION }, () => Color.NONE)
    );
  }

  public isComplete(): boolean {
    let tokenCount = 0;

    for (let i = 0; i < Board.DIMENSION; i++) {
      for (let j = 0; j < Board.DIMENSION; j++) {
        const tokenValue = this.tokens[i]![j];
        const emptyTokenValue = Color.NONE;

        if (tokenValue !== emptyTokenValue) {
          tokenCount++;
        }
      }
    }

    return tokenCount === 9;
  }

  public write(): void {
    let counter = 1;

    console.log('┌───┬───┬───┐');

    for (let i = 0; i < Board.DIMENSION; i++) {
      let row = '|';
      for (let j = 0; j < Board.DIMENSION; j++) {
        const value = this.tokens[i]![j]!;
        const display = value === Color.NONE ? counter.toString() : value;
        row += ` ${display} |`;
        counter++;
      }

      console.log(row);

      if (i < 2) {
        console.log('├───┼───┼───┤');
      }
    }

    console.log('└───┴───┴───┘');
  }

  public isEmpty(position: number): boolean {
    let counter = 1;

    for (let i = 0; i < Board.DIMENSION; i++) {
      for (let j = 0; j < Board.DIMENSION; j++) {
        const value = this.tokens[i]![j]!;
        if (position === counter && value === Color.NONE) {
          return true;
        }
        counter++;
      }
    }

    return false;
  }

  public placeToken(color: Color, position: number): void {
    let counter = 1;

    for (let i = 0; i < Board.DIMENSION; i++) {
      for (let j = 0; j < Board.DIMENSION; j++) {
        if (position === counter) {
          this.tokens[i]![j]! = color;
        }
        counter++;
      }
    }
  }

  public isTicTacToe(): boolean {
    return this.isHorizontal() || this.isVertical() || this.isDiagonal() || this.isInverse();
  }

  private isHorizontal(): boolean {
    for (let i = 0; i < Board.DIMENSION; i++) {
      const token = this.tokens[i]![0]!;
      if (token !== Color.NONE && token === this.tokens[i]![1]! && token === this.tokens[i]![2]!) {
        return true;
      }
    }
    return false;
  }

  private isVertical(): boolean {
    for (let i = 0; i < Board.DIMENSION; i++) {
      const token = this.tokens[0]![i]!;
      if (token !== Color.NONE && token === this.tokens[1]![i]! && token === this.tokens[2]![i]!) {
        return true;
      }
    }
    return false;
  }

  private isDiagonal(): boolean {
    const center = this.tokens[1]![1]!;
    if (center !== Color.NONE && center === this.tokens[0]![0]! && center === this.tokens[2]![2]!) {
      return true;
    }

    return false;
  }

  private isInverse(): boolean {
    const center = this.tokens[1]![1]!;
    if (center !== Color.NONE && center === this.tokens[0]![2]! && center === this.tokens[2]![0]!) {
      return true;
    }

    return false;
  }

  public getWinner(): Color | null {
    if (!this.isTicTacToe()) {
      return null;
    }

    for (let i = 0; i < Board.DIMENSION; i++) {
      const token = this.tokens[i]![0]!;
      if (token !== Color.NONE && token === this.tokens[i]![1]! && token === this.tokens[i]![2]!) {
        return token;
      }
    }

    for (let j = 0; j < Board.DIMENSION; j++) {
      const token = this.tokens[0]![j]!;
      if (token !== Color.NONE && token === this.tokens[1]![j]! && token === this.tokens[2]![j]!) {
        return token;
      }
    }

    const center = this.tokens[1]![1]!;
    if (center !== Color.NONE) {
      if (
        (center === this.tokens[0]![0]! && center === this.tokens[2]![2]!) ||
        (center === this.tokens[0]![2]! && center === this.tokens[2]![0]!)
      ) {
        return center;
      }
    }

    return null;
  }
}

export default Board;
