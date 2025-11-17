import { MessageCircle } from 'lucide-react'

export default function ChatButton() {
  return (
    <a
      href="#contact"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500 px-5 py-3 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/40"
      aria-label="Open chat"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="font-semibold">Chat</span>
    </a>
  )
}
