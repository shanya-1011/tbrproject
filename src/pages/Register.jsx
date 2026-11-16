import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { register } = useContext(AuthContext);
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();
try {
await register(name, email, password);
navigate('/menu');
} catch (err) {
alert(err.response?.data?.message || 'Registration failed');
}
};

return (
<div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }}>
<h2>TBR Catering - Register</h2>
<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
<input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
<button type="submit">Register</button>
</form>
<p>Already have an account? <Link to="/login">Login here</Link></p>
</div>
);
}