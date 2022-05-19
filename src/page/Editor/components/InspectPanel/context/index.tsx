import React, { createContext, ReactNode, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getSelectedWidgetStates,
  getWidgetStateById,
} from "@/redux/selectors/editorSelectors/dslSelectors"
import { dslActions } from "@/redux/reducers/editorReducer/dslReducer"
import { DslActionName } from "@/redux/reducers/editorReducer/dslReducer/dsl-action"
import { isEmpty } from "lodash"
import { useDebounceEffect } from "ahooks"

interface Injected {
  componentDsl: any
  tempProps: any
  handleUpdateDsl: (value: any) => void
}

export const ConfigPanelContext = createContext<Injected>({} as Injected)

interface Props {
  children?: ReactNode
}

export function ConfigPanelProvider({ children }: Props) {
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
    setTempState((prevState: any) => {
      const newState = { ...prevState }
      const newProps = { ...newState.props, ...value }
      newState.props = newProps
      return newState
    })
  }

  useDebounceEffect(
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
    [tempState],
    { leading: true, wait: 200 },
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

export default ConfigPanelProvider
