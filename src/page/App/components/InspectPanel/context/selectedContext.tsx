import {
  createContext,
  ReactNode,
  FC,
  useContext,
  useCallback,
  useMemo,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { GLOBAL_DATA_CONTEXT } from "@/page/App/context/globalDataProvider"
import { getComponentNodeBySingleSelected } from "@/redux/currentApp/editor/components/componentsSelector"
import { Empty } from "@/page/App/components/InspectPanel/empty"

interface Injected {
  widgetType: string
  widgetDisplayName: string
  widgetProps: Record<string, any>
  handleUpdateDsl: (value: Record<string, any>) => void
}

export const SelectedPanelContext = createContext<Injected>({} as Injected)

interface Props {
  propsPanelConfig?: Record<string, any>
  handleUpdateItemPanelConfig?: (value: Record<string, any>) => void
  handleUpdateItemDsl?: (value: Record<string, any>) => void
  children?: ReactNode
}

export const SelectedProvider: FC<Props> = ({
  propsPanelConfig,
  children,
  handleUpdateItemPanelConfig,
  handleUpdateItemDsl,
}) => {
  const singleSelectedComponentNode = useSelector(
    getComponentNodeBySingleSelected,
  )

  const widgetType = useMemo(
    () => singleSelectedComponentNode?.type,
    [singleSelectedComponentNode],
  )

  const widgetDisplayName = useMemo(
    () => singleSelectedComponentNode?.displayName,
    [singleSelectedComponentNode],
  )

  const widgetProps = useMemo(
    () => singleSelectedComponentNode?.props || {},
    [singleSelectedComponentNode],
  )

  const dispatch = useDispatch()

  const { globalData } = useContext(GLOBAL_DATA_CONTEXT)

  const handleUpdateDsl = (value: Record<string, any>) => {
    if (!widgetProps || !widgetDisplayName) return
    dispatch(
      componentsActions.updateComponentPropsReducer({
        displayName: widgetDisplayName,
        newProps: value,
      }),
    )
  }

  if (!widgetType || !widgetDisplayName) return <Empty />

  const value = {
    widgetType,
    widgetDisplayName,
    widgetProps,
    handleUpdateDsl,
  }

  return (
    <SelectedPanelContext.Provider value={value}>
      {children}
    </SelectedPanelContext.Provider>
  )
}

SelectedProvider.displayName = "SelectedProvider"
