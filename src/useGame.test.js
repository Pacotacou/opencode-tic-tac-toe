import { describe, it, expect } from 'vitest'
import { gameReducer, initialState } from './useGame.js'
import { EMPTY, HUMAN, COMPUTER } from './game/logic.js'

const empty = () => Array(9).fill(EMPTY)

describe('gameReducer', () => {
  it('accepts a human move on the human turn into an empty cell', () => {
    const s0 = initialState()
    const s1 = gameReducer(s0, { type: 'HUMAN_MOVE', index: 4 })
    expect(s1.board[4]).toBe(HUMAN)
    expect(s1.turn).toBe('computer')
    expect(s1.outcome).toBeNull()
  })

  it('rejects human moves while it is the computer turn', () => {
    const s0 = gameReducer(initialState(), { type: 'HUMAN_MOVE', index: 4 })
    const s1 = gameReducer({ ...s0 }, { type: 'HUMAN_MOVE', index: 0 })
    expect(s1.board[0]).toBe(EMPTY)
    expect(s1.turn).toBe('computer')
    expect(s1.outcome).toBeNull()
  })

  it('rejects moves into occupied cells', () => {
    const s0 = initialState()
    const s1 = gameReducer(s0, { type: 'HUMAN_MOVE', index: 4 })
    const s2 = gameReducer({ ...s1, roundId: -1 }, { type: 'COMPUTER_MOVE', index: 4, roundId: s1.roundId })
    expect(s2.board[4]).toBe(HUMAN)
  })

  it('detects a human win and updates the score', () => {
    let s = initialState()
    // x at 0,1 then winning third mark at 2 (computer replies elsewhere via direct dispatches)
    s = gameReducer(s, { type: 'HUMAN_MOVE', index: 0 })
    s = gameReducer(s, { type: 'COMPUTER_MOVE', index: 3, roundId: s.roundId })
    s = gameReducer(s, { type: 'HUMAN_MOVE', index: 1 })
    s = gameReducer(s, { type: 'COMPUTER_MOVE', index: 4, roundId: s.roundId })
    s = gameReducer(s, { type: 'HUMAN_MOVE', index: 2 })
    expect(s.outcome).toBe('human')
    expect(s.line).toEqual([0, 1, 2])
    expect(s.score).toEqual({ w: 1, l: 0, d: 0 })
  })

  it('locks the board once the round has ended', () => {
    let s = initialState()
    s = gameReducer(s, { type: 'HUMAN_MOVE', index: 0 })
    s = gameReducer(s, { type: 'COMPUTER_MOVE', index: 3, roundId: s.roundId })
    s = gameReducer(s, { type: 'HUMAN_MOVE', index: 1 })
    s = gameReducer(s, { type: 'COMPUTER_MOVE', index: 4, roundId: s.roundId })
    s = gameReducer(s, { type: 'HUMAN_MOVE', index: 2 })
    const locked = gameReducer(s, { type: 'HUMAN_MOVE', index: 8 })
    expect(locked.board[8]).toBe(EMPTY)
    expect(locked.score.w).toBe(1)
  })

  it('records a draw when the board fills without alignment', () => {
    // eight marks down, no winner yet, computer to play the final cell
    const s0 = {
      ...initialState(),
      board: [COMPUTER, HUMAN, COMPUTER, COMPUTER, HUMAN, COMPUTER, HUMAN, EMPTY, HUMAN],
      turn: 'computer',
    }
    const s1 = gameReducer(s0, { type: 'COMPUTER_MOVE', index: 7, roundId: s0.roundId })
    expect(s1.outcome).toBe('draw')
    expect(s1.score.d).toBe(1)
    expect(s1.turn).toBe('computer')
  })

  it('ignores a stale computer move scheduled for a previous round (no ghost mark)', () => {
    const s0 = initialState()
    // computer "thinking" in round 0
    const duringThink = { ...s0, turn: 'computer' }
    const restarted = gameReducer(duringThink, { type: 'NEW_ROUND' })
    const stale = gameReducer(restarted, { type: 'COMPUTER_MOVE', index: 8, roundId: 0 })
    expect(stale.board).toEqual(empty())
    expect(stale.turn).toBe('human')
    expect(stale.roundId).toBe(1)
  })

  it('ignores a computer move when it is not the computer turn', () => {
    const s0 = initialState()
    const s1 = gameReducer(s0, { type: 'COMPUTER_MOVE', index: 8, roundId: s0.roundId })
    expect(s1.board[8]).toBe(EMPTY)
  })

  describe('NEW_ROUND', () => {
    it('clears the board mid-game and keeps the score', () => {
      let s = initialState()
      s = gameReducer(s, { type: 'HUMAN_MOVE', index: 0 })
      s = gameReducer(s, { type: 'COMPUTER_MOVE', index: 3, roundId: s.roundId })
      s = gameReducer(s, { type: 'HUMAN_MOVE', index: 1 })
      const scored = { ...s, score: { w: 2, l: 1, d: 3 } }
      const next = gameReducer(scored, { type: 'NEW_ROUND' })
      expect(next.board).toEqual(empty())
      expect(next.turn).toBe('human')
      expect(next.outcome).toBeNull()
      expect(next.line).toBeNull()
      expect(next.score).toEqual({ w: 2, l: 1, d: 3 })
      expect(next.roundId).toBe(scored.roundId + 1)
    })

    it('clears a finished round but keeps the tally', () => {
      const finished = { ...initialState(), outcome: 'draw', score: { w: 0, l: 0, d: 1 } }
      const next = gameReducer(finished, { type: 'NEW_ROUND' })
      expect(next.board).toEqual(empty())
      expect(next.outcome).toBeNull()
      expect(next.score.d).toBe(1)
    })
  })

  it('RESET_SCORE zeroes the tally without touching the board', () => {
    const base = gameReducer(initialState(), { type: 'HUMAN_MOVE', index: 4 })
    const playing = { ...base, score: { w: 3, l: 2, d: 1 } }
    const next = gameReducer(playing, { type: 'RESET_SCORE' })
    expect(next.score).toEqual({ w: 0, l: 0, d: 0 })
    expect(next.board[4]).toBe(HUMAN)
    expect(next.turn).toBe('computer')
  })
})
