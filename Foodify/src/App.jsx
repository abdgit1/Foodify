import react from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Customer/HomePage';
import RestaurantDetail from './Pages/Customer/RestaurantDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants" element={<RestaurantDetail />} />

      </Routes>
    </Router>
  );
}

export default App;

