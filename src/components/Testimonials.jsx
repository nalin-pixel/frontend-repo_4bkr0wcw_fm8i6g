import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: 'Cliqo transformed our call handling — customers reach the right person instantly.',
    author: 'Sophie L.',
    role: 'COO, Dental Group, Montreal'
  },
  {
    quote: 'Bilingual support out of the box was a game changer for our Quebec operations.',
    author: 'Marc-André T.',
    role: 'VP Ops, Logistics'
  },
  {
    quote: 'Scheduling automation reduced no‑shows by 30% in the first month.',
    author: 'Chantal B.',
    role: 'Clinic Manager'
  }
]

export default function Testimonials({ title = 'What customers say' }) {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(35%_35%_at_80%_10%,rgba(139,92,246,0.12),transparent),radial-gradient(35%_35%_at_20%_90%,rgba(59,130,246,0.12),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">{title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 backdrop-blur"
            >
              <div className="flex items-center gap-1 text-amber-300">
                {[...Array(5)].map((_, s) => <Star key={s} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-white/80">“{t.quote}”</p>
              <div className="mt-6 text-white font-semibold">{t.author}</div>
              <div className="text-white/60 text-sm">{t.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
