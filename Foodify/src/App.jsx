import react from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Customer/HomePage';
import RestaurantDetail from './Pages/Customer/RestaurantDetail';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import AuthModal from './Components/CommonComponents/AuthModal';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminRoute from './Components/AdminComponents/AdminRoute';
import CategoryDetail from './Pages/Customer/CategoryDetail';
import DealDetail from './Pages/Customer/DealDetail';
import Cart from './Pages/Customer/Cart';
import CheckoutPage from './Pages/Customer/CheckoutPage';
import TrackOrder from './Pages/Customer/TrackOrder';
import NotFoundPage from './Pages/Common/NotFoundPage';
import ErrorPage from './Pages/Common/ErrorPage';
import SimulateErrorPage from './Pages/Common/SimulateErrorPage';
import ErrorBoundary from './Components/CommonComponents/ErrorBoundary';


function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          {/* Customer-facing routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/orders/track" element={<TrackOrder />} />
          <Route path="/deals/:id" element={<DealDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Admin dashboard — uses its own layout (no Navbar/Footer) */}
          <Route path="/admin-dashboard/*" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />

          {/* Error and Not Found routes */}
          <Route path="/simulate-error" element={<SimulateErrorPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Auth modal lives outside Routes so it overlays any page */}
        <AuthModal />
      </ErrorBoundary>
    </Router>
  );
}

export default App;