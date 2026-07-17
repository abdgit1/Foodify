import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { itemCount: 0 },
  reducers: {
    setCartCount(state, action) {
      state.itemCount = action.payload;
    },
    incrementCartCount(state) {
      state.itemCount += 1;
    },
    decrementCartCount(state) {
      state.itemCount = Math.max(0, state.itemCount - 1);
    },
    clearCartCount(state) {
      state.itemCount = 0;
    },
  },
});

export const { setCartCount, incrementCartCount, decrementCartCount, clearCartCount } = cartSlice.actions;
export default cartSlice.reducer;
