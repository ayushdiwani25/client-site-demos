import { useState } from 'react'

// Frontend-only: opens WhatsApp with the message prefilled. Swap for Formspree if the client prefers email.
export default function ContactForm({ number, goals, button = 'Send on WhatsApp' }) {
  const [name, setName] = useState('')
  const [goal, setGoal] = useState(goals[0])
  const send = (e) => {
    e.preventDefault()
    const text = `Hi, I'm ${name}. I'd like to book a free trial. My goal: ${goal}.`
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }
  const field = 'mt-1 w-full rounded-lg border border-ink/20 bg-white px-3 py-2.5'
  return (
    <form onSubmit={send} className="space-y-4">
      <label className="block text-sm font-semibold">Your name
        <input required value={name} onChange={(e) => setName(e.target.value)} className={field} />
      </label>
      <label className="block text-sm font-semibold">Your main goal
        <select value={goal} onChange={(e) => setGoal(e.target.value)} className={field}>
          {goals.map((g) => <option key={g}>{g}</option>)}
        </select>
      </label>
      <button className="btn-cta w-full rounded-lg bg-court py-3 font-semibold text-white">{button}</button>
    </form>
  )
}
