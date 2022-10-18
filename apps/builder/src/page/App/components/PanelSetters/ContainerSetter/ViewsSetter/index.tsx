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
import { useDispatch, useSelector } from "react-redux"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import {
  setterPublicWrapper,
  viewSetterWrapperStyle,
} from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/style"
import { generateComponentNode } from "@/utils/generators/generateComponentNode"
import { BasicContainerConfig } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { RootState } from "@/store"

export const ViewsSetter: FC<ViewSetterProps> = memo(
  (props: ViewSetterProps) => {
    const {
      value,
      handleUpdateDsl,
      attrName,
      widgetDisplayName,
      childrenSetter,
      handleUpdateMultiAttrDSL,
      handleUpdateOtherMultiAttrDSL,
      componentNode,
    } = props
    const executionResult = useSelector(getExecutionResult)
    const dispatch = useDispatch()

    const targetComponentProps = useSelector<RootState, Record<string, any>>(
      (rootState) => {
        const executionTree = getExecutionResult(rootState)
        return get(executionTree, widgetDisplayName, {})
      },
    )

    const linkWidgetDisplayName = useMemo(() => {
      return get(targetComponentProps, "linkWidgetDisplayName", "") as string
    }, [targetComponentProps])

    const allViews = useMemo(() => {
      return get(
        executionResult,
        `${widgetDisplayName}.${attrName}`,
        [],
      ) as ViewItemShape[]
    }, [attrName, executionResult, widgetDisplayName])

    const allViewsKeys = useMemo(() => {
      return allViews.map((view) => view.key)
    }, [allViews])

    const viewComponentsArray = useMemo(() => {
      return get(executionResult, `${widgetDisplayName}.viewComponentsArray`, [
        [],
      ])
    }, [executionResult, widgetDisplayName])

    const handleAddViewItem = useCallback(() => {
      const newItem = generateNewViewItem(allViewsKeys)
      const newChildrenNodes = generateComponentNode(
        BasicContainerConfig,
        componentNode.displayName,
      )
      handleUpdateMultiAttrDSL?.({
        [attrName]: [...value, newItem],
        viewComponentsArray: [...viewComponentsArray, []],
      })
      if (linkWidgetDisplayName) {
        handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, {
          [attrName]: [...value, newItem],
        })
      }
      dispatch(componentsActions.addComponentReducer([newChildrenNodes]))
    }, [
      allViewsKeys,
      componentNode.displayName,
      handleUpdateMultiAttrDSL,
      attrName,
      value,
      viewComponentsArray,
      dispatch,
    ])

    return (
      <ViewListSetterProvider
        viewsList={value}
        childrenSetter={childrenSetter || []}
        handleUpdateDsl={handleUpdateDsl}
        widgetDisplayName={widgetDisplayName}
        linkWidgetDisplayName={linkWidgetDisplayName}
        attrPath={attrName}
        handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
        handleUpdateOtherMultiAttrDSL={handleUpdateOtherMultiAttrDSL}
        componentNode={componentNode}
      >
        <div css={setterPublicWrapper}>
          <div css={viewSetterWrapperStyle}>
            <Header
              labelName="view"
              addAction={handleAddViewItem}
              hasAddAction
            />
            <ListBody />
          </div>
        </div>
      </ViewListSetterProvider>
    )
  },
)

ViewsSetter.displayName = "ViewsSetter"
