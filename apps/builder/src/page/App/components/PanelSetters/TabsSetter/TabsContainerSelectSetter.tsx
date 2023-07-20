import { get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { ChartDataSourceSetterProps } from "@/page/App/components/PanelSetters/ChartSetter/interface"
import { getAllContainerWidget } from "@/redux/currentApp/editor/components/componentsSelector"
import SearchSelectSetter from "../SelectSetter/searchSelect"

const TabsContainerSelectSetter: FC<ChartDataSourceSetterProps> = (props) => {
  const {
    value,
    handleUpdateMultiAttrDSL,
    handleUpdateOtherMultiAttrDSL,
    widgetDisplayName,
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
    <SearchSelectSetter
      {...props}
      options={selectedOptions}
      handleUpdateDsl={handleUpdateDsl}
    />
  )
}

TabsContainerSelectSetter.displayName = "TabsContainerSelectSetter"

export default TabsContainerSelectSetter
