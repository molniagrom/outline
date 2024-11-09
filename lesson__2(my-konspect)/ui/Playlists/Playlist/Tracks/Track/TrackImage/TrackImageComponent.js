// Отвечает за компонент изображения трека.
// Содержит функцию "TrackImageComponent", которая создает элемент изображения и устанавливает источник изображения.


export function TrackImageComponent(inputImageSource) {
    const element = document.createElement('img');
    element.src = inputImageSource;
    return element;
}
