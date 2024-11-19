import { EVENTS } from "./EVENTS.js";
import { GAME_STATUSES } from "./GAME_STATUSES.js";
import { MOVE_DIRECTIONS } from "./MOVE_DIRECTIONS.js";

// Data Base
const _state = {
  status: GAME_STATUSES.SETTINGS,
  settings: {
    gridSize: {
      rowsCount: 4,
      columnsCount: 4,
    },
    pointsToWin: 20,
    pointsToLose: 5,
  },
  positions: {
    google: { x: 0, y: 0 },
    player1: { x: 0, y: 0 },
    player2: { x: 2, y: 2 },
  },
  points: {
    google: 0,
    player1: 0,
    player2: 0,
  },
};

export function setGridSize(value) {
  // debugger
  const arr = value.split("x");
  const gridSizeRowsCount = arr[0];
  const gridSizeColumnsCount = arr[1];

  _state.settings.gridSize.columnsCount = Number(gridSizeColumnsCount);
  _state.settings.gridSize.rowsCount = Number(gridSizeRowsCount);
}

export function getPoints() {
  return _state.points;
}

export function getPointsToLose() {
  return _state.settings.pointsToLose;
}

export function setPointsToLose(value) {
  // console.log(value);
  _state.settings.pointsToLose = Number(value);
}

export function getPointsToWin() {
  return _state.settings.pointsToWin;
}

export function setPointsToWin(value) {
  // console.log(value);
  _state.settings.pointsToWin = Number(value);
}

export function getRowsCountGridSize() {
  return _state.settings.gridSize.columnsCount;
}

export function getColumnsCountGridSize() {
  return _state.settings.gridSize.rowsCount;
}

let _observers = [];

function _notify(type, payload = {}) {
  const event = {
    type,
    payload,
  };
  _observers.forEach((o) => o(event));
}

export function subscribe(callback) {
  _observers.push(callback);

  window._observers = _observers;

  return () => {
    unsubscribe(callback);
    window._observers = _observers;
  };
}

export function unsubscribe(callback) {
  _observers = _observers.filter((o) => o !== callback);
}

export function resetGameStatus() {
  _state.status = GAME_STATUSES.SETTINGS;
  _notify(EVENTS.STATUS_CHANGED);
}

// getter / selector
export function getStatus() {
  return _state.status;
}

export function getGridSize() {
  return _state.settings.gridSize;
}

export function getGooglePosition() {
  return _state.positions.google;
}

export function getPlayer1Position() {
  return _state.positions.player1;
}

export function getPlayer2Position() {
  return _state.positions.player2;
}

// setter / command / mutation / action
/**
 * нужно вызвать, чтоб игра запустилась: игроки будут расставлены случаынм образом
 * на гриде, гугл будет по интервалу прыгать
 */
export function startGame() {
  _state.status = GAME_STATUSES.IN_PROGRESS;

  _notify(EVENTS.STATUS_CHANGED);

  _teleportGoogle();

  jumpIntervalId = setInterval(_escapeGoogle, 2000);
}

let jumpIntervalId;

/**
 *
 * @param {(1,2)} playerNumber
 * @param {('UP!' | 'DOWN!' | 'LEFT!' | 'RIGHT!')} direction
 */
export function movePlayer(playerNumber, direction) {
  const positionReducers = {
    [MOVE_DIRECTIONS.UP]: (coords) => {
      return {
        x: coords.x,
        y: coords.y - 1,
      };
    },
    [MOVE_DIRECTIONS.DOWN]: (coords) => {
      return {
        x: coords.x,
        y: coords.y + 1,
      };
    },
    [MOVE_DIRECTIONS.LEFT]: (coords) => {
      return {
        x: coords.x - 1,
        y: coords.y,
      };
    },
    [MOVE_DIRECTIONS.RIGHT]: (coords) => {
      return {
        x: coords.x + 1,
        y: coords.y,
      };
    },
  };

  const reducer = positionReducers[direction];
  const newCoords = reducer(_state.positions["player" + playerNumber]);

  if (!_isInsideGrid(newCoords)) {
    return;
  }
  let prevPositions = { ..._state.positions["player" + playerNumber] };
  _state.positions["player" + playerNumber] = newCoords;

  if (_isPlayerInOnePositionWithGoogle(playerNumber)) {
    _catchGoogle(playerNumber);
  }

  _notify(EVENTS.PLAYER_MOVED, {
    newPositions: { ...newCoords },
    prevPositions: prevPositions,
    playerNumber: playerNumber,
  });
}

function _isPlayerInOnePositionWithGoogle(playerNumber) {
  const playerPosition = _state.positions["player" + playerNumber];
  const googlePosition = getGooglePosition();

  return (
    playerPosition.x === googlePosition.x &&
    playerPosition.y === googlePosition.y
  );
}

function _catchGoogle(playerNumber) {
  _state.points["player" + playerNumber]++;

  // Win check
  if (_state.points["player" + playerNumber] === _state.settings.pointsToWin) {
    _state.status = GAME_STATUSES.WIN;
    _notify(EVENTS.STATUS_CHANGED);
    clearInterval(jumpIntervalId);
    resettingPoints();
  }

  _teleportGoogle();
}

function _isInsideGrid(coords) {
  const isInsideGrid =
    coords.x >= 0 &&
    coords.x < _state.settings.gridSize.columnsCount &&
    coords.y >= 0 &&
    coords.y < _state.settings.gridSize.rowsCount;

  return isInsideGrid;
}

function resettingPoints() {
  //  _state.points = "0";

  // ForIn
  _state.points = {
    google: 0,
    player1: 0,
    player2: 0,
  };
}

//JSDOC
/**
 * эта функция вызывается когда гугл убежал, то есть его никто не поймал и он по таймеру прыгнул
 */
function _escapeGoogle() {
  // if (_state.points["player" + playerNumber] === _state.settings.pointsToLose) {
  //   _state.status = GAME_STATUSES.LOSE;
  //   clearInterval(jumpIntervalId);
  // }
  // проиграть грустную мелодию
  _notify(EVENTS.GOOGLE_ESCAPED);

  _state.points.google++;

  if (_state.points.google === _state.settings.pointsToLose) {
    _state.status = GAME_STATUSES.LOSE;
    clearInterval(jumpIntervalId);
    resettingPoints();
    
    _notify(EVENTS.STATUS_CHANGED);
  }

  _teleportGoogle();
}

function _teleportGoogle() {
  const newX = _getRandomInt(getGridSize().columnsCount);
  const newY = _getRandomInt(getGridSize().rowsCount);

  if (
    (newX === getGooglePosition().x && newY === getGooglePosition().y) ||
    (newX === getPlayer1Position().x && newY === getPlayer1Position().y) ||
    (newX === getPlayer2Position().x && newY === getPlayer2Position().y)
  ) {
    _teleportGoogle();
    return;
  }

  let prevPositions = { ..._state.positions.google };
  _state.positions.google.x = newX;
  _state.positions.google.y = newY;
  _notify(EVENTS.GOOGLE_JUMPED, {
    newPositions: { ..._state.positions.google },
    prevPositions: prevPositions,
  });
}

function _getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
