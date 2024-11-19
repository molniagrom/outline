import { getStatus, subscribe } from "../state/data.js";
import { EVENTS } from "../state/EVENTS.js";
import { GAME_STATUSES } from "../state/GAME_STATUSES.js";
import { GameMode } from "./game-mode/game-mode.component.js";
import { LoseMode } from "./lose-mode.component.js";
import { SettingsMode } from "./settings-mode.component.js";
import { WinMode } from "./win-mode.component.js";

export const Game = () => {
  console.log("Game creating");
  const element = document.createElement("div");
  element.classList.add("container");
  const localState = { childrenCleanUps: [] };

  const unsubscribe = subscribe((event) => {
    if (event.type === EVENTS.STATUS_CHANGED) {
        console.log(" I am Game and I will procrss" + event.type);
      Game.render(element, localState);
    } else {
        // debugger
        console.log(" I am Game and I ignored event " + event.type);   
    }
  });

  Game.render(element, localState);

  return {
    element,
    cleanup: () => {
      unsubscribe();
      localState.childrenCleanUps.forEach((cc) => cc());
    },
  };
};

Game.render = (element, localState) => {
  const status = getStatus();

  console.log("Game rendering");
  localState.status = status;
  element.innerHTML = "";
  localState.childrenCleanUps.forEach((cc) => cc());
  localState.childrenCleanUps = [];

  switch (status) {
    case GAME_STATUSES.SETTINGS:
      const settingsModeInstance = SettingsMode();
      localState.childrenCleanUps.push(settingsModeInstance.cleanup);
      element.append(settingsModeInstance.element);
      break;
    case GAME_STATUSES.IN_PROGRESS:
      const gameModeInstance = GameMode();
      localState.childrenCleanUps.push(gameModeInstance.cleanup);
      element.append(gameModeInstance.element);
      break;
    case GAME_STATUSES.LOSE:
      const loseModeInstance = LoseMode();
      localState.childrenCleanUps.push(loseModeInstance.cleanup);
      element.append(loseModeInstance.element);
      break;
    case GAME_STATUSES.WIN:
      const winModeElement = WinMode();
      localState.childrenCleanUps.push(winModeElement.cleanup);
      element.append(winModeElement.element);
      break;
    default:
      element.append("STATE IS INVALID");
  }
};
