import deepFreeze from 'deep-freeze'
import counterReducer from './counterReducer'
import { goodAction, okAction, badAction, zeroAction } from '../actions/actions'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('good is incremented', () => {
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, goodAction())
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  it('ok is incremented', () => {
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, okAction())
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  it('bad is incremented', () => {
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, badAction())
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })

    it('zero resets everything', () => {
      const state = initialState
  
      deepFreeze(state)
      const firstState = counterReducer(state, goodAction())
      const newState = counterReducer(firstState, zeroAction())
      expect(newState).toEqual({
        good: 0,
        ok: 0,
        bad: 0
      })
    })
  })
})
