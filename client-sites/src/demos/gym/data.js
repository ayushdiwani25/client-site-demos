export const WHATSAPP = '919999999999' // replace with the client's number (country code + number)
export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const base = [
  ['06:30', 'Strength Foundations', 'Riya'],
  ['08:00', 'Mobility Flow', 'Kabir'],
  ['18:00', 'HIIT Circuit', 'Arjun'],
  ['19:30', 'Barbell Club', 'Riya'],
]
export const schedule = Object.fromEntries(
  days.map((d) => [d, (d === 'Sun' ? [base[1], base[3]] : base).map(([time, name, coach]) => ({ time, name, coach }))])
)

export const plans = [
  { name: 'Starter', price: 1999, note: '8 classes a month' },
  { name: 'Standard', price: 2999, note: '16 classes a month', pick: true },
  { name: 'Unlimited', price: 4499, note: 'Every class, plus one guest pass a month' },
]

export const testimonials = [
  { name: 'Priya N.', stat: '8 kg lost in 4 months', quote: 'The coaches actually watch your form. First gym where I stuck with it past week two.' },
  { name: 'Dev K.', stat: 'Deadlift up 40 kg in a year', quote: 'Small classes mean you get real coaching, not just a playlist and a mirror.' },
  { name: 'Meera J.', stat: 'Back pain gone in 3 months', quote: 'Mobility Flow fixed things my physio visits had not. I go twice a week now.' },
]

export const gallery = [
  { id: 'floor', label: 'Main training floor', img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkC5uqB1rDccP7Suxa-9Scq-1B-G6teuZanz3e7IO4sA&s=10" },
  { id: 'barbell', label: 'Barbell Club session', img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAquGZxyHMy_skyPW5t_6bGOgzXK86qSbPiVDowyPnhg&s=10" },
  { id: 'hiit', label: 'HIIT Circuit', img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwYwlwS_igo1_6l7DGSLWTHJR60Y41UXB5SROaTnxbbg&s=10" },
  { id: 'mobility', label: 'Mobility Flow', img: "https://t4.ftcdn.net/jpg/21/82/98/33/240_F_2182983315_K4fQa7oR9vBe182iAKJTNSj12XAtiMKB.jpg" },
  { id: 'coach', label: 'Coaching a lift', img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJVh0vh4g1gv3q0XtlPzbiiD9ZReXU_jF9ZtLUWOliLw&s=10" },
  { id: 'group', label: 'Members after class', img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDyxWEqtOXVqinziVV0H_ZmIRhGzJlyNWiuvxm5aVtfw&s=10" },
]

export const faqs = [
  { q: 'Do I need experience to join?', a: 'No. Every class is coached and scaled to your level, and your first class is a free trial with no pressure to sign up.' },
  { q: 'What should I bring?', a: 'Comfortable clothes, a water bottle, and a towel. We provide all the equipment.' },
  { q: 'Can I freeze or cancel my membership?', a: 'Yes, membership can be frozen for up to 2 months a year, and monthly plans can be cancelled anytime with 7 days notice.' },
  { q: 'Is there parking?', a: 'Yes, free parking is available right outside for members.' },
]

export const story = {
  paragraph: 'Stride opened because the founders were tired of gyms built for photos, not results. Every class here is coached, capped at 12 people, and built around lifts and movements that carry into real life.',
  stats: [['8+', 'Years open'], ['450+', 'Active members'], ['1,200+', 'Classes run a year']],
}

export const address = '12 Riverside Road, Ahmedabad'
export const hours = [
  ['Mon – Fri', '6:00 am – 9:00 pm'],
  ['Saturday', '7:00 am – 6:00 pm'],
  ['Sunday', '8:00 am – 1:00 pm'],
]

export const trainers = [
  { name: 'Riya Shah', role: 'Head coach, strength', years: 9, img: "https://t3.ftcdn.net/jpg/05/62/09/28/360_F_562092860_mWJBNRqTg4rarfoJaSdkaLlfy1dkrP33.jpg" },
  { name: 'Kabir Mehta', role: 'Mobility and recovery', years: 6, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTANaYUI91qaRz0PymZcmXk6bmOpH-cJj8rq5pyVHY-wg&s=10" },
  { name: 'Arjun Patel', role: 'Conditioning', years: 7, img: "https://static.vecteezy.com/system/resources/thumbnails/051/261/055/small/person-professional-body-trainer-smile-and-standing-at-gym-photo.jpeg" },
]

export function nextClass(now = new Date()) {
  for (let off = 0; off < 8; off++) {
    const d = new Date(now)
    d.setDate(now.getDate() + off)
    const day = days[(d.getDay() + 6) % 7]
    for (const c of schedule[day]) {
      const [h, m] = c.time.split(':')
      const at = new Date(d)
      at.setHours(+h, +m, 0, 0)
      if (at > now) return { ...c, day, at }
    }
  }
}
