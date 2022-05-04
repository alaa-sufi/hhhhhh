import { createSlice, configureStore } from "@reduxjs/toolkit";

const couterSlice = createSlice({
  name: "counter",
  initialState: { counter: 0, showCounter: true },
  reducers: {
    increment(state) {
      state.counter++;
    },
    decement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    }
  }
});

const store = configureStore({ reducer: couterSlice.reducer });
export const counterActions = couterSlice.actions;
export default store;
