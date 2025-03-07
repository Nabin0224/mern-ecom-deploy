import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/adminProduct",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/adminProduct/get",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/products/get`
      
    );
    return response?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/adminProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`
    );

    return result?.data;
  }
);

const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        
        state.isLoading = false, 
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false, 
        state.productList = [];
      })
     
  },
});

export default AdminProductSlice.reducer;
