<script lang="ts">
  import { Board } from '$lib/classes/board'
  import { Player } from '$lib/classes/player'

  const player = new Player()
  let board: Board
  let turn: 1 | 0

  function newGame() {
    board = new Board()
    turn = 1
  }

  function checkGameOver() {
    const gameOver = board.isTerminal()
    if (gameOver) {
      if (gameOver.winner === 'x') alert('You win!')
      if (gameOver.winner === 'o') alert('You lost!')
      if (gameOver.winner === 'draw') alert("It's a tie!")
      return true
    }
    return false
  }

  function takeTurn(position: number) {
    // it is not the player's turn
    if (!turn) return

    // check position is within bounds of the board
    if (position < 0 || position >= board.state.length) return

    // check cell at 'position' is empty
    if (board.state[position]) return

    // board is full, cannot make a move
    if (board.isTerminal()) return

    // place marker
    board.insert('x', position)
    board = board

    // check for a win
    if (checkGameOver()) return

    // take computer turn
    turn = 0
    board.insert('o', player.getBestMove(board))
    board = board

    // check for a win
    if (checkGameOver()) return

    // change turn back to player
    turn = 1
  }

  newGame()
</script>

<main class="mx-auto w-full max-w-xl">
  <div class="m-4 grid aspect-square max-w-xl grid-cols-3 grid-rows-3 gap-1 p-1">
    {#each board.state as cell, index (index)}
      <button tabindex="-1" class="bg-slate-300" disabled={!!cell} on:click={() => takeTurn(index)}
        >{cell}</button
      >
    {/each}
  </div>
</main>
