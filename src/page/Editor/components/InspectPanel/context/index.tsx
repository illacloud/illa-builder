import { createContext, ReactNode, useEffect, useState, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getSelectedWidgetStates,
  getWidgetStateById,
} from "@/redux/editor/dsl/dslSelectors"
import { dslActions } from "@/redux/editor/dsl/dslSlice"
import { DslActionName } from "@/redux/editor/dsl/dsl-action"
// TODO: remove this,when add utils to system
import { isEmpty } from "lodash"
import { useDebounce } from "react-use"

interface Injected {
  componentDsl: any // TODO:
  tempProps: any // TODO:
  handleUpdateDsl: (value: any) => void
}

export const ConfigPanelContext = createContext<Injected>({} as Injected)

interface Props {
  children?: ReactNode
}

export const ConfigPanelProvider: FC<Props> = ({ children }) => {
  const componentDsl = useSelector((state) => {
    const componentId = getSelectedWidgetStates(state as any)
    return getWidgetStateById(state as any, componentId[0]) ?? null
  })

  const [tempState, setTempState] = useState(componentDsl)

  useEffect(() => {
    if (!isEmpty(componentDsl) && isEmpty(tempState)) {
      setTempState(componentDsl)
      return
    }

    if (
      !isEmpty(componentDsl) &&
      !isEmpty(tempState) &&
      (componentDsl!.id !== tempState!.id ||
        componentDsl!.type !== tempState!.type)
    ) {
      setTempState(componentDsl)
    }
  }, [componentDsl, tempState])

  const dispatch = useDispatch()

  const handleUpdateDsl = (value: any) => {
    if (isEmpty(tempState)) return
    let oldProps: Record<string, any> = {}
    if (!isEmpty(componentDsl)) {
      oldProps = { ...componentDsl!.props }
    }
    setTempState((prevState: any) => {
      const newState = { ...prevState }
      const newProps = { ...oldProps, ...value }
      newState.props = newProps
      return newState
    })
  }

  useDebounce(
    () => {
      if (isEmpty(tempState) || !tempState) return
      const props = tempState.props
      dispatch(
        dslActions.dslActionHandler({
          type: DslActionName.updateDslProps,
          targetId: tempState.id,
          newState: {
            ...props,
          },
        }),
      )
    },
    200,
    [tempState],
  )

  const value = {
    componentDsl: componentDsl ? componentDsl : {},
    tempProps: tempState ? tempState.props : {},
    handleUpdateDsl: handleUpdateDsl,
  }

  return (
    <ConfigPanelContext.Provider value={value}>
      {children}
    </ConfigPanelContext.Provider>
  )
}

ConfigPanelProvider.displayName = "ConfigPanelProvider"
