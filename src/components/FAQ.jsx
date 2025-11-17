import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const DEFAULTS = [
  { q: 'How does Cliqo answer calls?', a: 'Cliqo uses AI to understand intent and respond naturally, routing callers or scheduling as needed.' },
  { q: 'Is Cliqo bilingual?', a: 'Yes. English and French are supported out of the box, tailored for Quebec.' },
  { q: 'Can we integrate with our systems?', a: 'Yes. Cliqo connects to calendars, CRMs, and messaging tools via native or Zapier integrations.' },
  { q: 'What about privacy?', a: 'We follow privacy best practices and support SOC2-ready workflows.' }
]

export default function FAQ({ title = 'Frequently asked questions', items = DEFAULTS }) {
  const [open, setOpen] = useState(null)
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(35%_35%_at_10%_10%,rgba(139,92,246,0.12),transparent),radial-gradient(35%_35%_at_90%_90%,rgba(59,130,246,0.12),transparent)]" />
      <div className="relative mx-auto max-w-3xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">{title}</h2>
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="rounded-xl bg-white/5 ring-1 ring-white/10">
              <button onClick={() => setOpen(open===i?null:i)} className="w-full flex items-center justify-between px-4 py-3 text-left">
                <span className="font-semibold text-white">{it.q}</span>
                <ChevronDown className={`h-5 w-5 text-white/80 transition-transform ${open===i? 'rotate-180':''}`} />
              </button>
              {open===i && (
                <div className="px-4 pb-4 text-white/70">{it.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
