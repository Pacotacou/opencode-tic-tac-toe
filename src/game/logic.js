export const EMPTY = null
export const HUMAN = 'x'
export const COMPUTER = 'o'

export const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export function winner(board) {
  for (const line of LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line }
    }
  }
  return null
}

export function applyMove(board, index, player) {
  if (index < 0 || index > 8 || board[index] !== EMPTY) {
    return board
  }
  const next = board.slice()
  next[index] = player
  return next
}

export function isFull(board) {
  return board.every((cell) => cell !== EMPTY)
}

export function emptyCells(board) {
  const cells = []
  for (let i = 0; i < 9; i++) {
    if (board[i] === EMPTY) cells.push(i)
  }
  return cells
}
