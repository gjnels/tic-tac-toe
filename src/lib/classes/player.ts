export class Player {
  maxDepth: number
  nodesMap: Map<number, string>

  constructor(maxDepth = -1) {
    this.maxDepth = maxDepth
    this.nodesMap = new Map()
  }
}
