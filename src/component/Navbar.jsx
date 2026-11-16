import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
const { user, logout } = useContext(AuthContext);
const navigate = useNavigate();

const handleLogout = () => {
logout();
navigate('/login');
};

return (
<nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: '#1e293b', color: '#fff' }}>
<Link to="/menu" style={{ color: '#f59e0b', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>
TBR Catering & Events
</Link>
<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
{user ? (
<>
<Link to="/menu" style={{ color: '#fff', textDecoration: 'none' }}>Menu</Link>
<Link to="/booking" style={{ color: '#fff', textDecoration: 'none' }}>Book Event</Link>
<Link to="/my-bookings" style={{ color: '#fff', textDecoration: 'none' }}>My Orders</Link>
{user.role === 'admin' && (
<Link to="/admin" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>Admin Panel</Link>
)}
<span style={{ color: '#94a3b8' }}>Hi, {user.name}</span>
<button onClick={handleLogout} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
</>
) : (
<>
<Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
<Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
</>
)}
</div>
</nav>
);
}