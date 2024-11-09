import { Grid } from "./grid.component.js";
import ResultPanel from "../panelAndSound/result-panel.component.js"; 
import Sound from "../panelAndSound/sound.component.js"; 
import { EVENTS } from "../../state/EVENTS.js"; // Измененный путь

export function GameMode(eventEmitter) {
    const element = document.createElement('div');

    const resultPanel = new ResultPanel(); // Создаем панель результатов
    const sound = new Sound(eventEmitter); // Создаем объект звука

    eventEmitter.on(EVENTS.GOOGLE_WAS_CATCHED, () => { 
        resultPanel.render("Гугл пойман!"); // Обновляем панель результатов
    });

    eventEmitter.on(EVENTS.GOOGLE_ESCAPED, () => { 
        resultPanel.render("Гугл убегает!"); // Обновляем панель результатов
    });

    // Подписка на ResultPanel
    resultPanel.subscribe(eventEmitter);
    element.appendChild(resultPanel.element); // Добавляем панель в элемент

    const localState = {
        childrenCleanups: []
    };

    GameMode.render(element, localState);

    return {
        element, 
        cleanup: () => {
            localState.childrenCleanups.forEach(cc => cc());
            sound.cleanup(); // Очистка звукового компонента
            resultPanel.cleanup(); // Очистка панели результатов
        }
    };
}

GameMode.render = (element, localState) => {
    const gridComponentInstance = Grid();
    localState.childrenCleanups.push(gridComponentInstance.cleanup);
    element.append(gridComponentInstance.element);
};