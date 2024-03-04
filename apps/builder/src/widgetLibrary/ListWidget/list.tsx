import { convertPathToString } from "@illa-public/dynamic-string"
import { ComponentTreeNode } from "@illa-public/public-types"
import { klona } from "klona"
import { get, isEqual, set, toPath } from "lodash-es"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { getComponentMap } from "@/redux/currentApp/components/componentsSelector"
import {
  getExecutionResult,
  getRawTree,
} from "@/redux/currentApp/executionTree/executionSelector"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { getObjectPaths } from "@/utils/executionTreeHelper/utils"
import { isObject } from "@/utils/typeHelper"
import { VALIDATION_TYPES, validationFactory } from "@/utils/validationFactory"
import { ListWidgetProps } from "@/widgetLibrary/ListWidget/interface"
import ListWidgetWithAutoPagination from "./components/ListWidgetWithAutoPagination"
import ListWidgetWithServerPagination from "./components/ListWidgetWithServerPagination"
import { ComponentLoading } from "./components/Loading"

export const ListWidget: FC<ListWidgetProps> = (props) => {
  const {
    displayName,
    dataSources,
    childrenNode,
    enableServerSidePagination,
    paginationType,
    enablePagination,
    handleUpdateMultiExecutionResult,
    triggerEventHandler,
    disabled,
    loading,
    themeColor,
    page = 1,
    pageSize = 10,
  } = props

  const executionResult = useSelector(getExecutionResult)
  const rawTree = useSelector(getRawTree)
  const components = useSelector(getComponentMap)
  const [selectIndexForMark, setSelectIndexForMark] = useState<
    undefined | number
  >()

  const prevDataSourcesRef = useRef(dataSources)

  const updateTemplateContainerNodesProps = useCallback(
    (childrenNodeDisplayNames: string[]) => {
      return childrenNodeDisplayNames.map((itemContainerDisplayName, index) => {
        const currentItemContainer = klona(components[itemContainerDisplayName])
        const currentItemDisplayNames = currentItemContainer.childrenNode
        if (
          Array.isArray(currentItemDisplayNames) &&
          currentItemDisplayNames.length > 0
        ) {
          let newCurrentItems = currentItemDisplayNames.map(
            (currentItemDisplayName) => {
              const currentItem = JSON.parse(
                JSON.stringify(components[currentItemDisplayName]),
              ) as ComponentTreeNode
              if (
                currentItem.props &&
                Array.isArray(currentItem.props.$dynamicAttrPaths)
              ) {
                const { displayName } = currentItem
                const { $dynamicAttrPaths } = currentItem.props
                $dynamicAttrPaths.forEach((path) => {
                  const finalPath = convertPathToString(toPath(path))
                  const requireEvalString = get(
                    currentItem.props,
                    finalPath,
                    "",
                  )
                  let evalResult: unknown
                  try {
                    evalResult = evaluateDynamicString(
                      "",
                      requireEvalString,
                      executionResult,
                    )
                  } catch (e) {
                    console.log(e)
                    evalResult = ""
                  }
                  let value = evalResult
                  if (Array.isArray(evalResult) && evalResult.length > index) {
                    const rawWidget = rawTree[displayName]
                    if (rawWidget && isObject(rawWidget.$validationPaths)) {
                      const validationPaths = rawWidget.$validationPaths
                      const validationType = get(validationPaths, finalPath)
                      if (validationType === VALIDATION_TYPES.ARRAY) {
                        if (Array.isArray(evalResult)) {
                          const needSetValue = evalResult[index] ?? []
                          const validationFunc =
                            validationFactory[validationType]
                          const res = validationFunc?.(needSetValue, "")
                          value = res?.safeValue ?? needSetValue
                        } else {
                          const validationFunc =
                            validationFactory[validationType]
                          const res = validationFunc?.(evalResult, "")
                          value = res?.safeValue ?? evalResult
                        }
                      } else {
                        value = evalResult[index]
                        const validationFunc = validationFactory[validationType]
                        const res = validationFunc?.(value, "")
                        value = res?.safeValue ?? value
                      }
                    }
                  }
                  set(currentItem, `props.${finalPath}`, value)
                })
              }
              if (index !== 0) {
                set(
                  currentItem,
                  "displayName",
                  `list-child-${index}-${currentItemDisplayName}`,
                )
                if (disabled != undefined) {
                  set(currentItem, "props.disabled", disabled)
                }
              }
              return currentItem
            },
          )
          newCurrentItems = newCurrentItems.map((item) => {
            const displayName = item.displayName
            const displayNameArray = displayName.split("-")
            const realDisplayName = displayNameArray.at(-1)
            const rawWidget = rawTree[realDisplayName as string]
            const validationPaths = rawWidget.$validationPaths
            if (isObject(validationPaths)) {
              getObjectPaths(validationPaths).forEach((path) => {
                const validationType = get(
                  validationPaths,
                  path,
                ) as VALIDATION_TYPES
                const validationFunc = validationFactory[validationType]
                const currentValue = get(item, `props.${path}`, "")
                const res = validationFunc?.(currentValue, "")
                set(item, `props.${path}`, res?.safeValue)
              })
            }
            return item
          })
          set(currentItemContainer, "childrenNode", newCurrentItems)
        }
        if (index !== 0) {
          set(
            currentItemContainer,
            "displayName",
            `list-widget-container-${index}`,
          )
        }
        return currentItemContainer as unknown as ComponentTreeNode
      })
    },
    [components, disabled, executionResult, rawTree],
  )

  const transTemplateContainerNodes = useCallback(
    (templateContainerDisplayName: string) => {
      const canvasChildrenDisplayNames: string[] = []
      if (Array.isArray(dataSources) && dataSources.length > 0) {
        dataSources.forEach((v, index) => {
          canvasChildrenDisplayNames[index] = templateContainerDisplayName
        })
        return updateTemplateContainerNodesProps(canvasChildrenDisplayNames)
      } else {
        return updateTemplateContainerNodesProps([templateContainerDisplayName])
      }
    },
    [dataSources, updateTemplateContainerNodesProps],
  )

  const getChildrenNodes = useMemo(() => {
    if (childrenNode && childrenNode.length > 0 && dataSources) {
      let canvasDisplayName = childrenNode[0]
      return transTemplateContainerNodes(canvasDisplayName)
    }
    return null
  }, [childrenNode, dataSources, transTemplateContainerNodes])

  const handleUpdateSelectedItem = useCallback(
    (index?: number, isContainerClick?: boolean) => {
      if (!Array.isArray(dataSources) || disabled) return
      if (
        (selectIndexForMark === index && isContainerClick) ||
        index === undefined
      ) {
        setSelectIndexForMark(undefined)
      } else {
        setSelectIndexForMark(index)
      }
      new Promise((resolve) => {
        let value
        if (
          index === undefined ||
          (selectIndexForMark === index && isContainerClick)
        ) {
          value = {
            selectedItem: undefined,
            selectedIndex: undefined,
          }
        } else {
          const selectItemIndex = enableServerSidePagination
            ? index
            : index + page * (pageSize ?? 0)
          value = {
            selectedItem: dataSources[selectItemIndex],
            selectedIndex: index,
          }
        }
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value,
          },
        ])
        resolve(value)
      }).then(() => {
        triggerEventHandler("rowSelect")
      })
    },
    [
      dataSources,
      disabled,
      displayName,
      enableServerSidePagination,
      handleUpdateMultiExecutionResult,
      page,
      pageSize,
      selectIndexForMark,
      triggerEventHandler,
    ],
  )

  useEffect(() => {
    if (!isEqual(prevDataSourcesRef.current, dataSources)) {
      handleUpdateMultiExecutionResult?.([
        {
          displayName,
          value: {
            selectedIndex: undefined,
            selectedItem: undefined,
          },
        },
      ])
    }
  }, [dataSources, displayName, handleUpdateMultiExecutionResult])

  useEffect(() => {
    handleUpdateMultiExecutionResult?.([
      {
        displayName,
        value: {
          page: 0,
        },
      },
    ])
  }, [
    displayName,
    handleUpdateMultiExecutionResult,
    paginationType,
    enablePagination,
    enableServerSidePagination,
  ])

  return (
    <>
      {enableServerSidePagination ? (
        <ListWidgetWithServerPagination
          {...props}
          copyComponents={getChildrenNodes}
          selectIndexForMark={selectIndexForMark}
          handleUpdateSelectedItem={handleUpdateSelectedItem}
        />
      ) : (
        <ListWidgetWithAutoPagination
          {...props}
          copyComponents={getChildrenNodes}
          selectIndexForMark={selectIndexForMark}
          handleUpdateSelectedItem={handleUpdateSelectedItem}
        />
      )}
      {loading && <ComponentLoading themeColor={themeColor} />}
    </>
  )
}

export default ListWidget
