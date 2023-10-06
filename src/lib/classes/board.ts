type Marker = '' | 'X' | 'O'

export class Board {
  state: Marker[]

  constructor(state: Marker[] = ['', '', '', '', '', '', '', '', '']) {
    this.state = state
  }
}
