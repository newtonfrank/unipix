"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (typeof window !== "undefined" ? window.localStorage.getItem(storageKey) as Theme : defaultTheme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    const body = window.document.body

    console.log('Applying theme:', theme, 'to DOM');

    root.classList.remove("light", "dark")
    body.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      body.classList.add(systemTheme)
      console.log('System theme applied:', systemTheme);
      return
    }

    root.classList.add(theme)
    body.classList.add(theme)
    console.log('Theme applied:', theme);
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      console.log('Setting theme to:', theme);
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}