import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AuthLayout from "./components/auth/layout";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingHome from "./pages/shopping-view/home";
import CheckAuth from "./pages/common/check-auth";
import UnAuthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../store/auth-slice/index";
import PayPalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import EsewaReturnPage from "./pages/shopping-view/esewa-return";
import PaypalCancelPage from "./pages/shopping-view/payment-cancel";
import PaymentCancelPage from "./pages/shopping-view/payment-cancel";
import SearchPage from "./pages/shopping-view/search";
import ScrollToTop from "./config/scroll";

const App = () => {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <div className="text-2xl font-bold content-center">Loading...</div>;
  }

  return (
    <>
          <ScrollToTop/>
      <div className="flex flex-col ">
        <Routes>
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>

          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>

          <Route
            path="/"
            element={
            
                <ShoppingLayout />
                
              
            }
          >
            <Route path="account" element={ <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingAccount />
              </CheckAuth>} />
            <Route path="checkout" element={ <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingCheckout />
              </CheckAuth>} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="/" element={<ShoppingHome />} />
            <Route path="paypal-return" element={<PayPalReturnPage />} />
            <Route path="esewa-return" element={<EsewaReturnPage />} />
            <Route path="payment-success" element={<PaymentSuccessPage />} />
            <Route path="payment-cancel" element={<PaymentCancelPage />} />
            <Route path="search" element={<SearchPage  />} />
          </Route>
          <Route path="/unauth" element={<UnAuthPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
