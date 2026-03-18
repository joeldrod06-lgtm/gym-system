import { createContext, useEffect, useMemo, useState } from "react"
import { themeTokens } from "../styles/tokens"

const STORAGE_KEY = "gms-theme"
const MEDIA_QUERY = "(prefers-color-scheme: dark)"

export const ThemeContext = createContext(null)

const resolveTheme = (mode) => {
  if (mode === "system") {
    return window.matchMedia(MEDIA_QUERY).matches ? "dark" : "light"
  }

  return mode
}

const applyResolvedTheme = (resolvedTheme) => {
  const html = document.documentElement
  const selectedTokens = themeTokens[resolvedTheme]

  html.classList.toggle("dark", resolvedTheme === "dark")
  html.dataset.theme = resolvedTheme

  Object.entries(selectedTokens.cssVars).forEach(([token, value]) => {
    html.style.setProperty(token, value)
  })
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("system")
  const [resolvedTheme, setResolvedTheme] = useState("light")

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY) ?? "system"
    const initialResolvedTheme = resolveTheme(savedTheme)

    setTheme(savedTheme)
    setResolvedTheme(initialResolvedTheme)
    applyResolvedTheme(initialResolvedTheme)
  }, [])

  useEffect(() => {
    const media = window.matchMedia(MEDIA_QUERY)

    const handleSystemChange = (event) => {
      if (theme !== "system") {
        return
      }

      const nextResolvedTheme = event.matches ? "dark" : "light"
      setResolvedTheme(nextResolvedTheme)
      applyResolvedTheme(nextResolvedTheme)
    }

    media.addEventListener("change", handleSystemChange)
    return () => media.removeEventListener("change", handleSystemChange)
  }, [theme])

  const changeTheme = (mode) => {
    const nextResolvedTheme = resolveTheme(mode)

    setTheme(mode)
    setResolvedTheme(nextResolvedTheme)
    window.localStorage.setItem(STORAGE_KEY, mode)
    applyResolvedTheme(nextResolvedTheme)
  }

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      changeTheme,
      tokens: themeTokens[resolvedTheme],
    }),
    [theme, resolvedTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
