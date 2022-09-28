import { FC, memo, useCallback, useMemo } from "react"
import { Header } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/header"
import {
  ViewItemShape,
  ViewSetterProps,
} from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/interface"
import { generateNewViewItem } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/utils/generateNewOptions"
import { ListBody } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/listBody"
import { ViewListSetterProvider } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/context/viewsListContext"
import { get } from "lodash"
import { useSelector } from "react-redux"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { viewSetterWrapperStyle } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/style"

export const ViewsSetter: FC<ViewSetterProps> = memo(
  (props: ViewSetterProps) => {
    const {
      value,
      handleUpdateDsl,
      attrName,
      widgetDisplayName,
      childrenSetter,
      handleUpdateMultiAttrDSL,
    } = props
    const executionResult = useSelector(getExecutionResult)

    const allViews = useMemo(() => {
      return get(
        executionResult,
        `${widgetDisplayName}.${attrName}`,
        [],
      ) as ViewItemShape[]
    }, [attrName, executionResult, widgetDisplayName])

    const allViewsKeys = useMemo(() => {
      return allViews.map(view => view.key)
    }, [allViews])

    const viewComponentsArray = useMemo(() => {
      return get(executionResult, `${widgetDisplayName}.viewComponentsArray`, [
        [],
      ])
    }, [executionResult, widgetDisplayName])

    const handleAddViewItem = useCallback(() => {
      const newItem = generateNewViewItem(allViewsKeys)
      handleUpdateMultiAttrDSL?.({
        [attrName]: [...value, newItem],
        viewComponentsArray: [...viewComponentsArray, []],
      })
    }, [
      allViewsKeys,
      handleUpdateMultiAttrDSL,
      attrName,
      value,
      viewComponentsArray,
    ])

    return (
      <ViewListSetterProvider
        viewsList={value}
        childrenSetter={childrenSetter || []}
        handleUpdateDsl={handleUpdateDsl}
        widgetDisplayName={widgetDisplayName}
        attrPath={attrName}
        handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
      >
        <div css={viewSetterWrapperStyle}>
          <Header labelName="view" addAction={handleAddViewItem} hasAddAction />
          <ListBody />
        </div>
      </ViewListSetterProvider>
    )
  },
)

ViewsSetter.displayName = "ViewsSetter"
