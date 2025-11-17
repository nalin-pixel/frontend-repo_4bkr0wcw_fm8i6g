import { useEffect, useState } from 'react'
import { Globe2, Menu, X } from 'lucide-react'

export default function Navbar({ lang, setLang, t }) {
  const [open, setOpen] = useState(false)
  const [health, setHealth] = useState('checking')

  useEffect(() => {
    const check = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/test`)
        setHealth(res.ok ? 'ok' : 'down')
      } catch (e) {
        setHealth('down')
      }
    }
    check()
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between rounded-xl backdrop-blur supports-[backdrop-filter]:bg-white/10 bg-white/60 dark:bg-black/30 ring-1 ring-white/20 mt-4 px-4">
          <a href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-purple-500 via-blue-500 to-orange-500" />
            <span className="text-lg font-semibold tracking-tight">Cliqo</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a>
            <a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a>
            <a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a>
            <span className={`text-xs px-2 py-1 rounded-full ring-1 ${health==='ok' ? 'ring-emerald-400 text-emerald-300 bg-emerald-400/10' : health==='checking' ? 'ring-yellow-400 text-yellow-300 bg-yellow-400/10' : 'ring-rose-400 text-rose-300 bg-rose-400/10'}`}>
              {health==='ok' ? t.status.ok : health==='checking' ? t.status.checking : t.status.down}
            </span>
            <button onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="inline-flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/20 px-3 py-1.5 ring-1 ring-white/20">
              <Globe2 className="h-4 w-4" />
              <span>{lang === 'en' ? 'FR' : 'EN'}</span>
            </button>
            <a href="#contact" className="inline-flex items-center rounded-md bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500 px-4 py-2 font-medium shadow-lg hover:shadow-xl transition-shadow">
              {t.nav.cta}
            </a>
          </nav>

          <button className="md:hidden inline-flex items-center p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-2 rounded-xl backdrop-blur supports-[backdrop-filter]:bg-white/10 bg-white/60 dark:bg-black/30 ring-1 ring-white/20 px-4 py-3 space-y-3">
            <a href="#features" className="block" onClick={()=>setOpen(false)}>{t.nav.features}</a>
            <a href="#pricing" className="block" onClick={()=>setOpen(false)}>{t.nav.pricing}</a>
            <a href="#contact" className="block" onClick={()=>setOpen(false)}>{t.nav.contact}</a>
            <div className="flex items-center justify-between pt-2">
              <span className={`text-xs px-2 py-1 rounded-full ring-1 ${health==='ok' ? 'ring-emerald-400 text-emerald-300 bg-emerald-400/10' : health==='checking' ? 'ring-yellow-400 text-yellow-300 bg-yellow-400/10' : 'ring-rose-400 text-rose-300 bg-rose-400/10'}`}>
                {health==='ok' ? t.status.ok : health==='checking' ? t.status.checking : t.status.down}
              </span>
              <button onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="inline-flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/20 px-3 py-1.5 ring-1 ring-white/20">
                <Globe2 className="h-4 w-4" />
                <span>{lang === 'en' ? 'FR' : 'EN'}</span>
              </button>
            </div>
            <a href="#contact" onClick={()=>setOpen(false)} className="block text-center rounded-md bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500 px-4 py-2 font-medium shadow-lg">{t.nav.cta}</a>
          </div>
        )}
      </div>
    </header>
  )
}
