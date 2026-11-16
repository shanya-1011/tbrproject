import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
const [bookings, setBookings] = useState([]);

useEffect(() => {
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
axios.get('http://localhost:5000/api/bookings/admin/all', {
headers: { Authorization: `Bearer ${userInfo.token}` }
})
.then((res) => setBookings(res.data))
.catch((err) => console.error(err));
}, []);

return (
<div style={{ padding: '20px' }}>
<h2>Admin Dashboard - All Orders</h2>
<table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
<thead>
<tr>
<th>User</th>
<th>Event Type</th>
<th>Date</th>
<th>Guests</th>
<th>Total Amount</th>
<th>Status</th>
</tr>
</thead>
<tbody>
{bookings.map((b) => (
<tr key={b._id}>
<td>{b.user?.name} ({b.user?.email})</td>
<td>{b.eventType}</td>
<td>{b.eventDate}</td>
<td>{b.guestCount}</td>
<td>₹{b.totalAmount}</td>
<td>{b.bookingStatus}</td>
</tr>
))}
</tbody>
</table>
</div>
);
}