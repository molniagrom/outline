import { getGridSize } from "../../state/data.js"
import { Cell } from "./cell.component.js"

export const Grid = () => {
    console.log('Grid creating...')
    const element = document.createElement('table')

    const localState = {
        childrenCleanups: []
    }

    Grid.render(element, localState)

    return { element, cleanup: () => {
        localState.childrenCleanups.forEach(cc => cc())
     } };
}

Grid.render = (element, localState) => {
    console.log('Grid rendering...')
    element.innerHTML = '';
    localState.childrenCleanups.forEach(cc => cc())
    localState.childrenCleanups = [];
    const gridSize = getGridSize()
   

    for (let y = 0; y < gridSize.rowsCount; y++) {
        const row = document.createElement('tr')

        for (let x = 0; x < gridSize.columnsCount; x++) {
            const cellInstance = Cell(x, y)
            localState.childrenCleanups.push(cellInstance.cleanup)
            row.append(cellInstance.element)
        }

        element.append(row)
    }

    window.grid = element;
}