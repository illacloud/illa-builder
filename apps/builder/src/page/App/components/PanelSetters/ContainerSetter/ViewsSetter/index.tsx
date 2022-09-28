import { FC, memo, useCallback, useMemo } from "react"
import { Header } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/header"
import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import {
  ViewItemShape,
  ViewSetterProps,
} from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/interface"
import { generateNewOptionItem } from "@/page/App/components/PanelSetters/OptionListSetter/utils/generateNewOptions"
import { generateNewViewItem } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/utils/generateNewOptions"
import { ListBody } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/listBody"
import { ViewListSetterProvider } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/context/viewsListContext"
import { get } from "lodash"
import { useSelector } from "react-redux"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"

export const viewSetterWrapperStyle = css`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

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

    const handleAddViewItem = useCallback(() => {
      const newItem = generateNewViewItem(allViewsKeys)
      handleUpdateDsl(attrName, [...value, newItem])
    }, [allViewsKeys, handleUpdateDsl, attrName, value])

    const handleReorderViewItem = useCallback(
      (viewsItem: ViewItemShape[]) => {
        handleUpdateDsl(attrName, viewsItem)
      },
      [attrName, handleUpdateDsl],
    )

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
          <ListBody handleReorderViewItem={handleReorderViewItem} />
        </div>
      </ViewListSetterProvider>
    )
  },
)

ViewsSetter.displayName = "ViewsSetter"
