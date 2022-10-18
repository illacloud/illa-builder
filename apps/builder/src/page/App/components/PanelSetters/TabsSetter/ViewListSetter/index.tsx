import { FC, memo, useCallback, useMemo } from "react"
import { Header } from "./header"
import { ViewItemShape, ViewSetterProps } from "./interface"
import { generateNewViewItem } from "./utils/generateNewOptions"
import { ListBody } from "./listBody"
import { ViewListSetterProvider } from "./context/viewsListContext"
import { get } from "lodash"
import { useSelector } from "react-redux"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { setterPublicWrapper, viewSetterWrapperStyle } from "./style"
import { RootState } from "@/store"

export const ViewListSetter: FC<ViewSetterProps> = memo(
  (props: ViewSetterProps) => {
    const {
      value,
      handleUpdateDsl,
      attrName,
      widgetDisplayName,
      childrenSetter,
      handleUpdateMultiAttrDSL,
      handleUpdateOtherMultiAttrDSL,
    } = props
    const executionResult = useSelector(getExecutionResult)

    const targetComponentProps = useSelector<RootState, Record<string, any>>(
      (rootState) => {
        const executionTree = getExecutionResult(rootState)
        return get(executionTree, widgetDisplayName, {})
      },
    )

    const targetContainerDisplayName = useMemo(() => {
      return get(targetComponentProps, "targetContainerId", "") as string
    }, [targetComponentProps])

    const allViews = useMemo(() => {
      return get(
        executionResult,
        `${targetContainerDisplayName}.${attrName}`,
        [],
      ) as ViewItemShape[]
    }, [attrName, executionResult, targetContainerDisplayName])

    console.log(allViews, attrName, "ViewListSetter value")

    const allViewsKeys = useMemo(() => {
      console.log(allViews, "ViewListSetter allViews")
      return allViews.map((view) => view.key)
    }, [allViews])

    const viewComponentsArray = useMemo(() => {
      return get(
        executionResult,
        `${targetContainerDisplayName}.viewComponentsArray`,
        [[]],
      )
    }, [executionResult, targetContainerDisplayName])

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
        list={allViews}
        childrenSetter={childrenSetter || []}
        handleUpdateDsl={handleUpdateDsl}
        widgetDisplayName={targetContainerDisplayName}
        attrPath={attrName}
        handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
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

ViewListSetter.displayName = "ViewListSetter"
