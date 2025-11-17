import { useEffect, useMemo, useRef, useState } from 'react'
import { Send, Sparkles, Bot, User, Loader2 } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Demo({ lang = 'en', t }) {
  const [session, setSession] = useState(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const scrollRef = useRef(null)

  const placeholders = useMemo(() => ({
    en: 'Type a question… e.g., “Can I book a demo for Friday?”',
    fr: 'Posez une question… p. ex. « Puis‑je réserver une démo vendredi? »'
  }), [])

  useEffect(() => {
    // auto-start session on mount
    const start = async () => {
      try {
        const res = await fetch(`${API_BASE}/demo/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'Website Visitor', company: 'Cliqo Demo', lang })
        })
        const data = await res.json()
        setSession(data.session_id)
        setMessages([{ role: 'assistant', text: data.greeting }])
      } catch (e) {
        setMessages([{ role: 'assistant', text: t.demo.error }])
      }
    }
    start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  useEffect(() => {
    // auto scroll to bottom
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text) => {
    if (!text?.trim() || !session) return
    const userText = text.trim()
    setMessages((m) => [...m, { role: 'user', text: userText }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/demo/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: session, text: userText, lang })
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', text: data.reply, suggestions: data.suggestions }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', text: t.demo.error }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <section id="demo" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(30%_40%_at_10%_20%,rgba(139,92,246,0.12),transparent),radial-gradient(30%_30%_at_90%_80%,rgba(59,130,246,0.10),transparent)]" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/30 ring-1 ring-white/15">
            <Sparkles className="h-5 w-5 text-purple-300" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t.demo.title}</h2>
        </div>
        <p className="mt-3 text-white/70 max-w-3xl">{t.demo.subtitle}</p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
              <div className="h-[420px] overflow-y-auto p-4 space-y-4" style={{scrollbarWidth:'thin'}}>
                {messages.map((m, i) => (
                  <div key={i} className={`flex items-start gap-3 ${m.role==='user' ? 'justify-end' : ''}`}>
                    {m.role === 'assistant' && (
                      <div className="mt-1 shrink-0 rounded-md bg-purple-500/20 p-2 ring-1 ring-white/10">
                        <Bot className="h-4 w-4 text-purple-300" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${m.role==='user' ? 'bg-blue-500/20 ring-1 ring-blue-300/20' : 'bg-white/10 ring-1 ring-white/10'}`}>
                      {m.text}
                      {Array.isArray(m.suggestions) && m.suggestions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {m.suggestions.map((s, idx) => (
                            <button key={idx} onClick={() => send(s)} className="rounded-full bg-white/10 hover:bg-white/15 px-3 py-1 text-xs text-white/90 ring-1 ring-white/15 transition">{s}</button>
                          ))}
                        </div>
                      )}
                    </div>
                    {m.role === 'user' && (
                      <div className="mt-1 shrink-0 rounded-md bg-blue-500/20 p-2 ring-1 ring-white/10">
                        <User className="h-4 w-4 text-blue-200" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t.demo.typing}</span>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
              <div className="border-t border-white/10 p-3">
                <div className="flex items-end gap-3">
                  <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder={placeholders[lang]}
                    className="flex-1 resize-none rounded-lg bg-white/10 px-3 py-2 text-white placeholder:text-white/50 ring-1 ring-white/15 focus:outline-none focus:ring-white/25"
                  />
                  <button onClick={() => send(input)} disabled={loading || !input.trim()} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500 px-4 py-2 font-medium text-white shadow disabled:opacity-50">
                    <Send className="h-4 w-4" />
                    {t.demo.send}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-4">
            <Card title={t.demo.capabilitiesTitle}>
              <ul className="list-disc pl-5 text-sm text-white/80 space-y-2">
                <li>{t.demo.capabilities[0]}</li>
                <li>{t.demo.capabilities[1]}</li>
                <li>{t.demo.capabilities[2]}</li>
                <li>{t.demo.capabilities[3]}</li>
              </ul>
            </Card>
            <Card title={t.demo.promptsTitle}>
              <div className="flex flex-wrap gap-2">
                {t.demo.prompts.map((p, i) => (
                  <button key={i} onClick={() => send(p)} className="rounded-full bg-white/10 hover:bg-white/15 px-3 py-1 text-xs text-white/90 ring-1 ring-white/15 transition">{p}</button>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      {children}
    </div>
  )
}
