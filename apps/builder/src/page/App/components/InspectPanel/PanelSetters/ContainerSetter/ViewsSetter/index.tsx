import { ComponentMapNode } from "@illa-public/public-types"
import { get } from "lodash-es"
import { FC, memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { ViewListSetterProvider } from "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/ViewsSetter/context/viewsListContext"
import { Header } from "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/ViewsSetter/header"
import {
  ViewItemShape,
  ViewSetterProps,
} from "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/ViewsSetter/interface"
import { ListBody } from "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/ViewsSetter/listBody"
import {
  setterPublicWrapper,
  viewSetterWrapperStyle,
} from "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/ViewsSetter/style"
import { generateNewViewItem } from "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/ViewsSetter/utils/generateNewOptions"
import {
  getComponentMap,
  searchComponentFromMap,
} from "@/redux/currentApp/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import store, { RootState } from "@/store"
import { newGenerateChildrenComponentNode } from "@/utils/generators/generateComponentNode"
import { BasicContainerConfig } from "@/widgetLibrary/BasicContainer/BasicContainer"

const ViewsSetter: FC<ViewSetterProps> = memo((props: ViewSetterProps) => {
  const {
    value,
    attrName,
    widgetDisplayName,
    childrenSetter,
    handleUpdateExecutionResult,
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
        if (Array.isArray(linkWidgetDisplayName)) {
          linkWidgetDisplayName.forEach((linkDisplayName) => {
            handleUpdateOtherMultiAttrDSL?.(linkDisplayName, updateSlice)
          })
        } else {
          handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, updateSlice)
          const linkWidgetLinkedDisplayName = get(
            executionResult,
            `${linkWidgetDisplayName}.linkWidgetDisplayName`,
            [],
          )
          linkWidgetLinkedDisplayName &&
            Array.isArray(linkWidgetLinkedDisplayName) &&
            linkWidgetLinkedDisplayName.forEach((name) => {
              name !== widgetDisplayName &&
                handleUpdateOtherMultiAttrDSL?.(name, updateSlice)
            })
        }
      }
    },
    [
      executionResult,
      handleUpdateMultiAttrDSL,
      handleUpdateOtherMultiAttrDSL,
      linkWidgetDisplayName,
      widgetDisplayName,
    ],
  )

  const handleUpdateDsl = useCallback(
    (attrName: string, value: any) => {
      handleUpdateMultiAttrDSL?.({
        [attrName]: value,
      })
      if (linkWidgetDisplayName) {
        if (Array.isArray(linkWidgetDisplayName)) {
          linkWidgetDisplayName.forEach((linkDisplayName) => {
            handleUpdateOtherMultiAttrDSL?.(linkDisplayName, {
              [attrName]: value,
            })
          })
        } else {
          handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, {
            [attrName]: value,
          })
          const linkWidgetLinkedDisplayName = get(
            executionResult,
            `${linkWidgetDisplayName}.linkWidgetDisplayName`,
            [],
          )
          linkWidgetLinkedDisplayName &&
            Array.isArray(linkWidgetLinkedDisplayName) &&
            linkWidgetLinkedDisplayName.forEach((name) => {
              name !== widgetDisplayName &&
                handleUpdateOtherMultiAttrDSL?.(name, {
                  [attrName]: value,
                })
            })
        }
      }
    },
    [
      handleUpdateMultiAttrDSL,
      linkWidgetDisplayName,
      handleUpdateOtherMultiAttrDSL,
      executionResult,
      widgetDisplayName,
    ],
  )

  const _componentNode = useMemo(() => {
    if (componentNode.type === "CONTAINER_WIDGET") {
      return componentNode
    }
    const finalNode = searchComponentFromMap(
      getComponentMap(store.getState()),
      linkWidgetDisplayName,
    )
    if (finalNode?.type === "CONTAINER_WIDGET") return finalNode
    return {} as ComponentMapNode
  }, [componentNode, linkWidgetDisplayName])

  const handleAddViewItem = useCallback(() => {
    const newItem = generateNewViewItem(allViewsKeys)
    const newChildrenNodes = newGenerateChildrenComponentNode(
      BasicContainerConfig,
      _componentNode?.displayName,
    )
    handleUpdateMultiAttrDSL?.({
      [attrName]: [...value, newItem],
    })
    if (linkWidgetDisplayName) {
      if (Array.isArray(linkWidgetDisplayName)) {
        linkWidgetDisplayName.forEach((linkDisplayName) => {
          handleUpdateOtherMultiAttrDSL?.(linkDisplayName, {
            [attrName]: [...value, newItem],
          })
        })
      } else {
        handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, {
          [attrName]: [...value, newItem],
        })
        const linkWidgetLinkedDisplayName = get(
          executionResult,
          `${linkWidgetDisplayName}.linkWidgetDisplayName`,
          [],
        )
        linkWidgetLinkedDisplayName &&
          Array.isArray(linkWidgetLinkedDisplayName) &&
          linkWidgetLinkedDisplayName.forEach((name) => {
            name !== widgetDisplayName &&
              handleUpdateOtherMultiAttrDSL?.(name, {
                [attrName]: [...value, newItem],
              })
          })
      }
    }
    dispatch(componentsActions.addComponentReducer([newChildrenNodes]))
  }, [
    _componentNode?.displayName,
    allViewsKeys,
    attrName,
    dispatch,
    executionResult,
    handleUpdateMultiAttrDSL,
    handleUpdateOtherMultiAttrDSL,
    linkWidgetDisplayName,
    value,
    widgetDisplayName,
  ])

  return (
    <ViewListSetterProvider
      viewsList={value}
      childrenSetter={childrenSetter || []}
      widgetDisplayName={widgetDisplayName}
      attrPath={attrName}
      handleUpdateDsl={handleUpdateDsl}
      handleUpdateMultiAttrDSL={updateMultiAttrDSL}
      handleUpdateExecutionResult={handleUpdateExecutionResult}
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
})

ViewsSetter.displayName = "ViewsSetter"

export default ViewsSetter
