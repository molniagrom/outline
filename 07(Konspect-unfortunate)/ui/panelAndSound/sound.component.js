import { EVENTS } from "../../state/EVENTS.js"; // Импортируем EVENTS

class Sound {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        
        // Звуковые файлы
        this.catchSound = new Audio('path/to/catch-sound.mp3'); // Замените на реальный путь
        this.escapeSound = new Audio('path/to/escape-sound.mp3'); // Замените на реальный путь
        
        // Подписка на события
        this.eventEmitter.on(EVENTS.GOOGLE_WAS_CATCHED, () => this.playCatchSound());
        this.eventEmitter.on(EVENTS.GOOGLE_ESCAPED, () => this.playEscapeSound());
    }

    playCatchSound() {
        this.catchSound.play();
    }

    playEscapeSound() {
        this.escapeSound.play();
    }

    cleanup() {
        this.eventEmitter.off(EVENTS.GOOGLE_WAS_CATCHED);
        this.eventEmitter.off(EVENTS.GOOGLE_ESCAPED);
    }
}

export default Sound;