import { get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { ChartDataSourceSetterProps } from "@/page/App/components/PanelSetters/ChartSetter/interface"
import { BaseSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/baseSelect"
import { getAllContainerWidget } from "@/redux/currentApp/editor/components/componentsSelector"

export const TabsContainerSelectSetter: FC<ChartDataSourceSetterProps> = (
  props,
) => {
  const {
    value,
    handleUpdateMultiAttrDSL,
    handleUpdateOtherMultiAttrDSL,
    widgetDisplayName,
    attrName,
    allowClear,
    componentNode,
    isSetterSingleRow,
    widgetOrAction,
    widgetType,
    expectedType,
  } = props
  const containers = useSelector(getAllContainerWidget)

  const selectedOptions = useMemo(() => {
    if (!containers) return
    return Object.keys(containers)
  }, [containers])

  const handleUpdateDsl = useCallback(
    (attrName: string, targetDisplayName: string) => {
      try {
        const newList = get(containers, `${targetDisplayName}.viewList`, {})
        const currentIndex = get(
          containers,
          `${targetDisplayName}.currentIndex`,
          0,
        )
        const currentKey = get(
          containers,
          `${targetDisplayName}.currentKey`,
          "",
        )
        handleUpdateMultiAttrDSL?.({
          viewList: newList,
          currentIndex,
          currentKey,
          [attrName]: targetDisplayName,
        })
        if (value) {
          // remove old link
          handleUpdateOtherMultiAttrDSL?.(value, {
            linkWidgetDisplayName: undefined,
          })
        }
        // add new link
        handleUpdateOtherMultiAttrDSL?.(targetDisplayName, {
          linkWidgetDisplayName: widgetDisplayName,
        })
      } catch {}
      handleUpdateMultiAttrDSL?.({
        [attrName]: targetDisplayName,
      })
    },
    [
      containers,
      handleUpdateMultiAttrDSL,
      handleUpdateOtherMultiAttrDSL,
      value,
      widgetDisplayName,
    ],
  )

  return (
    <BaseSelectSetter
      options={selectedOptions}
      expectedType={expectedType}
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
  )
}

TabsContainerSelectSetter.displayName = "TabsContainerSelectSetter"
