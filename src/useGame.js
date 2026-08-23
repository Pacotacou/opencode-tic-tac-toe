import { useReducer, useEffect } from 'react'
import { EMPTY, HUMAN, COMPUTER, winner, applyMove, isFull } from './game/logic.js'
import { bestMove } from './game/minimax.js'

export const THINKING_MS = 600

export function initialState() {
  return {
    board: Array(9).fill(EMPTY),
    turn: 'human',
    outcome: null,
    line: null,
    score: { w: 0, l: 0, d: 0 },
    roundId: 0,
  }
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'HUMAN_MOVE':
      return humanMove(state, action.index)
    case 'COMPUTER_MOVE':
      return computerMove(state, action.index, action.roundId)
    case 'NEW_ROUND':
      return freshRound(state)
    case 'RESET_SCORE':
      return { ...state, score: { w: 0, l: 0, d: 0 } }
    default:
      return state
  }
}

function freshRound(state) {
  return {
    ...state,
    board: Array(9).fill(EMPTY),
    turn: 'human',
    outcome: null,
    line: null,
    roundId: state.roundId + 1,
  }
}

function humanMove(state, index) {
  if (state.turn !== 'human' || state.outcome !== null) return state
  const board = applyMove(state.board, index, HUMAN)
  if (board === state.board) return state

  const result = winner(board)
  if (result) {
    return {
      ...state,
      board,
      outcome: 'human',
      line: result.line,
      score: { ...state.score, w: state.score.w + 1 },
    }
  }
  if (isFull(board)) {
    return { ...state, board, outcome: 'draw', score: { ...state.score, d: state.score.d + 1 } }
  }
  return { ...state, board, turn: 'computer' }
}

function computerMove(state, index, roundId) {
  if (state.turn !== 'computer' || state.outcome !== null) return state
  // stale-move guard: ignore responses scheduled for an earlier round
  if (roundId !== state.roundId) return state
  const board = applyMove(state.board, index, COMPUTER)
  if (board === state.board) return state

  const result = winner(board)
  if (result) {
    return {
      ...state,
      board,
      outcome: 'computer',
      line: result.line,
      score: { ...state.score, l: state.score.l + 1 },
    }
  }
  if (isFull(board)) {
    return { ...state, board, outcome: 'draw', score: { ...state.score, d: state.score.d + 1 } }
  }
  return { ...state, board, turn: 'human' }
}

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, undefined, initialState)

  useEffect(() => {
    if (state.turn !== 'computer' || state.outcome !== null) return undefined
    const roundId = state.roundId
    const timer = setTimeout(() => {
      dispatch({ type: 'COMPUTER_MOVE', index: bestMove(state.board), roundId })
    }, THINKING_MS)
    return () => clearTimeout(timer)
  }, [state.turn, state.outcome, state.roundId, state.board])

  const playHuman = (index) => dispatch({ type: 'HUMAN_MOVE', index })
  const newRound = () => dispatch({ type: 'NEW_ROUND' })
  const resetScore = () => dispatch({ type: 'RESET_SCORE' })

  return { state, playHuman, newRound, resetScore }
}
