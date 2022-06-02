import { createContext, ReactNode, FC, useCallback, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWidgetInspectBySelectId } from "@/redux/inspect/inspectSelector"
import { inspectActions } from "@/redux/inspect/inspectSlice"
import { dslActions } from "@/redux/editor/dsl/dslSlice"
import { getDynamicValue } from "@/utils/parserExpressionStatement"
import { GLOBAL_DATA_CONTEXT } from "@/page/Editor/context/globalDataProvider"

interface Injected {
  configPanel: Record<string, any>
  handleUpdateDsl: (value: any) => void
  handleUpdateConfigPanel: (value: Record<string, any>) => void
}

export const SelectedPanelContext = createContext<Injected>({} as Injected)

interface Props {
  children?: ReactNode
}

// TODO: @WeiChen only support single select,wait to multi
export const SelectedProvider: FC<Props> = ({ children }) => {
  const panelConfig = useSelector(getWidgetInspectBySelectId) ?? {}

  const dispatch = useDispatch()

  const { globalData } = useContext(GLOBAL_DATA_CONTEXT)

  // TODO: @WeiChen wait new drag and drop
  const handleUpdateConfigPanel = useCallback(
    (value: Record<string, any>) => {
      dispatch(
        inspectActions.updateWidgetPanelConfig({
          id: panelConfig.id,
          value,
        }),
      )
      // TODO: @WeiChen test case,wait new drag and drop
      Object.keys(value).forEach((key) => {
        const dynamicValue = getDynamicValue(value[key], globalData)
        console.log("dynamicValue", dynamicValue)
      })
    },
    [dispatch, globalData],
  )

  const handleUpdateDsl = (value: Record<string, any>) => {
    dispatch(
      dslActions.updateDslProps({
        targetId: panelConfig.id,
        newState: {
          ...value,
        },
      }),
    )
  }

  const value = {
    configPanel: panelConfig,
    handleUpdateDsl: handleUpdateDsl,
    handleUpdateConfigPanel,
  }

  return (
    <SelectedPanelContext.Provider value={value}>
      {children}
    </SelectedPanelContext.Provider>
  )
}

SelectedProvider.displayName = "SingleSelectContext"
