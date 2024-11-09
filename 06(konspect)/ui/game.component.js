import { getStatus, subscribe } from "../state/data.js";
import { GAME_STATUSES } from "../state/GAME_STATUSES.js";
import { GameMode } from "./game-mode/game-mode.component.js";
import { LoseMode } from "./lose-mode.component.js";
import { SettingsMode } from "./settings-mode.component.js";
import { WinMode } from "./win-mode.component.js";

export const Game = () => {
    console.log('Game creating')
    const element = document.createElement('div')
    element.classList.add("container")
    const localState = { status: null }

    subscribe(() => {
        Game.render(element, localState)
    })

    Game.render(element, localState)

    return {element};
}

Game.render = (element, localState) => {
    const status = getStatus()
    if (localState.status === status) return;
    
    console.log('Game rendering')
    localState.status = status
    element.innerHTML = ''
    
    switch (status) {
        case GAME_STATUSES.SETTINGS:
            const settingsModeInstance = SettingsMode()
            element.append(settingsModeInstance.element)
            break;
        case GAME_STATUSES.IN_PROGRESS:
            const gameModeInstance = GameMode()
            element.append(gameModeInstance.element)
            break;
        case GAME_STATUSES.LOSE:
            const loseModeInstance = LoseMode()
            element.append(loseModeInstance.element)
            break;
        case GAME_STATUSES.WIN:
            const winModeElement = WinMode()
            element.append(winModeElement.element)
            break;
        default:
            element.append('STATE IS INVALID')
    }
}