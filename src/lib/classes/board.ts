type Marker = 'x' | 'o'
type Cell = Marker | ''

export class Board {
  state: Cell[]

  constructor(state: Cell[] = ['', '', '', '', '', '', '', '', '']) {
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

  // determine if entire board is blank
  isEmpty() {
    return this.state.every((cell) => !cell)
  }

  // determine if entire board is filled
  isFull() {
    return this.state.every((cell) => cell)
  }

  // determine if board is in a terminal state
  // 1. a player has won the game with 3 markers in a row
  // 2. the board is full and no one has won
  isTerminal() {
    // board cannot be terminal if it is empty
    if (this.isEmpty()) return

    // check for horizontal win
    // row 1
    if (this.state[0] && this.state[0] === this.state[1] && this.state[0] === this.state[2]) {
      return { winner: this.state[0], direction: 'H', row: 1 }
    }
    // row 2
    if (this.state[3] && this.state[3] === this.state[4] && this.state[3] === this.state[5]) {
      return { winner: this.state[3], direction: 'H', row: 2 }
    }
    // row 3
    if (this.state[6] && this.state[6] === this.state[7] && this.state[6] === this.state[8]) {
      return { winner: this.state[6], direction: 'H', row: 3 }
    }

    // check for vertical win
    // column 1
    if (this.state[0] && this.state[0] === this.state[3] && this.state[0] === this.state[6]) {
      return { winner: this.state[0], direction: 'V', column: 1 }
    }
    // column 2
    if (this.state[1] && this.state[1] === this.state[4] && this.state[1] === this.state[7]) {
      return { winner: this.state[1], direction: 'V', column: 2 }
    }
    // column 3
    if (this.state[2] && this.state[2] === this.state[5] && this.state[2] === this.state[8]) {
      return { winner: this.state[2], direction: 'V', column: 3 }
    }

    // check for diagonal win
    // top-left to bottom-right
    if (this.state[0] && this.state[0] === this.state[4] && this.state[0] === this.state[8]) {
      return { winner: this.state[0], direction: 'D', diagonal: 'main' }
    }
    // top-right to bottom-left
    if (this.state[2] && this.state[2] === this.state[4] && this.state[2] === this.state[6]) {
      return { winner: this.state[2], direction: 'D', diagonal: 'counter' }
    }

    // there is no winner, game is a tie if all cells are full
    if (this.isFull()) return { winner: 'draw' }

    // there is no winner and the board is not full, nothing is returned
  }

  // place a marker on the board
  insert(marker: Marker, position: number) {
    // check position is within the bounds of the board
    if (position < 0 || position >= this.state.length) {
      throw new Error(`Position does not exist. Received: ${position}`)
    }

    // check the marker is an x or an o
    if (marker !== 'x' && marker !== 'o') {
      throw new Error(`Marker must be an x or an o. Received: ${marker}`)
    }

    // position is already marked
    if (this.state[position]) return false

    // position and marker are valid, place the marker
    this.state[position] = marker
    return true
  }

  // find all empty cell positions on the board
  getAvailableMoves() {
    const moves: number[] = []
    this.state.forEach((cell, index) => {
      if (!cell) moves.push(index)
    })
    return moves
  }
}
