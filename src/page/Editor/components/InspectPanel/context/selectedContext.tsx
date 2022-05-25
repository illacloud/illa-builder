import { createContext, ReactNode, useEffect, useState, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
// TODO: remove this,when add utils to system
import { isEmpty } from "lodash"
import { useDebounce } from "react-use"
import { getWidgetInspectBySelectId } from "@/redux/inspect/inspectSelector"
import { inspectActions } from "@/redux/inspect/inspectSlice"
import { dslActions } from "@/redux/editor/dsl/dslSlice"

interface Injected {
  configPanel: Record<string, any>
  handleUpdateDsl: (value: any) => void
}

export const SelectedPanelContext = createContext<Injected>({} as Injected)

interface Props {
  children?: ReactNode
}

// TODO: only support single select,wait to multi
export const SelectedProvider: FC<Props> = ({ children }) => {
  const panelConfig = useSelector(getWidgetInspectBySelectId) ?? {}
  const [tempConfig, setTempConfig] = useState(panelConfig)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isEmpty(panelConfig) && isEmpty(tempConfig)) {
      setTempConfig(panelConfig)
      return
    }
    if (
      !isEmpty(panelConfig) &&
      !isEmpty(tempConfig) &&
      tempConfig.id !== panelConfig.id
    ) {
      setTempConfig(panelConfig)
    }
  }, [panelConfig, tempConfig])

  const handleUpdateDsl = (value: Record<string, any>) => {
    if (isEmpty(tempConfig)) return
    let oldConfig: Record<string, any> = {}
    if (!isEmpty(panelConfig)) {
      oldConfig = { ...panelConfig }
    }
    setTempConfig({ ...oldConfig, ...value })
  }

  useDebounce(
    () => {
      if (isEmpty(tempConfig)) return
      dispatch(
        inspectActions.updateWidgetPanelConfig({
          id: tempConfig.id,
          value: {
            ...tempConfig,
          },
        }),
      )
      dispatch(
        dslActions.updateDslProps({
          targetId: tempConfig.id,
          newState: {
            ...tempConfig,
          },
        }),
      )
    },
    200,
    [tempConfig],
  )

  const value = {
    configPanel: tempConfig ?? {},
    handleUpdateDsl: handleUpdateDsl,
  }

  return (
    <SelectedPanelContext.Provider value={value}>
      {children}
    </SelectedPanelContext.Provider>
  )
}

SelectedProvider.displayName = "SingleSelectContext"
