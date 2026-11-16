import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { login } = useContext(AuthContext);
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();
try {
await login(email, password);
navigate('/menu');
} catch (err) {
alert(err.response?.data?.message || 'Login failed');
}
};

return (
<div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }}>
<h2>TBR Catering - Login</h2>
<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
<button type="submit">Login</button>
</form>
<p>Don't have an account? <Link to="/register">Register here</Link></p>
</div>
);
}