import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import Integrations from './components/Integrations'
import FAQ from './components/FAQ'
import ChatButton from './components/ChatButton'
import Demo from './components/Demo'

const STRINGS = {
  en: {
    nav: {
      features: 'Features',
      pricing: 'Pricing',
      contact: 'Contact',
      cta: 'Book a demo'
    },
    status: {
      checking: 'Checking API…',
      ok: 'API online',
      down: 'API unreachable'
    },
    hero: {
      title: 'Cliqo — Your AI Receptionist for Quebec Businesses',
      subtitle: 'Answering, routing, and scheduling in English et en français. A futuristic, always-on receptionist that feels human and works across phone, chat, and web.',
      ctaPrimary: 'Get started',
      ctaSecondary: 'Explore features'
    },
    features: {
      title: 'Built for modern teams',
      items: [
        { title: 'Smart call routing', desc: 'Direct callers to the right person or department using intent understanding.' },
        { title: 'Scheduling & reminders', desc: 'Book appointments, send confirmations, and automate follow-ups.' },
        { title: 'Bilingual by default', desc: 'Seamless English/French conversations tailored for Quebec.' },
        { title: 'Omnichannel', desc: 'Phone, chat, SMS, and web widgets—one consistent experience.' },
        { title: 'Privacy-first', desc: 'SOC2-ready workflows and data minimization built-in.' },
        { title: 'Learns your business', desc: 'Continuously improves with feedback and knowledge updates.' }
      ]
    },
    pricing: {
      title: 'Simple pricing that scales with you',
      cta: 'Choose plan',
      tiers: [
        { name: 'Starter', period: '/month', features: ['Up to 300 calls', '1 number included', 'Basic routing', 'Email summaries'] },
        { name: 'Growth', period: '/month', features: ['Up to 1,500 calls', 'Advanced routing', 'Scheduling + SMS', 'Analytics dashboard'] },
        { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited calls', 'SLA + SSO', 'Custom integrations', 'Dedicated support'] }
      ]
    },
    cta: {
      title: 'See Cliqo in action',
      subtitle: 'Request a personalized demo and discover how Cliqo can delight your callers.',
      name: 'Your name',
      email: 'Work email',
      company: 'Company',
      message: 'What would you like to accomplish with Cliqo?',
      submit: 'Request demo'
    },
    testimonials: 'What customers say',
    integrations: 'Works with your stack',
    faq: 'Frequently asked questions',
    demo: {
      title: 'Try the AI receptionist',
      subtitle: 'Chat with a live demo of Cliqo. Ask about scheduling, pricing, or integrations — in English or French.',
      send: 'Send',
      typing: 'Cliqo is typing…',
      error: 'The demo is unavailable right now. Please try again later.',
      capabilitiesTitle: 'What Cliqo can do',
      capabilities: [
        'Schedule and manage appointments',
        'Route queries to the right person',
        'Answer pricing and product questions',
        'Work bilingually (EN/FR)'
      ],
      promptsTitle: 'Try asking…',
      prompts: [
        'Can you book me for Friday at 2pm?',
        'What integrations do you support?',
        'How much does it cost?',
        'Switch to French please'
      ]
    },
    footer: {
      tagline: 'Human-grade conversations. Enterprise reliability.'
    }
  },
  fr: {
    nav: {
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      contact: 'Contact',
      cta: 'Réserver une démo'
    },
    status: {
      checking: 'Vérification de l’API…',
      ok: 'API en ligne',
      down: 'API indisponible'
    },
    hero: {
      title: 'Cliqo — Votre réceptionniste IA pour les entreprises du Québec',
      subtitle: 'Répond, oriente et planifie en anglais et en français. Une réceptionniste futuriste, toujours disponible, humaine et multicanale.',
      ctaPrimary: 'Commencer',
      ctaSecondary: 'Voir les fonctionnalités'
    },
    features: {
      title: 'Conçu pour les équipes modernes',
      items: [
        { title: 'Routage intelligent des appels', desc: 'Dirige les appelants vers la bonne personne grâce à la compréhension d’intention.' },
        { title: 'Planification & rappels', desc: 'Réserve des rendez-vous, envoie des confirmations et automatise les suivis.' },
        { title: 'Bilingue par défaut', desc: 'Conversations fluides en anglais et en français, adaptées au Québec.' },
        { title: 'Omnicanal', desc: 'Téléphone, chat, SMS et web—une expérience cohérente.' },
        { title: 'Priorité à la confidentialité', desc: 'Processus prêts pour SOC2 et minimisation des données intégrée.' },
        { title: 'Apprend votre entreprise', desc: 'S’améliore en continu avec vos retours et vos connaissances.' }
      ]
    },
    pricing: {
      title: 'Une tarification simple et évolutive',
      cta: 'Choisir le plan',
      tiers: [
        { name: 'Démarrage', period: '/mois', features: ['Jusqu’à 300 appels', '1 numéro inclus', 'Routage de base', 'Résumés par courriel'] },
        { name: 'Croissance', period: '/mois', features: ['Jusqu’à 1 500 appels', 'Routage avancé', 'Planification + SMS', 'Tableau de bord analytique'] },
        { name: 'Entreprise', price: 'Sur mesure', period: '', features: ['Appels illimités', 'SLA + SSO', 'Intégrations personnalisées', 'Support dédié'] }
      ]
    },
    cta: {
      title: 'Découvrez Cliqo en action',
      subtitle: 'Demandez une démo personnalisée et voyez comment Cliqo ravit vos appelants.',
      name: 'Votre nom',
      email: 'Courriel professionnel',
      company: 'Entreprise',
      message: 'Que souhaitez-vous accomplir avec Cliqo ?',
      submit: 'Demander une démo'
    },
    testimonials: 'Ce que disent nos clients',
    integrations: 'Compatible avec votre stack',
    faq: 'Questions fréquentes',
    demo: {
      title: 'Essayez la réceptionniste IA',
      subtitle: 'Discutez avec une démo de Cliqo. Parlez planification, tarifs ou intégrations — en anglais ou en français.',
      send: 'Envoyer',
      typing: 'Cliqo écrit…',
      error: 'La démo est momentanément indisponible. Réessayez plus tard.',
      capabilitiesTitle: 'Ce que Cliqo peut faire',
      capabilities: [
        'Planifier et gérer des rendez‑vous',
        'Acheminer les demandes vers la bonne personne',
        'Répondre aux questions de prix et de produit',
        'Travailler en bilingue (FR/EN)'
      ],
      promptsTitle: 'Essayez de demander…',
      prompts: [
        'Pouvez‑vous me réserver vendredi à 14 h ?',
        'Quelles intégrations supportez‑vous ?',
        'Combien ça coûte ?',
        'Passe en anglais s’il te plaît'
      ]
    },
    footer: {
      tagline: 'Des conversations naturelles. Une fiabilité d’entreprise.'
    }
  }
}

export default function App() {
  const [lang, setLang] = useState('en')
  const t = useMemo(() => STRINGS[lang], [lang])

  return (
    <div className="min-h-screen bg-[#0b0d16] text-white relative">
      {/* Background auras */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl bg-purple-500/20" />
        <div className="absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl bg-blue-500/20" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full blur-3xl bg-orange-500/10" />
      </div>

      <Navbar lang={lang} setLang={setLang} t={t} />

      <main className="pt-24">
        <Hero t={t} />
        <Stats />
        <Features t={t} />
        <Demo lang={lang} t={t} />
        <Testimonials title={t.testimonials} />
        <Integrations title={t.integrations} />
        <Pricing t={t} />
        <FAQ title={t.faq} />
        <CTA t={t} />
      </main>

      <ChatButton />

      <footer className="relative border-t border-white/10 mt-16">
        <div className="mx-auto max-w-6xl px-6 py-10 flex items-center justify-between">
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} Cliqo. {t.footer.tagline}</p>
          <a href="#contact" className="text-sm text-white/80 hover:text-white">{t.nav.cta}</a>
        </div>
      </footer>
    </div>
  )
}
