import { input } from '@inquirer/prompts';
import Board from './Board';

class Player {
  private color: string;

  public constructor(i: number) {
    this.color = i === 0 ? 'x' : 'o';
  }

  public async put(board: Board): Promise<void> {
    let position;
    let ok;

    do {
      position = await this.askPosition();
      ok = board.isEmpty(position);
      if (!ok) {
        console.log('Oops! That spot is taken. Try another position.');
      }
    } while (!ok);

    board.placeToken(this.color, position);
  }

  private async askPosition(): Promise<number> {
    const position = await input({
      message: `🎯 Player ${this.color}, choose a position (1-9):`,
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
}

export default Player;
