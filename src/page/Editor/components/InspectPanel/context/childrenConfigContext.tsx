import { createContext, ReactNode, useEffect, useState, FC } from "react"
// TODO: remove this,when add utils to system
import { isEmpty, isEqual } from "lodash"

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

export const ChildrenPanelContext = createContext<Injected>({} as Injected)

interface Props {
  panelConfig: any
  attrName: string
  handleUpdateAllDsl: (value: any) => void
  children?: ReactNode
}

export const ChildrenPanelProvider: FC<Props> = ({
  children,
  panelConfig,
  attrName,
  handleUpdateAllDsl,
}) => {
  const childrenPanelConfig = panelConfig[attrName] as configItem[]
  const [tempConfig, setTempConfig] = useState(childrenPanelConfig ?? [])

  useEffect(() => {
    if (!isEmpty(childrenPanelConfig) && isEmpty(tempConfig)) {
      setTempConfig(childrenPanelConfig)
      return
    }
    if (
      !isEmpty(childrenPanelConfig) &&
      !isEmpty(tempConfig) &&
      !isEqual(childrenPanelConfig, tempConfig)
    ) {
      setTempConfig(childrenPanelConfig)
    }
  }, [childrenPanelConfig, tempConfig])

  const handleUpdateDsl = (value: configItem[]) => {
    const newChildrenPanelConfig = value
    setTempConfig(newChildrenPanelConfig)
    handleUpdateAllDsl({ [attrName]: newChildrenPanelConfig })
  }

  const handleAddItemToDsl = (value: configItem) => {
    const newChildrenPanelConfig = [...tempConfig]
    newChildrenPanelConfig.push(value)
    setTempConfig(newChildrenPanelConfig)
    handleUpdateAllDsl({ [attrName]: newChildrenPanelConfig })
  }

  const handleAddItemToDslAsync = async (value: configItem) => {
    const newChildrenPanelConfig = [...tempConfig]
    newChildrenPanelConfig.push(value)
    setTempConfig(newChildrenPanelConfig)
    handleUpdateAllDsl({ [attrName]: newChildrenPanelConfig })
  }

  const value = {
    widgetId: panelConfig.id,
    configPanel: tempConfig ?? {},
    handleUpdateDsl,
    handleAddItemToDsl,
    handleAddItemToDslAsync,
  }

  return (
    <ChildrenPanelContext.Provider value={value}>
      {children}
    </ChildrenPanelContext.Provider>
  )
}

ChildrenPanelProvider.displayName = "ChildrenPanelProvider"
