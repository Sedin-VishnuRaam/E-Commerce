import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);

      if (existing) {
        if (existing.quantity < item.stock) {
          existing.quantity++;
        }
      } else {
        if (item.stock > 0) {
          state.items.push({ ...item, quantity: 1 });
        }
      }
    },
    removeFromCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      item.stock += item.quantity;
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    increaseQty: (state, action) => {
    const item = state.items.find((i) => i.id === action.payload);
    if (item && item.quantity < item.stock) {
      item.quantity++;
      item.stock--;
    }
  },

  decreaseQty: (state, action) => {
    const item = state.items.find((i) => i.id === action.payload);
    if (item && item.quantity > 1) {
      item.quantity--;
      item.stock++;
    }
  },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;