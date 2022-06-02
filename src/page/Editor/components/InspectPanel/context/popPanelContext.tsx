import { createContext, ReactNode, FC } from "react"

interface Injected {
  popPanelConfig: Record<string, any>
  handleUpdateItem: (value: Record<string, any>) => void
}

export const PopPanelContext = createContext<Injected>({} as Injected)

interface Props {
  children?: ReactNode
  popPanelConfig: Record<string, any>
  handleUpdateItem: (value: Record<string, any>) => void
}

export const PopPanelProvider: FC<Props> = ({
  children,
  popPanelConfig,
  handleUpdateItem,
}) => {
  const value = {
    popPanelConfig,
    handleUpdateItem,
  }

  return (
    <PopPanelContext.Provider value={value}>
      {children}
    </PopPanelContext.Provider>
  )
}

PopPanelProvider.displayName = "PopPanelProvider"
