import { getStatus, subscribe } from "../state/data.js";
import { EVENTS } from "../state/EVENTS.js";
import { GAME_STATUSES } from "../state/GAME_STATUSES.js";
import { GameMode } from "./game-mode/game-mode.component.js";
import { LoseMode } from "./lose-mode.component.js";
import { SettingsMode } from "./settings-mode.component.js";

export const Game = () => {
    console.log('Game creating')
    const element = document.createElement('div')
    const localState = { childrenCleanups: [] }

    // side effect
    const unsubscribe = subscribe((event) => {
        if (event.type === EVENTS.STATUS_CHANGED) {
            console.log('I am Game and I will procces ' + event.type)
            Game.render(element, localState)
        } else {
            console.log('I am Game and I ignored event ' + event.type)
        }
    })

    Game.render(element, localState)

    return {element, cleanup: () => {
        unsubscribe();
        localState.childrenCleanups.forEach(cc => cc())
    }};
}

Game.render = (element, localState) => {
    const status = getStatus()
    console.log('Game rendering')
    localState.status = status
    element.innerHTML = ''
    localState.childrenCleanups.forEach(cc => cc())
    localState.childrenCleanups = []
    
    switch (status) {
        case GAME_STATUSES.SETTINGS:
            const settingsModeInstance = SettingsMode()
            localState.childrenCleanups.push(settingsModeInstance.cleanup)
            element.append(settingsModeInstance.element)
            break;
        case GAME_STATUSES.IN_PROGRESS:
            const gameModeInstance = GameMode()
            localState.childrenCleanups.push(gameModeInstance.cleanup)
            element.append(gameModeInstance.element)
            break;
        case GAME_STATUSES.LOSE:
            const loseModeInstance = LoseMode()
            localState.childrenCleanups.push(loseModeInstance.cleanup)
            element.append(loseModeInstance.element)
            break;
        case GAME_STATUSES.WIN:
            const winModeElement = 'WIN'
            element.append(winModeElement)
            break;
        default:
            element.append('STATE IS INVALID')
    }
}