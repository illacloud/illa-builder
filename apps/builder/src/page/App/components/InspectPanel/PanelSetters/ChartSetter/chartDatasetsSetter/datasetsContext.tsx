import { klona } from "klona/json"
import { FC, ReactNode, createContext, useCallback } from "react"
import { v4 } from "uuid"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"

interface ProviderProps {
  datasets: any[]
  childrenSetter: PanelFieldConfig[]
  widgetDisplayName: string
  attrPath: string
  handleUpdateDsl: (attrPath: string, value: any) => void
  children: ReactNode
}

interface ContextShape extends Omit<ProviderProps, "children"> {
  handleDeleteDataSet: (index: number) => void
  handleAddDataSet: () => void
  handleHiddenDataset: (index: number) => void
}

export const DatasetsContext = createContext<ContextShape>({} as ContextShape)

export const DatasetsProvider: FC<ProviderProps> = (props) => {
  const { children, datasets, attrPath, handleUpdateDsl } = props

  const handleDeleteDataSet = useCallback(
    (index: number) => {
      const updatedArray = datasets.filter(
        (optionItem: Record<string, any>, i: number) => {
          return i !== index
        },
      )
      handleUpdateDsl(attrPath, updatedArray)
    },
    [datasets, handleUpdateDsl, attrPath],
  )

  const handleHiddenDataset = useCallback(
    (index: number) => {
      let newItem = datasets[index]
      if (!newItem) return
      newItem = {
        ...newItem,
        isHidden: !newItem.isHidden,
      }
      const newDatasets = klona(datasets)
      newDatasets[index] = newItem
      handleUpdateDsl(attrPath, newDatasets)
    },
    [attrPath, datasets, handleUpdateDsl],
  )

  const handleAddDataSet = useCallback(async () => {
    let oldDatasets = Array.isArray(datasets) ? datasets : []
    const newDatasetItem = {
      id: v4(),
      datasetName: "1",
      datasetValues: "",
      aggregationMethod: "SUM",
      type: "BAR",
      color: "blue",
    }
    handleUpdateDsl(attrPath, [...oldDatasets, newDatasetItem])
  }, [attrPath, datasets, handleUpdateDsl])

  const value = {
    ...props,
    handleAddDataSet,
    handleDeleteDataSet,
    handleHiddenDataset,
  }
  return (
    <DatasetsContext.Provider value={value}>
      {children}
    </DatasetsContext.Provider>
  )
}
