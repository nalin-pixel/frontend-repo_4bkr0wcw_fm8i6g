import { useEffect, useMemo, useRef, useState } from 'react'
import { Send, Sparkles, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX, PhoneCall, Mail } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Demo({ lang = 'en', t }) {
  const [session, setSession] = useState(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [listening, setListening] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const scrollRef = useRef(null)
  const recognitionRef = useRef(null)

  const placeholders = useMemo(() => ({
    en: 'Type a question… e.g., “Can I book a demo for Friday?”',
    fr: 'Posez une question… p. ex. « Puis‑je réserver une démo vendredi? »'
  }), [])

  // Feature detection for Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setSpeechSupported(true)
      const rec = new SpeechRecognition()
      rec.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
      rec.interimResults = false
      rec.maxAlternatives = 1
      rec.onresult = (e) => {
        const text = e.results[0][0].transcript
        setInput(text)
        // auto send after capture
        setTimeout(() => send(text), 100)
      }
      rec.onend = () => setListening(false)
      recognitionRef.current = rec
    }
  }, [lang])

  // auto-start session on mount
  useEffect(() => {
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
        // analytics
        void postEvent('frontend_session_start', { lang })
      } catch (e) {
        setMessages([{ role: 'assistant', text: t.demo.error }])
      }
    }
    start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  // auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    const last = messages[messages.length - 1]
    if (voiceEnabled && last?.role === 'assistant' && last?.text) {
      speak(last.text)
    }
  }, [messages])

  const postEvent = async (type, data) => {
    if (!session) return
    try {
      await fetch(`${API_BASE}/demo/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: session, type, data })
      })
    } catch {}
  }

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return
    try {
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utter)
      void postEvent('tts_played', { chars: text.length })
    } catch {}
  }

  const startMic = () => {
    if (!recognitionRef.current) return
    try {
      recognitionRef.current.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
      recognitionRef.current.start()
      setListening(true)
      void postEvent('mic_start')
    } catch {}
  }

  const stopMic = () => {
    try { recognitionRef.current?.stop() } catch {}
    setListening(false)
    void postEvent('mic_stop')
  }

  const send = async (text) => {
    if (!text?.trim() || !session) return
    const userText = text.trim()
    setMessages((m) => [...m, { role: 'user', text: userText }])
    setInput('')
    setLoading(true)
    void postEvent('message_sent', { length: userText.length })
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

  // Quick booking helpers
  const isoAt = (d) => d.toISOString()
  const slotTomorrow2pm = () => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    d.setHours(14, 0, 0, 0)
    return isoAt(d)
  }
  const slotFridayMorning = () => {
    const d = new Date()
    const day = d.getDay() // 0 Sun .. 6 Sat
    const delta = (5 - day + 7) % 7 || 7 // next Friday
    d.setDate(d.getDate() + delta)
    d.setHours(9, 0, 0, 0)
    return isoAt(d)
  }
  const slotNextWeek = () => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    d.setHours(10, 0, 0, 0)
    return isoAt(d)
  }

  const book = async (slotIso) => {
    if (!session) return
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/demo/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: session, slot_iso: slotIso, lang })
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', text: data.reply }])
      void postEvent('booking_click', { slotIso })
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: t.demo.error }])
    } finally {
      setLoading(false)
    }
  }

  const escalate = async (channel) => {
    const label = channel === 'callback' ? (lang === 'fr' ? 'Numéro pour rappel:' : 'Number for callback:') : (lang === 'fr' ? 'Courriel:' : 'Email:')
    const value = window.prompt(label)
    if (!value) return
    try {
      const res = await fetch(`${API_BASE}/demo/escalate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: session, channel, value, lang })
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', text: data.reply }])
      void postEvent('escalate_click', { channel })
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: t.demo.error }])
    }
  }

  const QuickActions = () => (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={() => book(slotTomorrow2pm())} className="rounded-full bg-white/10 hover:bg-white/15 px-3 py-1 text-xs text-white/90 ring-1 ring-white/15 transition">{lang==='fr' ? 'Demain 14:00' : 'Tomorrow 2:00 PM'}</button>
      <button onClick={() => book(slotFridayMorning())} className="rounded-full bg-white/10 hover:bg-white/15 px-3 py-1 text-xs text-white/90 ring-1 ring-white/15 transition">{lang==='fr' ? 'Vendredi matin' : 'Friday morning'}</button>
      <button onClick={() => book(slotNextWeek())} className="rounded-full bg-white/10 hover:bg-white/15 px-3 py-1 text-xs text-white/90 ring-1 ring-white/15 transition">{lang==='fr' ? 'Semaine prochaine' : 'Next week'}</button>
      <div className="mx-2 h-4 w-px bg-white/15" />
      <button onClick={() => escalate('callback')} className="inline-flex items-center gap-1 rounded-full bg-white/10 hover:bg-white/15 px-3 py-1 text-xs text-white/90 ring-1 ring-white/15 transition"><PhoneCall className="h-3 w-3"/>{lang==='fr' ? 'Rappel' : 'Callback'}</button>
      <button onClick={() => escalate('email')} className="inline-flex items-center gap-1 rounded-full bg-white/10 hover:bg-white/15 px-3 py-1 text-xs text-white/90 ring-1 ring-white/15 transition"><Mail className="h-3 w-3"/>{lang==='fr' ? 'Courriel' : 'Email'}</button>
    </div>
  )

  const onSuggestionClick = (s) => {
    void postEvent('suggestion_click', { text: s })
    send(s)
  }

  return (
    <section id="demo" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(30%_40%_at_10%_20%,rgba(139,92,246,0.12),transparent),radial-gradient(30%_30%_at_90%_80%,rgba(59,130,246,0.10),transparent)]" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/30 ring-1 ring-white/15">
              <Sparkles className="h-5 w-5 text-purple-300" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{t.demo.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setVoiceEnabled(v => !v)} title={voiceEnabled ? (lang==='fr' ? 'Désactiver la voix' : 'Disable voice') : (lang==='fr' ? 'Activer la voix' : 'Enable voice')} className="rounded-lg bg-white/5 hover:bg-white/10 p-2 ring-1 ring-white/10">
              {voiceEnabled ? <VolumeX className="h-4 w-4"/> : <Volume2 className="h-4 w-4"/>}
            </button>
            <button onClick={() => listening ? stopMic() : startMic()} disabled={!speechSupported} title={listening ? (lang==='fr' ? 'Arrêter' : 'Stop') : (lang==='fr' ? 'Parler' : 'Speak')} className={`rounded-lg p-2 ring-1 ring-white/10 ${listening ? 'bg-red-500/30' : 'bg-white/5 hover:bg-white/10'} ${!speechSupported ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {listening ? <MicOff className="h-4 w-4"/> : <Mic className="h-4 w-4"/>}
            </button>
          </div>
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
                            <button key={idx} onClick={() => onSuggestionClick(s)} className="rounded-full bg-white/10 hover:bg-white/15 px-3 py-1 text-xs text-white/90 ring-1 ring-white/15 transition">{s}</button>
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
              <div className="border-t border-white/10 p-3 space-y-3">
                <QuickActions />
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
                  <button key={i} onClick={() => onSuggestionClick(p)} className="rounded-full bg-white/10 hover:bg-white/15 px-3 py-1 text-xs text-white/90 ring-1 ring-white/15 transition">{p}</button>
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
