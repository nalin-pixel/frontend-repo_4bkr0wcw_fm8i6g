import { motion } from 'framer-motion'
import { Calendar, Mail, MessageSquare, Phone, Cog } from 'lucide-react'

const integrations = [
  { icon: Calendar, name: 'Google Calendar' },
  { icon: Calendar, name: 'Outlook' },
  { icon: Mail, name: 'Gmail' },
  { icon: MessageSquare, name: 'Slack' },
  { icon: Phone, name: 'Twilio' },
  { icon: Cog, name: 'Zapier' },
]

export default function Integrations({ title = 'Works with your stack' }) {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(35%_35%_at_50%_10%,rgba(139,92,246,0.12),transparent),radial-gradient(35%_35%_at_50%_90%,rgba(59,130,246,0.12),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {integrations.map(({ icon: Icon, name }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              viewport={{ once: true }}
              className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4 text-center backdrop-blur hover:bg-white/10"
            >
              <Icon className="mx-auto h-6 w-6 text-white" />
              <div className="mt-2 text-sm text-white/80">{name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
