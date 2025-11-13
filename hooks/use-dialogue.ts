"use client"

import { useState, useCallback } from "react"

export interface Dialogue {
  text: string
  type: "agent" | "thinking" | "success" | "error"
}

export function useDialogue() {
  const [dialogues, setDialogues] = useState<Dialogue[]>([])

  const addDialogue = useCallback((text: string, type: Dialogue["type"] = "agent") => {
    setDialogues((prev) => [...prev, { text, type }])
  }, [])

  const addThinkingDialogue = useCallback((text: string) => {
    setDialogues((prev) => [...prev, { text, type: "thinking" }])
  }, [])

  const addSuccessDialogue = useCallback((text: string) => {
    setDialogues((prev) => [...prev, { text, type: "success" }])
  }, [])

  const addErrorDialogue = useCallback((text: string) => {
    setDialogues((prev) => [...prev, { text, type: "error" }])
  }, [])

  const clearDialogues = useCallback(() => {
    setDialogues([])
  }, [])

  const replaceLastDialogue = useCallback((text: string, type: Dialogue["type"] = "agent") => {
    setDialogues((prev) => {
      if (prev.length === 0) return [{ text, type }]
      const updated = [...prev]
      updated[updated.length - 1] = { text, type }
      return updated
    })
  }, [])

  return {
    dialogues,
    addDialogue,
    addThinkingDialogue,
    addSuccessDialogue,
    addErrorDialogue,
    clearDialogues,
    replaceLastDialogue,
  }
}
