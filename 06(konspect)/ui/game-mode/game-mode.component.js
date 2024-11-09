import { Grid } from "./grid.component.js";

export function GameMode() {
    const element = document.createElement('div')
    element.classList.add("greed-box")
    GameMode.render(element);

    return {element};
}

GameMode.render = (element) => {
    const gridComponentInstance = Grid()
    element.append(gridComponentInstance.element)
}