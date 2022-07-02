import { createContext, ReactNode, FC } from "react"
import { OptionItemShape } from "@/page/App/components/PanelSetters/OptionListSetter/interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"

interface ProviderProps {
  optionItems: OptionItemShape[]
  childrenSetter: PanelFieldConfig[]
  widgetDisplayName: string
  attrPath: string
  children: ReactNode
  handleDeleteOptionItem: (index: number) => void
  handleCopyOptionItem: (index: number) => void
  handleMoveOptionItem: (dragIndex: number, hoverIndex: number) => void
}

export const OptionListSetterContext = createContext<ProviderProps>(
  {} as ProviderProps,
)

export const OptionListSetterProvider: FC<ProviderProps> = (props) => {
  const value = {
    ...props,
  }

  return (
    <OptionListSetterContext.Provider value={value}>
      {props.children}
    </OptionListSetterContext.Provider>
  )
}

OptionListSetterProvider.displayName = "OptionListSetterProvider"
