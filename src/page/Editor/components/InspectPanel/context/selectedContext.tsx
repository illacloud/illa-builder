import { createContext, ReactNode, FC, useContext, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWidgetInspectBySelectId } from "@/redux/currentApp/editor/inspect/inspectSelector"
import { inspectActions } from "@/redux/currentApp/editor/inspect/inspectSlice"
import { dslActions } from "@/redux/currentApp/editor/dsl/dslSlice"
import { GLOBAL_DATA_CONTEXT } from "@/page/Editor/context/globalDataProvider"
import { BaseEventItem } from "@/page/Editor/components/PanelSetters/EventHandlerSetter/interface"

interface Injected {
  panelConfig: Record<string, any>
  handleUpdateDsl: (value: Record<string, any>) => void
  handleUpdatePanelConfig: (value: Record<string, any>) => void
}

export const SelectedPanelContext = createContext<Injected>({} as Injected)

interface Props {
  event?: BaseEventItem
  handleUpdateItemPanelConfig?: (value: Record<string, any>) => void
  handleUpdateItemDsl?: (value: Record<string, any>) => void
  children?: ReactNode
}

// TODO: @WeiChen only support single select,wait to multi
export const SelectedProvider: FC<Props> = ({
  event,
  children,
  handleUpdateItemPanelConfig,
  handleUpdateItemDsl,
}) => {
  //  FIXME: wait Trigger fix,Not advisable method,because react-redux can't use in @illa-design/Trigger,and Trigger is mount to HTML.body,not App,so can't use
  const panelConfig = event ?? useSelector(getWidgetInspectBySelectId) ?? {}
  const dispatch = !event ? useDispatch() : () => {}

  const { globalData } = useContext(GLOBAL_DATA_CONTEXT)

  // TODO: @WeiChen wait new drag and drop
  const handleUpdatePanelConfig = useCallback(
    (value: Record<string, any>) => {
      dispatch(
        inspectActions.updateWidgetPanelConfig({
          id: panelConfig.id,
          value,
        }),
      )
    },
    [globalData, panelConfig],
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
    panelConfig,
    handleUpdateDsl: handleUpdateItemDsl ?? handleUpdateDsl,
    handleUpdatePanelConfig:
      handleUpdateItemPanelConfig ?? handleUpdatePanelConfig,
  }

  return (
    <SelectedPanelContext.Provider value={value}>
      {children}
    </SelectedPanelContext.Provider>
  )
}

SelectedProvider.displayName = "SelectedProvider"
