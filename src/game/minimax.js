import { EMPTY, HUMAN, COMPUTER, winner, isFull, emptyCells } from './logic.js'

const WIN = 10
const LOSS = -10

function score(board, depth) {
  const result = winner(board)
  if (!result) return null
  return result.player === COMPUTER ? WIN - depth : LOSS + depth
}

function minimax(board, depth, isComputerTurn) {
  const terminal = score(board, depth)
  if (terminal !== null) return terminal
  if (isFull(board)) return 0

  const cells = emptyCells(board)

  if (isComputerTurn) {
    let best = -Infinity
    for (const cell of cells) {
      board[cell] = COMPUTER
      best = Math.max(best, minimax(board, depth + 1, false))
      board[cell] = EMPTY
    }
    return best
  }

  let worst = Infinity
  for (const cell of cells) {
    board[cell] = HUMAN
    worst = Math.min(worst, minimax(board, depth + 1, true))
    board[cell] = EMPTY
  }
  return worst
}

export function bestMove(inputBoard) {
  const board = inputBoard.slice()
  const cells = emptyCells(board)
  if (cells.length === 0 || winner(board)) return -1

  let best = -Infinity
  let move = cells[0]
  for (const cell of cells) {
    board[cell] = COMPUTER
    const value = minimax(board, 0, false)
    board[cell] = EMPTY
    if (value > best) {
      best = value
      move = cell
    }
  }
  return move
}
