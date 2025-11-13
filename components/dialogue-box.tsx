import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

interface DialogueBoxProps {
  text: string
  type: "agent" | "thinking" | "success" | "error"
}

export default function DialogueBox({ text, type }: DialogueBoxProps) {
  const getStyles = () => {
    switch (type) {
      case "thinking":
        return "bg-slate-100/80 border border-slate-300 text-slate-700 italic"
      case "success":
        return "bg-emerald-50/80 border border-emerald-400 text-emerald-700 font-medium"
      case "error":
        return "bg-rose-50/80 border border-rose-400 text-rose-700 font-medium"
      case "agent":
      default:
        return "bg-cyan-50/80 border border-cyan-300 text-cyan-800 shadow-lg shadow-cyan-500/10 font-medium"
    }
  }

  const renderIcon = () => {
    switch (type) {
      case "thinking":
        return <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
      case "success":
        return <CheckCircle className="w-4 h-4 inline mr-2" />
      case "error":
        return <AlertCircle className="w-4 h-4 inline mr-2" />
      default:
        return null
    }
  }

  return (
    <div
      className={`p-3 rounded-lg text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-300 ${getStyles()}`}
    >
      {renderIcon()}
      {text}
    </div>
  )
}
