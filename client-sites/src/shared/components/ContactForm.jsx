import { useState } from 'react'

export default function ContactForm({ number, goals, button = 'Send on WhatsApp' }) {
  const [name, setName] = useState('')
  const [goal, setGoal] = useState(goals[0])

  const send = (event) => {
    event.preventDefault()
    const text = `Hi, I'm ${name}. I'd like to book a free trial. My goal: ${goal}.`
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  const field = 'mt-1.5 w-full rounded-lg border border-border bg-chalk px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-court/30 focus:border-court transition'

  return (
    <form onSubmit={send} className="space-y-4">
      <label className="block text-sm font-semibold text-ink">
        Your name
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="First name" className={field} />
      </label>
      <label className="block text-sm font-semibold text-ink">
        Your main goal
        <select value={goal} onChange={(e) => setGoal(e.target.value)} className={field}>
          {goals.map((g) => <option key={g}>{g}</option>)}
        </select>
      </label>
      <button type="submit" className="btn-cta w-full rounded-lg bg-court py-3 text-sm font-semibold text-white">
        {button}
      </button>
    </form>
  )
}

