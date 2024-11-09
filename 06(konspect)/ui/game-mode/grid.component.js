import { getGooglePosition, getGridSize, getPlayer1Position, getPlayer2Position, subscribe } from "../../state/data.js"
import { GoogleImg } from "../createImgGoogle.js"

export const Grid = () => {
    console.log('Grid creating...')
        const element = document.createElement('table')

        subscribe(() => {
            Grid.render(element)
        })

        Grid.render(element)
        
       return {element};
}

Grid.render = (element) => {
    console.log('Grid rendering...')
    element.innerHTML = '';
    const gridSize = getGridSize()
        const googlePosition = getGooglePosition()
        const player1Position = getPlayer1Position()
        const player2Position = getPlayer2Position()

        for (let y = 0; y < gridSize.rowsCount; y++) {
            const row = document.createElement('tr')

            for (let x = 0; x < gridSize.columnsCount; x++) { 
                const cell = document.createElement('td')
                cell.classList.add("td-cent")
                
                if (x === googlePosition.x && y === googlePosition.y) {
                    const imgObject = GoogleImg();
                     cell.append(imgObject.element)
                }

                if (x === player1Position.x && y === player1Position.y ) {
                    cell.append('👨‍💼')
                }

                if (x === player2Position.x && y === player2Position.y ) {
                    cell.append('👨')
                }

                row.append(cell)
            }

            element.append(row)            
        }

        window.grid = element;
}