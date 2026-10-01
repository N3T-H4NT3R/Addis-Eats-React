import React from 'react'
import Layout from './Components/Layout'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import ErrorBoundary from './Components/ErrorBoundary'
import Menu from './Pages/Menu/Menu'
import DishDetails from './Pages/DishDetails/DishDetails'
import Cart from './Pages/Cart/Cart'
import Favorites from './Pages/Favorites/Favorites'
import Checkout from './Pages/Checkout/Checkout'
import Orders from './Pages/Orders/Orders'
import RequireAuth from './auth/RequireAuth'
import Login from './Pages/Login/Login'
import AdminLogin from './admin/AdminLogin/AdminLogin'
import RequireAdmin from './admin/RequireAdmin'
import Dashboard from './admin/Dashboard/Dashboard'
import AdminLayout from './AdminLayout/AdminLayout'
import OrderManager from './admin/OrderManagement/OrderManager'
import DishManager from './admin/DishManager/DishManager'
import NotFound from './Pages/NotFound/NotFound'



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>

        <Route index element={<ErrorBoundary pageName=" > Home Page">
          <Home/>
        </ErrorBoundary>} />

        <Route path='*' element={<ErrorBoundary pageName=" > NotFound Page">
          <NotFound/>
        </ErrorBoundary>} />

        <Route path='/menu' element={<ErrorBoundary pageName=" > Menu Page">
          <Menu/>
        </ErrorBoundary>} />

        <Route path='/menu/:id' element={<ErrorBoundary pageName=" > DishList Page">
          <DishDetails/>
        </ErrorBoundary>} />

        <Route path='/cart' element={<ErrorBoundary pageName=" > DishList Page">
          <Cart/>
        </ErrorBoundary>} />

        <Route element={<RequireAuth/>}>
          <Route path='/favorites' element={<ErrorBoundary pageName=" > Favorites Page">
            <Favorites/>
          </ErrorBoundary>} />

          <Route path='/checkout' element={<ErrorBoundary pageName=" > Checkout Page">
            <Checkout/>
          </ErrorBoundary>} />
        </Route>


        <Route path='/orders' element={<ErrorBoundary pageName=" > Orders Page">
          <Orders/>
        </ErrorBoundary>} />

        <Route path='/login' element={<ErrorBoundary pageName=" > Login Page">
          <Login/>
        </ErrorBoundary>} />

        <Route path='/admin/login' element={<ErrorBoundary pageName=" > Admin Login Page">
          <AdminLogin/>
        </ErrorBoundary>} />

        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<AdminLayout />}>

            <Route
              index
              element={
                <ErrorBoundary pageName=" > Admin Dashboard Page">
                  <Dashboard />
                </ErrorBoundary>
              }
            />

            <Route
              path="menus"
              element={
                <ErrorBoundary pageName=" > Admin Menu Page">
                  <DishManager />
                </ErrorBoundary>
              }
            />

            <Route
              path="orders"
              element={
                <ErrorBoundary pageName=" > Orders Page">
                  <OrderManager />
                </ErrorBoundary>
              }
            />

          </Route>
        </Route>

      </Route>
    </Routes>
  )
}

export default App