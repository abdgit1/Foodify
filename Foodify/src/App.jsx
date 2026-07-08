import react from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Customer/HomePage';
import RestaurantDetail from './Pages/Customer/RestaurantDetail';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import AuthModal from './Components/CommonComponents/AuthModal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants" element={<RestaurantDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
      <AuthModal />
    </Router>
  );
}

export default App;