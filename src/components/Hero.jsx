import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero({ t }) {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_40%_10%,rgba(139,92,246,0.35),transparent),radial-gradient(30%_30%_at_80%_10%,rgba(59,130,246,0.25),transparent),radial-gradient(40%_40%_at_20%_60%,rgba(249,115,22,0.25),transparent)]" />

      <div className="absolute inset-0 -z-10">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
        >
          {t.hero.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl mx-auto"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#pricing" className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl">
            {t.hero.ctaPrimary}
          </a>
          <a href="#features" className="inline-flex items-center rounded-lg bg-white/10 hover:bg-white/20 ring-1 ring-white/30 px-6 py-3 text-base font-semibold text-white">
            {t.hero.ctaSecondary}
          </a>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0b0d16]" />
    </section>
  )
}
