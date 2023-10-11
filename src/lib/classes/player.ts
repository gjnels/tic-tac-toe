import { Board } from './board'

export class Player {
  maxDepth: number
  nodesMap: Map<number, number[]>

  constructor(maxDepth = -1) {
    this.maxDepth = maxDepth
    this.nodesMap = new Map()
  }

  getBestMove(board: Board, maximizing = true, depth = 0) {
    // clear nodesMap if function is called for a new move
    if (depth === 0) this.nodesMap.clear()

    // if board is in a terminal state, return the heuristic value of the board
    if (board.isTerminal() || depth === this.maxDepth) {
      if (board.isTerminal()?.winner === 'x') return 100 - depth
      if (board.isTerminal()?.winner === 'o') return depth - 100
      return 0
    }

    let best = maximizing ? -100 : 100

    board.getAvailableMoves().forEach((index) => {
      const child = new Board([...board.state])
      child.insert(maximizing ? 'x' : 'o', index)
      const nodeValue = this.getBestMove(child, !maximizing, depth + 1)
      best = maximizing ? Math.max(nodeValue, best) : Math.min(nodeValue, best)
      if (depth === 0) {
        const moves = [index]
        const previousMoves = this.nodesMap.get(nodeValue)
        if (previousMoves) moves.push(...previousMoves)
        this.nodesMap.set(nodeValue, moves)
      }
    })

    if (depth === 0) {
      const moves = this.nodesMap.get(best)
      if (!moves) throw new Error('no valid moves found')
      return moves.length > 1 ? moves[Math.floor(Math.random() * moves.length)] : moves[0]
    }

    return best
  }
}
