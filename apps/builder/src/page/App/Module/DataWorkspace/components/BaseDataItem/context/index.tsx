import { FC, createContext, useState } from "react"
import { Injected, Props } from "./interface"

export const BaseDataItemContext = createContext<Injected>({} as Injected)

export const BaseDataItemContextProvider: FC<Props> = (props) => {
  const { children } = props

  const [expandedStatus, setExpandedStatus] = useState(new Map())

  const handleUpdateExpandedWidget = (
    displayName: string,
    currentStatus: boolean,
  ) => {
    setExpandedStatus((prev) => {
      prev.set(displayName, !currentStatus)
      return new Map(prev)
    })
  }

  return (
    <BaseDataItemContext.Provider
      value={{ handleUpdateExpandedWidget, expandedStatus }}
    >
      {children}
    </BaseDataItemContext.Provider>
  )
}

BaseDataItemContextProvider.displayName = "SelectedProvider"
