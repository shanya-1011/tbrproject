import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const sampleMenus = [
{
_id: 'sample1',
name: 'Royal South Indian Wedding Sadhya',
category: 'Vegetarian',
pricePerPlate: 350,
description: 'Traditional banana leaf feast with 24 authentic dishes, payasam, and chips.',
image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80'
},
{
_id: 'sample2',
name: 'Grand Malabar Biryani Feast',
category: 'Non-Vegetarian',
pricePerPlate: 450,
description: 'Authentic Thalassery Dum Biryani with chicken roast, raita, pickle, and dessert.',
image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'
},
{
_id: 'sample3',
name: 'Executive Buffet & Starters Platter',
category: 'Multi-Cuisine',
pricePerPlate: 550,
description: 'Includes paneer tikka, grilled kebabs, fried rice, noodles, and live dessert counter.',
image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80'
}
];

export default function Menu() {
const [foods, setFoods] = useState(sampleMenus);
const navigate = useNavigate();

useEffect(() => {
axios.get('http://localhost:5000/api/foods')
.then((res) => {
if (res.data && res.data.length > 0) setFoods(res.data);
})
.catch(() => setFoods(sampleMenus));
}, []);

return (
<div style={{ padding: '30px', maxWidth: '1200px', margin: 'auto' }}>
<h2 style={{ marginBottom: '20px' }}>Our Catering Menus</h2>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
{foods.map((food) => (
<div key={food._id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
<img src={food.image} alt={food.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
<div style={{ padding: '15px' }}>
<span style={{ fontSize: '12px', backgroundColor: '#fef3c7', color: '#92400e', padding: '3px 8px', borderRadius: '4px' }}>{food.category}</span>
<h3 style={{ margin: '10px 0' }}>{food.name}</h3>
<p style={{ color: '#475569', fontSize: '14px' }}>{food.description}</p>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
<strong style={{ fontSize: '18px' }}>₹{food.pricePerPlate} / plate</strong>
<button onClick={() => navigate('/booking', { state: { selectedFood: food } })} style={{ backgroundColor: '#f59e0b', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Book Now</button>
</div>
</div>
</div>
))}
</div>
</div>
);
}