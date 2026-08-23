import { describe, it, expect } from 'vitest'
import { LINES, winner, applyMove, isFull, emptyCells, EMPTY, HUMAN, COMPUTER } from './logic.js'

const empty = () => Array(9).fill(EMPTY)

describe('winner', () => {
  it('detects each row win', () => {
    expect(winner([HUMAN, HUMAN, HUMAN, COMPUTER, COMPUTER, EMPTY, EMPTY, EMPTY, EMPTY])).toEqual({
      player: HUMAN,
      line: LINES[0],
    })
    expect(winner([EMPTY, EMPTY, EMPTY, HUMAN, HUMAN, HUMAN, EMPTY, COMPUTER, EMPTY]).player).toBe(HUMAN)
    expect(winner([COMPUTER, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, HUMAN, HUMAN, HUMAN]).player).toBe(HUMAN)
  })

  it('detects each column win', () => {
    expect(winner([COMPUTER, HUMAN, EMPTY, COMPUTER, HUMAN, EMPTY, COMPUTER, EMPTY, HUMAN])).toEqual({
      player: COMPUTER,
      line: LINES[3],
    })
    expect(winner([HUMAN, COMPUTER, EMPTY, EMPTY, COMPUTER, EMPTY, HUMAN, COMPUTER, EMPTY]).player).toBe(COMPUTER)
    expect(winner([EMPTY, EMPTY, HUMAN, EMPTY, EMPTY, HUMAN, COMPUTER, EMPTY, HUMAN]).player).toBe(HUMAN)
  })

  it('detects both diagonal wins', () => {
    expect(winner([HUMAN, COMPUTER, EMPTY, COMPUTER, HUMAN, EMPTY, EMPTY, EMPTY, HUMAN])).toEqual({
      player: HUMAN,
      line: LINES[6],
    })
    expect(winner([EMPTY, EMPTY, COMPUTER, EMPTY, COMPUTER, EMPTY, COMPUTER, EMPTY, EMPTY]).player).toBe(COMPUTER)
  })

  it('returns null on a board with no alignment', () => {
    expect(winner([HUMAN, HUMAN, COMPUTER, COMPUTER, COMPUTER, HUMAN, HUMAN, EMPTY, EMPTY])).toBeNull()
  })

  it('returns null on an empty board', () => {
    expect(winner(empty())).toBeNull()
  })
})

describe('applyMove', () => {
  it('places the mark in an empty cell and returns a new array', () => {
    const board = empty()
    const next = applyMove(board, 4, HUMAN)
    expect(next[4]).toBe(HUMAN)
    expect(board[4]).toBe(EMPTY)
    expect(next).not.toBe(board)
  })

  it('rejects a move into an occupied cell', () => {
    const board = applyMove(empty(), 0, HUMAN)
    expect(applyMove(board, 0, COMPUTER)).toBe(board)
  })

  it('rejects out-of-range indices', () => {
    const board = empty()
    expect(applyMove(board, -1, HUMAN)).toBe(board)
    expect(applyMove(board, 9, HUMAN)).toBe(board)
  })
})

describe('isFull / emptyCells', () => {
  it('reports full only when all nine cells are taken', () => {
    const full = [HUMAN, COMPUTER, HUMAN, COMPUTER, HUMAN, COMPUTER, COMPUTER, HUMAN, COMPUTER]
    expect(isFull(full)).toBe(true)
    expect(isFull([HUMAN, COMPUTER, HUMAN, COMPUTER, HUMAN, COMPUTER, COMPUTER, HUMAN, EMPTY])).toBe(false)
    expect(isFull(empty())).toBe(false)
  })

  it('lists empty cells in index order', () => {
    expect(emptyCells(empty())).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
    expect(emptyCells([HUMAN, EMPTY, COMPUTER, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY])).toEqual([
      1, 3, 4, 5, 6, 7, 8,
    ])
  })
})
