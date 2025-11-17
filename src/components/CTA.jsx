export default function CTA({ t }) {
  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(30%_40%_at_50%_10%,rgba(139,92,246,0.15),transparent),radial-gradient(30%_30%_at_50%_90%,rgba(59,130,246,0.12),transparent)]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">{t.cta.title}</h2>
        <p className="mt-4 text-white/80">{t.cta.subtitle}</p>
        <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required placeholder={t.cta.name} className="rounded-lg bg-white/10 ring-1 ring-white/20 px-4 py-3 text-white placeholder:text-white/60" />
          <input required type="email" placeholder={t.cta.email} className="rounded-lg bg-white/10 ring-1 ring-white/20 px-4 py-3 text-white placeholder:text-white/60" />
          <input required placeholder={t.cta.company} className="md:col-span-2 rounded-lg bg-white/10 ring-1 ring-white/20 px-4 py-3 text-white placeholder:text-white/60" />
          <textarea required placeholder={t.cta.message} rows="4" className="md:col-span-2 rounded-lg bg-white/10 ring-1 ring-white/20 px-4 py-3 text-white placeholder:text-white/60" />
          <button className="md:col-span-2 inline-flex justify-center rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500 px-6 py-3 font-semibold text-white shadow hover:shadow-lg">{t.cta.submit}</button>
        </form>
      </div>
    </section>
  )
}
