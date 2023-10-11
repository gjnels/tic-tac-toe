<script lang="ts">
  import { X, Circle, Award, Frown, Ban } from 'lucide-svelte'
  import { Board } from '$lib/classes/board'
  import { Player } from '$lib/classes/player'
  import { fade, fly } from 'svelte/transition'

  const player = new Player()
  let board: Board
  let turn: 1 | 0
  let gameOver: ReturnType<Board['isTerminal']>

  function newGame() {
    board = new Board()
    turn = 1
    gameOver = undefined
  }

  function checkGameOver() {
    gameOver = board.isTerminal()
    return !!gameOver
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
    board.insert('o', player.getBestMove(board, false))
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
      <button
        tabindex="-1"
        class="inline-flex items-center justify-center bg-slate-300"
        disabled={!!cell}
        on:click={() => takeTurn(index)}
      >
        {#if cell === 'x'}
          <X size="50%" />
        {:else if cell === 'o'}
          <Circle size="50%" />
        {/if}
      </button>
    {/each}
  </div>
  <button
    on:click={newGame}
    class="mx-auto block rounded-md bg-slate-200 px-3 py-1 text-slate-900 hover:bg-slate-700 hover:text-white"
    >New Game</button
  >
</main>

{#if gameOver}
  <div transition:fade class="fixed inset-0 bg-slate-900/50" />
  <div class="fixed inset-0 m-4 grid place-items-center">
    <div
      transition:fly={{ y: 10 }}
      class="flex w-full max-w-md flex-col items-center gap-4 rounded-xl bg-white p-6 shadow"
    >
      <h2 class="text-xl font-medium">Game Over</h2>
      <p class="flex items-center gap-2 text-3xl font-semibold">
        {#if gameOver.winner === 'x'}
          <Award size="1em" class="text-green-500" />
          <span>You win!!</span>
        {:else if gameOver.winner === 'o'}
          <Frown size="1em" class="text-red-500" />
          <span>Sorry, you lost.</span>
        {:else}
          <Ban size="1em" class="text-amber-500" />
          <span>It's a tie!</span>
        {/if}
      </p>
      <button
        on:click={newGame}
        class="rounded-md bg-slate-200 px-3 py-1 text-slate-900 hover:bg-slate-700 hover:text-white"
      >
        New Game
      </button>
    </div>
  </div>
{/if}
