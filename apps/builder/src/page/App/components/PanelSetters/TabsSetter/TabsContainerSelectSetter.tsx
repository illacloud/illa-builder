import { FC, useCallback, useMemo } from "react"
import { ChartDataSourceSetterProps } from "@/page/App/components/PanelSetters/ChartSetter/interface"
import { useSelector } from "react-redux"
import {
  getAllContainerWidget,
  searchDSLByDisplayName,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { RootState } from "@/store"
import { debounce, get } from "lodash"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { getExecutionError } from "@/redux/currentApp/executionTree/executionSelector"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import { BaseSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/baseSelect"

export const TabsContainerSelectSetter: FC<ChartDataSourceSetterProps> = (
  props,
) => {
  const {
    value,
    handleUpdateDsl,
    widgetDisplayName,
    labelName,
    labelDesc,
    attrName,
    allowClear,
    componentNode,
    isSetterSingleRow,
    widgetOrAction,
    widgetType,
  } = props
  const containers = useSelector(getAllContainerWidget)
  console.log(containers, "getAllContainerWidget")
  const isError = useSelector<RootState, boolean>((state) => {
    const errors = getExecutionError(state)
    const thisError = get(errors, `${widgetDisplayName}.dataSource`)
    return thisError?.length > 0
  })

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      return searchDSLByDisplayName(widgetDisplayName, rootState)?.props || {}
    },
  )

  const selectedOptions = useMemo(() => {
    if (!containers) return
    return Object.keys(containers)
  }, [containers])

  const handleChange = useCallback((value: any) => {
    console.log(value, "handleChange")
  }, [])

  return (
    <div css={publicPaddingStyle}>
      <BaseSelectSetter
        options={selectedOptions}
        expectedType={VALIDATION_TYPES.OBJECT}
        onChange={handleChange}
        value={value}
        allowClear={allowClear}
        attrName={attrName}
        componentNode={componentNode}
        handleUpdateDsl={handleUpdateDsl}
        isSetterSingleRow={isSetterSingleRow}
        widgetDisplayName={widgetDisplayName}
        widgetOrAction={widgetOrAction}
        widgetType={widgetType}
      />
    </div>
  )
}

TabsContainerSelectSetter.displayName = "TabsContainerSelectSetter"
