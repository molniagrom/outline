import { EVENTS } from "./EVENTS.js";
import { GAME_STATUSES } from "./GAME_STATUSES.js"
import { MOVE_DIRECTIONS } from "./MOVE_DIRECTIONS.js";

// Data Base
const _state = {
    status: GAME_STATUSES.SETTINGS,
    settings: {
        gridSize: {
            rowsCount: 4,
            columnsCount: 4
        },
        pointsToWin: 3,
        pointsToLose: 300
    },
    positions: {
        google: { x: 0, y: 0 },
        player1: { x: 0, y: 0},
        player2: { x: 2, y: 2}
    },
    points: {
        google: 0,
        player1: 0,
        player2: 0
    }
}

let _observers = [];

function _notify(type, payload = {}) {
    const event = {
        type,
        payload
    }
    _observers.forEach(o => o(event))
}

export function subscribe(callback) {   
    _observers.push(callback)

    window._observers = _observers;
    
    return () => {
        unsubscribe(callback)
    }
}
export function unsubscribe(callback) {   
    _observers = _observers.filter(o => o !== callback)
    window._observers = _observers;
}


// getter / selector
export function getStatus() {
    return _state.status
}

export function getGridSize() {
    return _state.settings.gridSize
}

export function getGooglePosition() {
    return _state.positions.google
}

export function getPlayer1Position() {
    return _state.positions.player1
}

// setter / command / mutation / action
/**
 * нужно вызвать, чтоб игра запустилась: игроки будут расставлены случаынм образом
 * на гриде, гугл будет по интервалу прыгать
 */
export function startGame() {
    _state.status = GAME_STATUSES.IN_PROGRESS
    _notify(EVENTS.STATUS_CHANGED);

    _teleportGoogle();

    jumpIntervalId = setInterval(_escapeGoogle, 2000)
}

let jumpIntervalId;

/**
 * 
 * @param {(1,2)} playerNumber 
 * @param {('UP!' | 'DOWN!' | 'LEFT!' | 'RIGHT!')} direction 
 */
export function movePlayer(playerNumber, direction){    
    const positionReducers = {
        [MOVE_DIRECTIONS.UP]: (coords) => {
            return { 
                x: coords.x,
                y: coords.y - 1
            }
        },
        [MOVE_DIRECTIONS.DOWN]: (coords) => {
            return { 
                x: coords.x,
                y: coords.y + 1
            }
        },
        [MOVE_DIRECTIONS.LEFT]: (coords) => {
            return { 
                x: coords.x - 1,
                y: coords.y
            }
        },
        [MOVE_DIRECTIONS.RIGHT]: (coords) => {
            return { 
                x: coords.x + 1,
                y: coords.y
            }
        },
    }

    const reducer = positionReducers[direction]
    const newCoords = reducer(_state.positions['player' + playerNumber])

    if (!_isInsideGrid(newCoords)) {
        return;
    }

    let prevPosition =  {..._state.positions['player' + playerNumber]}
    _state.positions['player' + playerNumber] = newCoords

    if (_isPlayerInOnePositionWithGoogle(playerNumber)) {
        _catchGoogle(playerNumber)
    }

    _notify(EVENTS.PLAYER_MOVED, {
        newPosition:  {...newCoords},
        prevPosition: prevPosition,
        playerNumber: playerNumber
    });
}

function  _isPlayerInOnePositionWithGoogle(playerNumber) {
        const playerPosition =  _state.positions['player' + playerNumber]
        const googlePosition = getGooglePosition();

        return playerPosition.x === googlePosition.x && playerPosition.y === googlePosition.y
}

function _catchGoogle(playerNumber) {
    _state.points['player' + playerNumber]++;
    if (_state.points['player' + playerNumber] === _state.settings.pointsToWin) {
        _state.status =  GAME_STATUSES.WIN;
        _notify(EVENTS.STATUS_CHANGED)
        clearInterval(jumpIntervalId)
    }
    _teleportGoogle();
}

function _isInsideGrid(coords) {
    const isInsideGrid = coords.x >= 0 && coords.x < _state.settings.gridSize.columnsCount
    && coords.y >= 0 && coords.y < _state.settings.gridSize.rowsCount

    return isInsideGrid
} 

//JSDOC
/**
 * эта функция вызывается когда гугл убежал, то есть его никто не поймал и он по таймеру прыгнул
 */
function _escapeGoogle() {
    _notify(EVENTS.GOOGLE_ESCAPED)
    _teleportGoogle()
}

function _teleportGoogle() {
       const newX  = _getRandomInt(getGridSize().columnsCount);
       const newY = _getRandomInt(getGridSize().rowsCount);
      
       if (
       (newX === getGooglePosition().x && newY === getGooglePosition().y) ||
       (newX === getPlayer1Position().x && newY === getPlayer1Position().y)
    ) {
          _teleportGoogle();
           return;
       }
       const prevPosition = {..._state.positions.google}
        _state.positions.google.x = newX
        _state.positions.google.y = newY
        _notify(EVENTS.GOOGLE_JUMPED, {
            newPosition:  {..._state.positions.google},
            prevPosition: prevPosition
        });
}

function _getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
