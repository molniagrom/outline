export function LoseMode() {
    const element = document.createElement('div')

    LoseMode.render(element)

    return {element, cleanup: () => {}};
}

LoseMode.render = (element) => {
    element.append('GOOGLE WIN')

    const playAgainButtonElement = document.createElement('button')
    playAgainButtonElement.append('PLAY AGAIN 🚀')

    element.append(playAgainButtonElement)
}