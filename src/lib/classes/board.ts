type Marker = '' | 'X' | 'O'

export class Board {
  state: Marker[]

  constructor(state: Marker[] = ['', '', '', '', '', '', '', '', '']) {
    this.state = state
  }

  // prints a formatted version of the board to the brwoser console
  // only used for visualization during development
  printFormatted() {
    let formattedString = ''
    this.state.forEach((cell, index) => {
      formattedString += ` ${cell || ' '} |`
      if ((index + 1) % 3 === 0) {
        formattedString = formattedString.slice(0, -1) // remove trailing '|'
        if (index < 8) {
          formattedString += '\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n'
        }
      }
    })
    console.log('%c' + formattedString, 'color: lightgreen;font-size:16px')
  }
}
