import { Shield, MessageSquare, CalendarClock, Languages, Workflow, PhoneCall } from 'lucide-react'

export default function Features({ t }) {
  const items = [
    { icon: PhoneCall, title: t.features.items[0].title, desc: t.features.items[0].desc },
    { icon: CalendarClock, title: t.features.items[1].title, desc: t.features.items[1].desc },
    { icon: Languages, title: t.features.items[2].title, desc: t.features.items[2].desc },
    { icon: MessageSquare, title: t.features.items[3].title, desc: t.features.items[3].desc },
    { icon: Shield, title: t.features.items[4].title, desc: t.features.items[4].desc },
    { icon: Workflow, title: t.features.items[5].title, desc: t.features.items[5].desc },
  ]

  return (
    <section id="features" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_80%_0%,rgba(139,92,246,0.15),transparent),radial-gradient(26%_26%_at_20%_80%,rgba(59,130,246,0.12),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">{t.features.title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, title, desc }, idx) => (
            <div key={idx} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6 backdrop-blur hover:bg-white/10 transition-colors">
              <Icon className="h-6 w-6 text-white" />
              <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-white/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
