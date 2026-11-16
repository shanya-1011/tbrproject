import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyBookings() {
const [bookings, setBookings] = useState([]);

useEffect(() => {
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
if (userInfo?.token) {
axios.get('http://localhost:5000/api/bookings/my-bookings', {
headers: { Authorization: `Bearer ${userInfo.token}` }
})
.then((res) => setBookings(res.data))
.catch((err) => console.error(err));
}
}, []);

return (
<div style={{ padding: '30px', maxWidth: '900px', margin: 'auto' }}>
<h2>My Event Bookings</h2>
{bookings.length === 0 ? (
<p>You have not booked any events yet.</p>
) : (
<div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
{bookings.map((b) => (
<div key={b._id} style={{ border: '1px solid #cbd5e1', padding: '15px', borderRadius: '8px' }}>
<h3>{b.eventType} — {b.eventDate} at {b.eventTime}</h3>
<p><strong>Venue:</strong> {b.venueAddress}</p>
<p><strong>Guests / Plates:</strong> {b.guestCount}</p>
<p><strong>Total Amount:</strong> ₹{b.totalAmount}</p>
<p><strong>Status:</strong> {b.bookingStatus}</p>
</div>
))}
</div>
)}
</div>
);
}