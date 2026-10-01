export const WHATSAPP = import.meta.env.VITE_WHATSAPP_NO

export const heroImage = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=88'

// price is in lakh (100 lakh = 1 crore)
export const listings = [
  { id: 'sg', name: 'The Sky Garden Residence', area: 'Prahlad Nagar', city: 'Ahmedabad', type: 'Penthouse', price: 420, beds: 4, baths: 5, sqft: 4100, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85' },
  { id: 'rv', name: 'Riverfront Terrace Villa', area: 'Sabarmati', city: 'Ahmedabad', type: 'Villa', price: 310, beds: 5, baths: 5, sqft: 5200, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85' },
  { id: 'am', name: 'Amber Court Apartment', area: 'Kalawad Road', city: 'Rajkot', type: 'Apartment', price: 118, beds: 3, baths: 3, sqft: 1950, image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85' },
  { id: 'hl', name: 'Halcyon Bungalow', area: 'Race Course', city: 'Rajkot', type: 'Bungalow', price: 265, beds: 4, baths: 4, sqft: 4600, image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85' },
  { id: 'vs', name: 'Vesta Sky Apartment', area: 'Vesu', city: 'Surat', type: 'Apartment', price: 156, beds: 3, baths: 3, sqft: 2200, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww' },
  { id: 'gl', name: 'Grove Lane Villa', area: 'Alkapuri', city: 'Vadodara', type: 'Villa', price: 205, beds: 4, baths: 4, sqft: 3800, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmlsbGF8ZW58MHx8MHx8fDA%3D' },
]

export const types = ['All', 'Apartment', 'Villa', 'Penthouse', 'Bungalow']
export const cities = ['All cities', 'Ahmedabad', 'Rajkot', 'Surat', 'Vadodara']

export const services = [
  ['Buy', 'Private viewings, legal checks and negotiation handled by one advisor from shortlist to registry.'],
  ['Sell', 'Pricing from real comparable sales, styled photography and only serious, verified buyers.'],
  ['Rent and manage', 'Tenant screening, rent collection and upkeep for owners who live elsewhere.'],
]

export const intents = ['Buy a home', 'Sell my property', 'Rent or lease', 'Invest']
export const budgets = ['Under ₹1 crore', '₹1–2.5 crore', '₹2.5–5 crore', 'Above ₹5 crore']

export const price = (lakh) => (lakh >= 100 ? `₹${parseFloat((lakh / 100).toFixed(2))} crore` : `₹${lakh} lakh`)
