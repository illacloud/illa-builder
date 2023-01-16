import { get } from "lodash"
import { FC, memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { ViewListSetterProvider } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/context/viewsListContext"
import { Header } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/header"
import {
  ViewItemShape,
  ViewSetterProps,
} from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/interface"
import { ListBody } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/listBody"
import {
  setterPublicWrapper,
  viewSetterWrapperStyle,
} from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/style"
import { generateNewViewItem } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/utils/generateNewOptions"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import store, { RootState } from "@/store"
import { generateComponentNode } from "@/utils/generators/generateComponentNode"
import { BasicContainerConfig } from "@/widgetLibrary/BasicContainer/BasicContainer"

export const ViewsSetter: FC<ViewSetterProps> = memo(
  (props: ViewSetterProps) => {
    const {
      value,
      attrName,
      widgetDisplayName,
      childrenSetter,
      handleUpdateMultiAttrDSL,
      handleUpdateOtherMultiAttrDSL,
      componentNode,
    } = props
    const { t } = useTranslation()
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

    const updateMultiAttrDSL = useCallback(
      (updateSlice: Record<string, unknown>) => {
        handleUpdateMultiAttrDSL?.(updateSlice)
        if (linkWidgetDisplayName) {
          handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, updateSlice)
        }
      },
      [
        handleUpdateMultiAttrDSL,
        handleUpdateOtherMultiAttrDSL,
        linkWidgetDisplayName,
      ],
    )

    const handleUpdateDsl = useCallback(
      (attrName: string, value: any) => {
        handleUpdateMultiAttrDSL?.({
          [attrName]: value,
        })
        if (linkWidgetDisplayName) {
          handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, {
            [attrName]: value,
          })
        }
      },
      [
        handleUpdateMultiAttrDSL,
        handleUpdateOtherMultiAttrDSL,
        linkWidgetDisplayName,
      ],
    )

    const _componentNode = useMemo(() => {
      if (componentNode.type === "CONTAINER_WIDGET") {
        return componentNode
      }
      const finalNode = searchDsl(
        getCanvas(store.getState()),
        linkWidgetDisplayName,
      )
      if (finalNode?.type === "CONTAINER_WIDGET") return finalNode
      return {} as ComponentNode
    }, [componentNode, linkWidgetDisplayName])

    const handleAddViewItem = useCallback(() => {
      const newItem = generateNewViewItem(allViewsKeys)
      const newChildrenNodes = generateComponentNode(
        BasicContainerConfig,
        _componentNode?.displayName,
      )
      handleUpdateMultiAttrDSL?.({
        [attrName]: [...value, newItem],
      })
      if (linkWidgetDisplayName) {
        handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, {
          [attrName]: [...value, newItem],
        })
      }
      dispatch(componentsActions.addComponentReducer([newChildrenNodes]))
    }, [
      allViewsKeys,
      _componentNode?.displayName,
      handleUpdateMultiAttrDSL,
      attrName,
      value,
      linkWidgetDisplayName,
      dispatch,
      handleUpdateOtherMultiAttrDSL,
    ])

    return (
      <ViewListSetterProvider
        viewsList={value}
        childrenSetter={childrenSetter || []}
        widgetDisplayName={widgetDisplayName}
        attrPath={attrName}
        handleUpdateDsl={handleUpdateDsl}
        handleUpdateMultiAttrDSL={updateMultiAttrDSL}
        handleUpdateOtherMultiAttrDSL={handleUpdateOtherMultiAttrDSL}
        componentNode={_componentNode}
      >
        <div css={setterPublicWrapper}>
          <div css={viewSetterWrapperStyle}>
            <Header
              labelName={t("editor.inspect.setter_content.view_setter.views")}
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
