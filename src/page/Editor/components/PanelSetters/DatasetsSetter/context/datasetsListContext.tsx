import { createContext, ReactNode, FC } from "react"
import { DatasetConfig } from "@/wrappedComponents/Chart/interface"

interface Injected {
  options: DatasetConfig[]
  handleUpdateDsl: (value: DatasetConfig[]) => void
  handleAddItemToDsl: (value: DatasetConfig) => void
  handleAddItemToDslAsync: (value: DatasetConfig) => Promise<void>
  widgetId: string
}

export const DatasetsListContext = createContext<Injected>({} as Injected)

interface Props {
  panelConfig: any
  attrName: string
  handleUpdateAllPanelConfig: (value: any) => void
  handleUpdateAllDsl: (value: any) => void
  children?: ReactNode
}

export const DatasetsListProvider: FC<Props> = ({
  children,
  panelConfig,
  attrName,
  handleUpdateAllDsl,
  handleUpdateAllPanelConfig,
}) => {
  const options = panelConfig[attrName] as DatasetConfig[]

  console.log("DatasetsListProvider", panelConfig, attrName)
  const handleUpdate = (value: DatasetConfig[]) => {
    const newOptions = value
    handleUpdateAllPanelConfig({ [attrName]: newOptions })
    console.log("handleUpdate", attrName, newOptions)
    handleUpdateAllDsl({ [attrName]: newOptions })
  }

  const handleAddItem = (value: DatasetConfig) => {
    const newOptions = [...options]
    newOptions.push(value)
    handleUpdateAllPanelConfig({ [attrName]: newOptions })
    // TODO: calc data to update dsl
    handleUpdateAllDsl({ [attrName]: newOptions })
  }

  const handleAddItemAsync = async (value: DatasetConfig) => {
    const newOptions = [...options]
    newOptions.push(value)
    handleUpdateAllPanelConfig({ [attrName]: newOptions })
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
    <DatasetsListContext.Provider value={value}>
      {children}
    </DatasetsListContext.Provider>
  )
}

DatasetsListProvider.displayName = "OptionListSetterProvider"
