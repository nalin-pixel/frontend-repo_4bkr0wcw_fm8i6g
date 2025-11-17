import { motion } from 'framer-motion'
import { Sparkles, PhoneCall, Clock, ShieldCheck } from 'lucide-react'

const statItems = [
  { icon: PhoneCall, value: '2M+', label: 'calls handled' },
  { icon: Clock, value: '24/7', label: 'availability' },
  { icon: ShieldCheck, value: 'SOC2', label: 'ready workflows' },
  { icon: Sparkles, value: '95%', label: 'CSAT uplift' }
]

export default function Stats() {
  return (
    <section className="relative py-14">
      <div className="absolute inset-0 bg-[radial-gradient(35%_35%_at_20%_20%,rgba(139,92,246,0.12),transparent),radial-gradient(35%_35%_at_80%_80%,rgba(59,130,246,0.12),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 text-center backdrop-blur"
            >
              <Icon className="mx-auto h-6 w-6 text-white/90" />
              <div className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight text-white">{value}</div>
              <div className="text-sm text-white/70">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
