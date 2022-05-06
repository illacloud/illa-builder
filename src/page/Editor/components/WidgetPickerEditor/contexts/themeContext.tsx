import { createContext, useState, Dispatch, ReactNode } from "react"

interface Injected {
  theme: string
  setTheme: Dispatch<any>
}

export const ctx = createContext<Injected>({} as Injected)

interface Props {
  children?: ReactNode
}

export function Provider({ children }: Props) {
  const [theme, setTheme] = useState("light")

  const value = {
    theme,
    setTheme,
  }

  return <ctx.Provider value={value}>{children}</ctx.Provider>
}
