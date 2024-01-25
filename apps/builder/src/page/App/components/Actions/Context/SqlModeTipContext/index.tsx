import { FC, ReactNode, createContext, useCallback, useState } from "react"

type ActionShowSQLMode = Record<string, boolean>

interface Injected {
  showSQLModeTip: ActionShowSQLMode
  setShowSQLModeTip: (actionID: string, show: boolean) => void
}

export const SQLModeTipContext = createContext<Injected>({} as Injected)
export const SQLModeTipProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showSQLModeTip, setShowSQLModeTip] = useState({})

  const handleSetSQModeTip = useCallback((actionID: string, show: boolean) => {
    setShowSQLModeTip((prev) => {
      return {
        ...prev,
        [actionID]: show,
      }
    })
  }, [])
  return (
    <SQLModeTipContext.Provider
      value={{ showSQLModeTip, setShowSQLModeTip: handleSetSQModeTip }}
    >
      {children}
    </SQLModeTipContext.Provider>
  )
}
