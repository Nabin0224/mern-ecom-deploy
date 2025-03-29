import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    customOrderList : []
    
}

export const createOrder = createAsyncThunk("/customOrder/createOrder", async(formData)=> {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/customorders/createCustomOrder`,
        {
            formData,
        }

    )
    return response.data
})

const customOrderSlice = createSlice({
    name: "adminCustomOrderSlice",
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(createOrder.pending, (state) => {
           state.isLoading = true
        }).addCase(createOrder.fulfilled, (state, action) => {
           state.isLoading = false,
           console.log("Redux custom order Fullfilled", action.payload)
        
        }).addCase(createOrder.rejected, (state) => {
           state.isLoading = false
         
       
        })
}
}
)



export default customOrderSlice.reducer;