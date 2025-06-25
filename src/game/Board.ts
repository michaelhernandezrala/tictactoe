import { input } from '@inquirer/prompts';
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

  public isComplete(): boolean {
    let tokenCount = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tokenValue = this.tokens[i]![j]!.getValue();
        const emptyTokenValue = new Token('_').getValue();

        if (tokenValue !== emptyTokenValue) {
          tokenCount++;
        }
      }
    }

    return tokenCount === 6;
  }

  public async put(turn: number): Promise<void> {
    let position;
    let ok;

    do {
      position = await this.askPosition(turn);
      ok = this.isEmpty(position);
      if (!ok) {
        console.log('Oops! That spot is taken. Try another position.');
      }
    } while (!ok);

    this.placeToken(turn, position);
  }

  public write(): void {
    let counter = 1;

    console.log('┌───┬───┬───┐');

    for (let i = 0; i < 3; i++) {
      let row = '|';
      for (let j = 0; j < 3; j++) {
        const value = this.tokens[i]![j]!.getValue();
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

  private async askPosition(turn: number): Promise<number> {
    const position = await input({
      message: `🎯 Player ${Board.COLOR[turn]}, choose a position (1-9):`,
      validate: value => {
        const parsedValue = Number.parseInt(value);

        if (Number.isNaN(parsedValue) || parsedValue < 0 || parsedValue > 9) {
          return 'Please enter a number from 1 to 9';
        }
        return true;
      },
    });

    return Number.parseInt(position);
  }

  private isEmpty(position: number): boolean {
    let counter = 1;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const value = this.tokens[i]![j]!.getValue();
        if (position === counter && value === '_') {
          return true;
        }
        counter++;
      }
    }

    return false;
  }

  private placeToken(turn: number, position: number): void {
    let counter = 1;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (position === counter) {
          this.tokens[i]![j]! = new Token(Board.COLOR[turn]!);
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
      const token = this.tokens[i]![0]!.getValue();
      if (token !== '_' && token === this.tokens[i]![1]!.getValue() && token === this.tokens[i]![2]!.getValue()) {
        return true;
      }
    }
    return false;
  }

  private isVertical(): boolean {
    for (let i = 0; i < 3; i++) {
      const token = this.tokens[0]![i]!.getValue();
      if (token !== '_' && token === this.tokens[1]![i]!.getValue() && token === this.tokens[2]![i]!.getValue()) {
        return true;
      }
    }
    return false;
  }

  private isDiagonal(): boolean {
    const center = this.tokens[1]![1]!.getValue();
    if (center !== '_' && center === this.tokens[0]![0]!.getValue() && center === this.tokens[2]![2]!.getValue()) {
      return true;
    }

    return false;
  }

  private isInverse(): boolean {
    const center = this.tokens[1]![1]!.getValue();
    if (center !== '_' && center === this.tokens[0]![2]!.getValue() && center === this.tokens[2]![0]!.getValue()) {
      return true;
    }

    return false;
  }

  public getWinner(): string | null {
    if (!this.isTicTacToe()) {
      return null;
    }

    for (let i = 0; i < 3; i++) {
      const token = this.tokens[i]![0]!.getValue();
      if (token !== '_' && token === this.tokens[i]![1]!.getValue() && token === this.tokens[i]![2]!.getValue()) {
        return token;
      }
    }

    for (let j = 0; j < 3; j++) {
      const token = this.tokens[0]![j]!.getValue();
      if (token !== '_' && token === this.tokens[1]![j]!.getValue() && token === this.tokens[2]![j]!.getValue()) {
        return token;
      }
    }

    const center = this.tokens[1]![1]!.getValue();
    if (center !== '_') {
      if (
        (center === this.tokens[0]![0]!.getValue() && center === this.tokens[2]![2]!.getValue()) ||
        (center === this.tokens[0]![2]!.getValue() && center === this.tokens[2]![0]!.getValue())
      ) {
        return center;
      }
    }

    return null;
  }
}

export default Board;
