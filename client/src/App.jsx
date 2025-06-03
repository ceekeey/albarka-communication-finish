import { Routes, Route } from 'react-router-dom';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ManageCatigory from './pages/ManageCatigory';
import ManageStock from './pages/ManageStock';
import SelectStock from './pages/SelectStock';
import HomePage from './pages/HomePage';
import Products from './pages/Products';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/home" element={<AdminDashboard />} />
        <Route path="/admin/manage-catigory" element={<ManageCatigory />} />
        <Route path="/admin/manage-stock" element={<SelectStock />} />
        <Route path="/admin/manage-stocks/:categoryId" element={<ManageStock />} />
      </Routes>
    </>
  )
}

export default App