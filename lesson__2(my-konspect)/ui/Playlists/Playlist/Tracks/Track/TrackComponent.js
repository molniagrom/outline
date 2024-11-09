// Отвечает за компонент отдельного трека.
// Содержит функцию "TrackComponent", которая создает элемент трека, добавляет изображение и название трека.


import { TrackImageComponent } from "./TrackImage/TrackImageComponent.js";
import { TrackTitleComponent } from "./TrackTitle/TrackTitleComponent.js";


export function TrackComponent(inputTrack) {
    // create
    const element = document.createElement('li');

    // add data
    element.append(
        TrackImageComponent(inputTrack.imageSource),
        TrackTitleComponent(inputTrack)
    );

    // return
    return element;
}
