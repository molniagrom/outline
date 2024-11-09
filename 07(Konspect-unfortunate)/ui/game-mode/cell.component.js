import { getGooglePosition, getPlayer1Position, subscribe } from "../../state/data.js"
import { EVENTS } from "../../state/EVENTS.js"

export function Cell(x, y) {
    console.log('Cell creating...')
    const element = document.createElement('td')
    
    const unsubscribe = subscribe((event) => {
        if (event.type === EVENTS.GOOGLE_JUMPED || 
            event.type === EVENTS.PLAYER_MOVED
        ) {
            if (
                (event.payload.newPosition.x === x && event.payload.newPosition.y === y) ||
                (event.payload.prevPosition.x === x && event.payload.prevPosition.y === y)
            
            ){
                Cell.render(element, x, y)
            } 
        }
    })


    Cell.render(element, x, y)

    return {element, cleanup: () => {
        unsubscribe();
    }}
}

Cell.render = (element, x, y) => {
    const googlePosition = getGooglePosition()
    const player1Position = getPlayer1Position()    
   // if( iAmNotPriDelah) return;

    console.log('Cell rendering...')

    element.innerHTML = '';
   
    

    if (x === googlePosition.x && y === googlePosition.y) {
        element.append('G')
   }

   if (x === player1Position.x && y === player1Position.y ) {
    element.append('P1')
   }
}