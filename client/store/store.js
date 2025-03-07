import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import adminProductsSlice from '../store/admin/product-slice'
import shoppingProductSlice from '../store/shop/product-slice/index'
import shoppingCartSlice from './shop/cart-slice/index'
import shoppingAddressSlice from './shop/address-slice/index'
import shoppingOrderSlice from './shop/order-slice/index'
import adminOrderSlice from './admin/order-slice/index'
import shoppingSearchSlice from './shop/search-slice/index'
import esewaOrderSlice from './shop/esewa-slice/createorder'
import featureImageSlice from './common/index'

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    shoppingProducts: shoppingProductSlice,
    shoppingCart: shoppingCartSlice,
    shoppingAddress: shoppingAddressSlice,
    shoppingOrders: shoppingOrderSlice,
    esewaOrders : esewaOrderSlice,
    adminOrders: adminOrderSlice,
    shoppingSearch: shoppingSearchSlice,
    featureImage : featureImageSlice
  },
});

export default store;
