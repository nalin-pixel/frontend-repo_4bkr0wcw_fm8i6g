export default function Pricing({ t }) {
  const tiers = [
    { name: t.pricing.tiers[0].name, price: 'CA$149', period: t.pricing.tiers[0].period, features: t.pricing.tiers[0].features },
    { name: t.pricing.tiers[1].name, price: 'CA$399', period: t.pricing.tiers[1].period, features: t.pricing.tiers[1].features, highlight: true },
    { name: t.pricing.tiers[2].name, price: t.pricing.tiers[2].price, period: t.pricing.tiers[2].period, features: t.pricing.tiers[2].features },
  ]

  return (
    <section id="pricing" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(30%_30%_at_10%_20%,rgba(139,92,246,0.15),transparent),radial-gradient(26%_26%_at_90%_80%,rgba(59,130,246,0.12),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">{t.pricing.title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => (
            <div key={idx} className={`rounded-2xl p-6 ring-1 ring-white/10 backdrop-blur ${tier.highlight ? 'bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-orange-500/20' : 'bg-white/5'}`}>
              <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                <span className="text-white/70">{tier.period}</span>
              </div>
              <ul className="mt-6 space-y-2 text-white/80 text-sm">
                {tier.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 inline-block w-full text-center rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500 px-4 py-2 font-semibold text-white shadow hover:shadow-lg">{t.pricing.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
