import { createContext, ReactNode, FC } from "react"

interface configItem {
  id: string
  label: string
  value: string
  disabled?: string
}

interface Injected {
  configPanel: configItem[]
  handleUpdateDsl: (value: configItem[]) => void
  handleAddItemToDsl: (value: configItem) => void
  handleAddItemToDslAsync: (value: configItem) => Promise<void>
  widgetId: string
}

export const OptionListSetterContext = createContext<Injected>({} as Injected)

interface Props {
  panelConfig: any
  attrName: string
  handleUpdateAllConfigPanel: (value: any) => void
  handleUpdateAllDsl: (value: any) => void
  children?: ReactNode
}

export const OptionListSetterProvider: FC<Props> = ({
  children,
  panelConfig,
  attrName,
  handleUpdateAllDsl,
  handleUpdateAllConfigPanel,
}) => {
  const childrenPanelConfig = panelConfig[attrName] as configItem[]

  const handleUpdate = (value: configItem[]) => {
    const newChildrenPanelConfig = value
    handleUpdateAllConfigPanel({ [attrName]: newChildrenPanelConfig })
    handleUpdateAllDsl({ [attrName]: newChildrenPanelConfig })
  }

  const handleAddItem = (value: configItem) => {
    const newChildrenPanelConfig = [...childrenPanelConfig]
    newChildrenPanelConfig.push(value)
    handleUpdateAllConfigPanel({ [attrName]: newChildrenPanelConfig })
    // TODO: calc data to update dsl
    handleUpdateAllDsl({ [attrName]: newChildrenPanelConfig })
  }

  const handleAddItemAsync = async (value: configItem) => {
    const newChildrenPanelConfig = [...childrenPanelConfig]
    newChildrenPanelConfig.push(value)
    handleUpdateAllConfigPanel({ [attrName]: newChildrenPanelConfig })
    handleUpdateAllDsl({ [attrName]: newChildrenPanelConfig })
  }

  const value = {
    widgetId: panelConfig.id,
    configPanel: childrenPanelConfig ?? [],
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
