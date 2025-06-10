import { Routes, Route } from 'react-router-dom';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ManageCatigory from './pages/ManageCatigory';
import ManageStock from './pages/ManageStock';
import SelectStock from './pages/SelectStock';
import AdminContact from './pages/AdminContact';
import HomePage from './pages/HomePage';
import Products from './pages/Products';
import AdminManageWebsite from './pages/AdminManageWebsite';
import AdminBanners from './pages/AdminBanners';

import PrivateRoute from './context/PrivateRoute';
import ManageContact from './pages/ManageContact';
import ShopLoginPage from './pages/ShopLogin';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop-login/:id" element={<ShopLoginPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/:id" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login/:id" element={<Login />} />
        {/* private routes */}
        <Route
          path="/admin/home"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/manage-website"
          element={
            <PrivateRoute>
              <AdminManageWebsite />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/contact"
          element={
            <PrivateRoute>
              <AdminContact />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/manage-banners"
          element={
            <PrivateRoute>
              <AdminBanners />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/manage-contact"
          element={
            <PrivateRoute>
              <ManageContact />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/manage-catigory"
          element={
            <PrivateRoute>
              <ManageCatigory />
            </PrivateRoute>

          }
        />
        <Route
          path="/admin/manage-stock"
          element={
            <PrivateRoute>
              <SelectStock />
            </PrivateRoute>

          }
        />
        <Route
          path="/admin/manage-stocks/:categoryId" element={
            <PrivateRoute>
              <ManageStock />
            </PrivateRoute>

          } />
      </Routes>
    </>
  )
}

export default App