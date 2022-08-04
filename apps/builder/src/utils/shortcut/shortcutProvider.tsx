import { createContext } from "react"
import { ShortcutContextProp } from "./interface"

export const ShortCutContext = createContext<ShortcutContextProp>(
  {} as ShortcutContextProp,
)

ShortCutContext.displayName = "ShortCutContext"
