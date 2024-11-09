import { EVENTS } from "../../state/EVENTS.js"; // Импортируем EVENTS

class ResultPanel {
    constructor() {
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.bottom = '10px';
        this.element.style.right = '10px';
        this.element.style.fontSize = '20px';
        this.element.innerText = ""; // Начальное состояние
    }

    render(message) {
        this.element.innerText = message; // Обновляем текст
    }

    subscribe(eventEmitter) {
        // Подписка на события
        this.eventEmitter = eventEmitter;
        this.eventEmitter.on(EVENTS.GOOGLE_WAS_CATCHED, () => this.render("Гугл пойман!"));
        this.eventEmitter.on(EVENTS.GOOGLE_ESCAPED, () => this.render("Гугл убегает!"));
    }

    unsubscribe() {
        // Отписка от событий
        if (this.eventEmitter) {
            this.eventEmitter.off(EVENTS.GOOGLE_WAS_CATCHED);
            this.eventEmitter.off(EVENTS.GOOGLE_ESCAPED);
        }
    }

    cleanup() {
        this.unsubscribe(); // Очистка подписок
        this.element.remove(); // Удаление элемента из DOM
    }
}

export default ResultPanel;