class Board {
  private tokens: string[][] = [];

  public constructor() {
    this.initializeBoard();
  }

  private initializeBoard(): void {
    this.tokens = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => '_'));
  }

  public isComplete(): boolean {
    let tokenCount = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tokenValue = this.tokens[i]![j];
        const emptyTokenValue = '_';

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

    for (let i = 0; i < 3; i++) {
      let row = '|';
      for (let j = 0; j < 3; j++) {
        const value = this.tokens[i]![j]!;
        const display = value === '_' ? counter.toString() : value;
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

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const value = this.tokens[i]![j]!;
        if (position === counter && value === '_') {
          return true;
        }
        counter++;
      }
    }

    return false;
  }

  public placeToken(color: string, position: number): void {
    let counter = 1;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
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
    for (let i = 0; i < 3; i++) {
      const token = this.tokens[i]![0]!;
      if (token !== '_' && token === this.tokens[i]![1]! && token === this.tokens[i]![2]!) {
        return true;
      }
    }
    return false;
  }

  private isVertical(): boolean {
    for (let i = 0; i < 3; i++) {
      const token = this.tokens[0]![i]!;
      if (token !== '_' && token === this.tokens[1]![i]! && token === this.tokens[2]![i]!) {
        return true;
      }
    }
    return false;
  }

  private isDiagonal(): boolean {
    const center = this.tokens[1]![1]!;
    if (center !== '_' && center === this.tokens[0]![0]! && center === this.tokens[2]![2]!) {
      return true;
    }

    return false;
  }

  private isInverse(): boolean {
    const center = this.tokens[1]![1]!;
    if (center !== '_' && center === this.tokens[0]![2]! && center === this.tokens[2]![0]!) {
      return true;
    }

    return false;
  }

  public getWinner(): string | null {
    if (!this.isTicTacToe()) {
      return null;
    }

    for (let i = 0; i < 3; i++) {
      const token = this.tokens[i]![0]!;
      if (token !== '_' && token === this.tokens[i]![1]! && token === this.tokens[i]![2]!) {
        return token;
      }
    }

    for (let j = 0; j < 3; j++) {
      const token = this.tokens[0]![j]!;
      if (token !== '_' && token === this.tokens[1]![j]! && token === this.tokens[2]![j]!) {
        return token;
      }
    }

    const center = this.tokens[1]![1]!;
    if (center !== '_') {
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
