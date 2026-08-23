import { describe, it, expect } from 'vitest'
import { bestMove } from './minimax.js'
import { applyMove, winner, isFull, emptyCells, EMPTY, HUMAN, COMPUTER } from './logic.js'

const empty = () => Array(9).fill(EMPTY)

function playRound(firstPlayer, xMoves, oMoves) {
  const board = empty()
  let turn = firstPlayer
  const xs = [...xMoves]
  const os = [...oMoves]
  while (!winner(board) && !isFull(board)) {
    if (turn === HUMAN) {
      const cell = xs.shift()
      if (cell === undefined) break
      applyMoveInPlace(board, cell, HUMAN)
    } else {
      const cell = os.length > 0 && turn === COMPUTER ? os.shift() : bestMove(board)
      if (cell === undefined || cell === -1) break
      applyMoveInPlace(board, cell, COMPUTER)
    }
    turn = turn === HUMAN ? COMPUTER : HUMAN
  }
  return board
}

function applyMoveInPlace(board, index, player) {
  if (board[index] !== EMPTY) throw new Error(`cell ${index} already taken`)
  board[index] = player
}

describe('bestMove', () => {
  it('takes an immediately available win', () => {
    // o can win the top row by playing cell 2
    const board = [COMPUTER, COMPUTER, EMPTY, HUMAN, HUMAN, EMPTY, EMPTY, EMPTY, EMPTY]
    expect(bestMove(board)).toBe(2)
  })

  it('blocks an immediate human threat', () => {
    // x threatens 0-1-2; o must play cell 2
    const board = [HUMAN, HUMAN, EMPTY, EMPTY, COMPUTER, EMPTY, EMPTY, EMPTY, EMPTY]
    expect(bestMove(board)).toBe(2)
  })

  it('prefers its own win over blocking', () => {
    // o completes the middle row with cell 5 even though x threatens the top row
    const board = [HUMAN, HUMAN, EMPTY, COMPUTER, COMPUTER, EMPTY, EMPTY, EMPTY, EMPTY]
    expect(bestMove(board)).toBe(5)
  })

  it('returns -1 on a terminal board', () => {
    const won = [HUMAN, HUMAN, HUMAN, COMPUTER, COMPUTER, EMPTY, EMPTY, EMPTY, EMPTY]
    expect(bestMove(won)).toBe(-1)
    const full = [HUMAN, COMPUTER, HUMAN, COMPUTER, HUMAN, COMPUTER, COMPUTER, HUMAN, COMPUTER]
    expect(bestMove(full)).toBe(-1)
  })

  it('never loses from the empty board against any human play', () => {
    // exhaustive: every human reply sequence against the AI, all game tree paths
    let humanWins = 0
    function search(board, humanTurn) {
      const result = winner(board)
      if (result) {
        if (result.player === HUMAN) humanWins++
        return
      }
      if (isFull(board)) return
      if (humanTurn) {
        for (const cell of emptyCells(board)) {
          search(applyMove(board, cell, HUMAN), false)
        }
      } else {
        const cell = bestMove(board)
        expect(cell).not.toBe(-1)
        search(applyMove(board, cell, COMPUTER), true)
      }
    }
    search(empty(), true)
    expect(humanWins).toBe(0)
  })

  it('plays a draw when both sides are perfect', () => {
    // minimax vs minimax from the opening must end with no winner
    const board = playPerfectVsPerfect()
    expect(winner(board)).toBeNull()
    expect(isFull(board)).toBe(true)
  })
})

function playPerfectVsPerfect() {
  const board = empty()
  let turn = HUMAN
  while (!winner(board) && !isFull(board)) {
    const move = bestMove(board)
    applyMoveInPlace(board, move, turn)
    turn = turn === HUMAN ? COMPUTER : HUMAN
  }
  return board
}
