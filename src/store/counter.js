import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const counterReducer = counterSlice.reducer

const counterDomainSelector = state => state[counterSlice.name] || initialState;

export const counterSelector = createSelector(counterDomainSelector, state => state.value);
