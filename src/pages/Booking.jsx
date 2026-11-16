import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Booking() {
const location = useLocation();
const navigate = useNavigate();
const food = location.state?.selectedFood;

const [eventType, setEventType] = useState('Marriage');
const [eventDate, setEventDate] = useState('');
const [eventTime, setEventTime] = useState('');
const [venueAddress, setVenueAddress] = useState('');
const [guestCount, setGuestCount] = useState(100);

const handleBooking = async (e) => {
e.preventDefault();
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const bookingData = {
eventType,
eventDate,
eventTime,
venueAddress,
guestCount: Number(guestCount),
selectedMenus: food ? [{ foodItem: food._id, name: food.name, pricePerPlate: food.pricePerPlate, quantity: guestCount, subtotal: food.pricePerPlate * guestCount }] : [],
totalAmount: food ? food.pricePerPlate * guestCount : 0
};

try {
await axios.post('http://localhost:5000/api/bookings', bookingData, {
headers: { Authorization: `Bearer ${userInfo.token}` }
});
alert('Event Booked Successfully!');
navigate('/my-bookings');
} catch (err) {
alert(err.response?.data?.message || 'Booking failed');
}
};

return (
<div style={{ padding: '40px', maxWidth: '500px', margin: 'auto' }}>
<h2>Book Your Event</h2>
{food && <p>Selected Menu: <strong>{food.name}</strong> (₹{food.pricePerPlate}/plate)</p>}
<form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
<select value={eventType} onChange={(e) => setEventType(e.target.value)}>
<option value="Marriage">Marriage</option>
<option value="Reception">Reception</option>
<option value="Birthday">Birthday Party</option>
<option value="Corporate">Corporate Event</option>
</select>
<input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
<input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} required />
<input type="text" placeholder="Venue Address" value={venueAddress} onChange={(e) => setVenueAddress(e.target.value)} required />
<input type="number" placeholder="Guest Count / Plates" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} min="10" required />
<button type="submit">Confirm Booking</button>
</form>
</div>
);
}