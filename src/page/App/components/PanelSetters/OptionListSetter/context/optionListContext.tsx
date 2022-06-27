import { createContext, ReactNode, FC } from "react"

interface configItem {
  id: string
  label: string
  value: string
  disabled?: string
}

interface Injected {
  options: configItem[]
  handleUpdateDsl: (value: configItem[]) => void
  handleAddItemToDsl: (value: configItem) => void
  handleAddItemToDslAsync: (value: configItem) => Promise<void>
  widgetId: string
}

export const OptionListSetterContext = createContext<Injected>({} as Injected)

interface Props {
  panelConfig: any
  attrName: string
  handleUpdateAllDsl: (value: any) => void
  children?: ReactNode
}

export const OptionListSetterProvider: FC<Props> = ({
  children,
  panelConfig,
  attrName,
  handleUpdateAllDsl,
}) => {
  const options = panelConfig[attrName] as configItem[]

  const handleUpdate = (value: configItem[]) => {
    const newOptions = value
    handleUpdateAllDsl({ [attrName]: newOptions })
  }

  const handleAddItem = (value: configItem) => {
    const newOptions = [...options]
    newOptions.push(value)
    handleUpdateAllDsl({ [attrName]: newOptions })
  }

  const handleAddItemAsync = async (value: configItem) => {
    const newOptions = [...options]
    newOptions.push(value)
    handleUpdateAllDsl({ [attrName]: newOptions })
  }

  const value = {
    widgetId: panelConfig.id,
    options: options ?? [],
    handleUpdateDsl: handleUpdate,
    handleAddItemToDsl: handleAddItem,
    handleAddItemToDslAsync: handleAddItemAsync,
  }

  return (
    <OptionListSetterContext.Provider value={value}>
      {children}
    </OptionListSetterContext.Provider>
  )
}

OptionListSetterProvider.displayName = "OptionListSetterProvider"
