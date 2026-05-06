import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    return data.map((item) => ({
      ...item,
      stock: Math.floor(Math.random() * 16),
    }));
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
  },
    reducers: {
    decreaseStock: (state, action) => {
        const product = state.items.find(p => p.id === action.payload);
        if (product && product.stock > 0) {
        product.stock--;
        }
    },

    increaseStock: (state, action) => {
        const product = state.items.find(p => p.id === action.payload);
        if (product) {
        product.stock++;
        }
    },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
        });
    },
});

export const { decreaseStock, increaseStock } = productSlice.actions;
export default productSlice.reducer;