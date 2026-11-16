import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import ProtectedRoute from './component/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
return (
<AuthProvider>
<Router>
<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
<Navbar />
<div style={{ flex: 1 }}>
<Routes>
<Route path="/" element={<Navigate to="/menu" />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/menu" element={<Menu />} />
<Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
<Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
<Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
</Routes>
</div>
<Footer />
</div>
</Router>
</AuthProvider>
);
}