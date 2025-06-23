import { select } from '@inquirer/prompts';

import difficulty from './menus/difficulty';
import game from './menus/game';
import main from './menus/main';
import settings from './menus/settings';
import symbols from './menus/symbols';

async function showGameMenu() {
  const option = await select(game);

  switch (option) {
    case 'human':
      break;
    case 'machine':
      break;
    case 'main':
      await run();
      break;
    default:
      break;
  }
}

async function showSettingsMenu() {
  const option = await select(settings);

  switch (option) {
    case 'difficulty':
      await showDifficultyMenu();
      break;
    case 'symbols':
      await showSymbolsMenu();
      break;
    case 'clear':
      break;
    case 'main':
      await run();
      break;
    default:
      break;
  }
}

async function showDifficultyMenu() {
  const option = await select(difficulty);

  switch (option) {
    case 'easy':
      break;
    case 'medium':
      break;
    case 'hard':
      break;
    case 'settings':
      await showSettingsMenu();
      break;
    default:
      break;
  }
}

async function showSymbolsMenu() {
  const option = await select(symbols);

  switch (option) {
    case 'classic':
      break;
    case 'colors':
      break;
    case 'fun':
      break;
    case 'settings':
      await showSettingsMenu();
      break;
    default:
      break;
  }
}

async function run() {
  const option = await select(main);

  switch (option) {
    case 'game':
      await showGameMenu();
      break;
    case 'settings':
      await showSettingsMenu();
      break;
    case 'statistics':
      break;
    case 'exit':
      break;
    default:
      break;
  }
}

await run();
