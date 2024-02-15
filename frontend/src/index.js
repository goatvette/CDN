import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import store from './store';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
//import { GoogleOAuthProvider } from '@react-oauth/google';
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const ProductScreen = lazy(() => import('./screens/ProductScreen'));
const CartScreen = lazy(() => import('./screens/CartScreen'));
const LoginScreen = lazy(() => import('./screens/LoginScreen'));
const RegisterScreen = lazy(() => import('./screens/RegisterScreen'));
const ShippingScreen = lazy(() => import('./screens/ShippingScreen'));
const PaymentScreen = lazy(() => import('./screens/PaymentScreen'));
const PlaceOrderScreen = lazy(() => import('./screens/PlaceOrderScreen'));
const OrderScreen = lazy(() => import('./screens/OrderScreen'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen'));
const OrderListScreen = lazy(() => import('./screens/admin/OrderListScreen'));
const ProductListScreen = lazy(() => import('./screens/admin/ProductListScreen'));
const ProductEditScreen = lazy(() => import('./screens/admin/ProductEditScreen'));
const UserListScreen = lazy(() => import('./screens/admin/UserListScreen'));
const UserEditScreen = lazy(() => import('./screens/admin/UserEditScreen'));
const PrintsScreen = lazy(() => import('./screens/PrintsScreen'));
const CanvasScreen = lazy(() => import('./screens/CanvasScreen'));
const AboutScreen = lazy(() => import('./screens/AboutScreen'));
const ContactScreen = lazy(() => import('./screens/ContactScreen'));
const Stripe = lazy(() => import('./screens/Stripe'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route
        index={true}
        path='/'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <HomeScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/search/:keyword'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <HomeScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/page/:pageNumber'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <HomeScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/search/:keyword/page/:pageNumber'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <HomeScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/prints'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <PrintsScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/canvas'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <CanvasScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/product/:id'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <ProductScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/cart'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <CartScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/login'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <LoginScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/register'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <RegisterScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/about'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <AboutScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/contact-us'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <ContactScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/shipping'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <ShippingScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/payment'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <PaymentScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/placeorder'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <PlaceOrderScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/order/:id'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <OrderScreen />
          </React.Suspense>
        }
      />
      <Route
        path='/order/:id/pay-online'
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <Stripe />
          </React.Suspense>
        }
      />
      {/* Registered users */}
      <Route
        path=''
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <PrivateRoute />
          </React.Suspense>
        }
      >
        <Route
          path='/profile'
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <ProfileScreen />
            </React.Suspense>
          }
        />
      </Route>
      {/* Admin users */}
      <Route
        path=''
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <AdminRoute />
          </React.Suspense>
        }
      >
        <Route
          path='/admin/orderlist'
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <OrderListScreen />
            </React.Suspense>
          }
        />
        <Route
          path='/admin/productlist'
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <ProductListScreen />
            </React.Suspense>
          }
        />
        <Route
          path='/admin/productlist/:pageNumber'
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <ProductListScreen />
            </React.Suspense>
          }
        />
        <Route
          path='/admin/userlist'
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <UserListScreen />
            </React.Suspense>
          }
        />
        <Route
          path='/admin/product/:id/edit'
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <ProductEditScreen />
            </React.Suspense>
          }
        />
        <Route
          path='/admin/user/:id/edit'
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <UserEditScreen />
            </React.Suspense>
          }
        />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <HelmetProvider>
        <Provider store={store}>
          <PayPalScriptProvider deferLoading={true}>
            <RouterProvider router={router}>
              <Suspense fallback={<div>Loading...</div>}>
                <App />
              </Suspense>
            </RouterProvider>
          </PayPalScriptProvider>
        </Provider>
      </HelmetProvider>
    </React.StrictMode>
);

reportWebVitals();
