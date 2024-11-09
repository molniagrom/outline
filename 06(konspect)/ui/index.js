import { movePlayer } from "../state/data.js";
import { MOVE_DIRECTIONS } from "../state/MOVE_DIRECTIONS.js";
import { Game } from "./game.component.js";

const rootElement = document.getElementById('root')

function render() {
    const gameInstance = Game()
    
    rootElement.append(gameInstance.element)
}

window.addEventListener("keydown", (event) => {
    console.log(event.key);
    console.log(event.code);

    switch (event.code) {
        // First player control (WASD)
        case "KeyW":
            movePlayer(2, MOVE_DIRECTIONS.UP);
            break;
        case "KeyA":
            movePlayer(2, MOVE_DIRECTIONS.LEFT);
            break;
        case "KeyS":
            movePlayer(2, MOVE_DIRECTIONS.DOWN);
            break;
        case "KeyD":
            movePlayer(2, MOVE_DIRECTIONS.RIGHT);
            break;

        // Control the second player (arrows)
        case "ArrowUp":
            movePlayer(1, MOVE_DIRECTIONS.UP);
            break;
        case "ArrowLeft":
            movePlayer(1, MOVE_DIRECTIONS.LEFT);
            break;
        case "ArrowDown":
            movePlayer(1, MOVE_DIRECTIONS.DOWN);
            break;
        case "ArrowRight":
            movePlayer(1, MOVE_DIRECTIONS.RIGHT);
            break;

        default:
            return;
    }
});

render()





