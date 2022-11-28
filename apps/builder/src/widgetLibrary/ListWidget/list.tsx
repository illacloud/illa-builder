import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  ListWidgetProps,
  OVERFLOW_TYPE,
  RenderTemplateContainerProps,
} from "@/widgetLibrary/ListWidget/interface"
import {
  listContainerStyle,
  listItemStyle,
  listParentContainerStyle,
  ListParentContainerWithScroll,
  paginationWrapperStyle,
} from "@/widgetLibrary/ListWidget/style"
import useMeasure from "react-use-measure"
import { Pagination } from "@illa-design/pagination"
import { chunk, cloneDeep, get, isEqual, set } from "lodash"
import { useDrop } from "react-dnd"
import {
  DragInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import {
  applyBarHandlerStyle,
  applyBarPointerStyle,
  applyDashedLineStyle,
} from "@/page/App/components/ScaleSquare/style"
import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import store from "@/store"
import { getIllaMode } from "@/redux/config/configSelector"
import {
  BasicContainer,
  BasicContainerWithJSON,
} from "@/widgetLibrary/BasicContainer/BasicContainer"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { BUILDER_CALC_CONTEXT } from "@/page/App/context/globalDataProvider"

interface DragCollection {
  isDraggingActive: boolean
}

const RenderTemplateContainer: FC<RenderTemplateContainerProps> = (props) => {
  const { templateComponentNodes, templateContainerHeight } = props
  return (
    <BasicContainer
      componentNode={templateComponentNodes}
      canResizeY={false}
      minHeight={templateContainerHeight - 16}
      padding={8}
      addedRowNumber={0}
    />
  )
}

const RenderCopyContainer: FC<RenderTemplateContainerProps> = (props) => {
  const { templateComponentNodes, templateContainerHeight } = props
  return (
    <BasicContainerWithJSON
      componentNode={templateComponentNodes}
      canResizeY={false}
      minHeight={templateContainerHeight - 16}
      padding={8}
      addedRowNumber={0}
    />
  )
}

const resizeBottomHandler = () => {
  const rootState = store.getState()
  const illaMode = getIllaMode(rootState)
  const scaleSquareState = illaMode !== "edit" ? "production" : "normal"
  return {
    bottom: (
      <div css={applyBarHandlerStyle(true, scaleSquareState, "b")}>
        <div
          className="handler"
          css={applyBarPointerStyle(true, scaleSquareState, "b")}
        />
      </div>
    ),
  }
}

const handleResizeStart: ResizeStartCallback = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

export const ListWidgetWithPagination: FC<ListWidgetProps> = (props) => {
  const {
    dataSources = [1, 2, 3, 4, 5, 6],
    itemHeight = 48,
    displayName,
    currentPage,
    handleUpdateMultiExecutionResult,
  } = props
  const [containerRef, containerBounds] = useMeasure()

  const itemNumber = useMemo(() => {
    return Math.floor(containerBounds.height / itemHeight) || dataSources.length
  }, [containerBounds.height, dataSources.length, itemHeight])

  const handleChangeCurrentPage = useCallback(
    (pageNumber: number, pageSize: number) => {
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            currentPage: pageNumber,
          },
        },
      ])
    },
    [displayName, handleUpdateMultiExecutionResult],
  )

  const currentData = useMemo(() => {
    const chunkData = chunk(dataSources, itemNumber)
    return currentPage < chunkData.length
      ? chunkData[currentPage]
      : chunkData[0]
  }, [currentPage, dataSources, itemNumber])

  return (
    <div css={listParentContainerStyle}>
      <div css={listContainerStyle} ref={containerRef}>
        {currentData?.map((item) => {
          return (
            <div css={listItemStyle} key={JSON.stringify(item)}>
              1111
            </div>
          )
        })}
      </div>
      <div css={paginationWrapperStyle}>
        <Pagination
          total={dataSources.length}
          currentPage={currentPage}
          pageSize={itemNumber}
          size="medium"
          sizeCanChange={false}
          hideOnSinglePage={false}
          simple
          onChange={handleChangeCurrentPage}
        />
      </div>
    </div>
  )
}

export const ListWidgetWithScroll: FC<ListWidgetProps> = (props) => {
  const {
    dataSources = [1, 2, 3, 4, 5, 6],
    overflowMethod,
    pageSize,
    itemHeight = 48,
    displayName,
    currentPage,
    handleUpdateMultiExecutionResult,
    handleUpdateOriginalDSLMultiAttr,
    childrenNode,
  } = props
  const [containerRef, containerBounds] = useMeasure()
  const [isMouseHover, setIsMouseHover] = useState(false)
  const propsRef = useRef(props)

  useEffect(() => {
    if (!isEqual(propsRef.current, props)) {
      propsRef.current = props
    }
  }, [props])

  const [{ isDraggingActive }, dropRef] = useDrop<
    DragInfo,
    DropResultInfo,
    DragCollection
  >(
    () => ({
      accept: ["components"],
      hover: (dragInfo, monitor) => {},
      drop: (dropInfo, monitor) => {
        const { item } = dropInfo

        return {
          isDropOnCanvas: true,
        }
      },
      collect: (monitor) => {
        return {
          isDraggingActive: monitor.isOver(),
        }
      },
    }),
    [],
  )

  const handleOnResizeTopStop: ResizeCallback = useCallback(
    (e, dir, elementRef, delta) => {
      const { height } = delta
      let finalHeight = itemHeight + height
      handleUpdateOriginalDSLMultiAttr({
        itemHeight: finalHeight,
      })
    },
    [handleUpdateOriginalDSLMultiAttr, itemHeight],
  )

  const updateTemplateContainerNodesProps = useCallback(
    (childrenNodes: ComponentNode[]) => {
      let updateSlice = []
      const newChildrenNodes = childrenNodes.map((itemContainer, index) => {
        const currentItems = itemContainer.childrenNode
        if (Array.isArray(currentItems) && currentItems.length > 0) {
          const newCurrentItems = currentItems.map((currentItem) => {
            if (
              currentItem.props &&
              Array.isArray(currentItem.props.$dynamicAttrPaths)
            ) {
              const { $dynamicAttrPaths } = currentItem.props
              $dynamicAttrPaths.forEach((path) => {
                const requireEvalString = get(currentItem.props, path, "")
                let evalResult = ""
                try {
                  evalResult = evaluateDynamicString("", requireEvalString, {
                    ...BUILDER_CALC_CONTEXT,
                    [displayName]: propsRef.current,
                  })
                } catch (e) {
                  console.log(e)
                }
                if (Array.isArray(evalResult) && evalResult.length > index) {
                  const value = evalResult[index]
                  set(currentItem, `props.${path}`, value)
                  const currentItemProps = get(currentItem, "props", {})
                  if (index === 0) {
                    updateSlice.push({
                      displayName: currentItem.displayName,
                      value: {
                        ...currentItemProps,
                      },
                    })
                  }
                }
              })
            }
            if (index !== 0) {
              set(
                currentItem,
                "displayName",
                `list-child-${index}-${currentItem.displayName}`,
              )
            }
            return currentItem
          })
          set(itemContainer, "childrenNode", newCurrentItems)
        }
        if (index !== 0) {
          set(itemContainer, "displayName", `list-widget-container-${index}`)
        }
        return itemContainer
      })
      setTimeout(() => {
        handleUpdateMultiExecutionResult(updateSlice)
      }, 100)
      return newChildrenNodes
    },
    [displayName, handleUpdateMultiExecutionResult],
  )

  const transTemplateContainerNodes = useCallback(
    (templateContainerNode: ComponentNode) => {
      const canvasChildrenArray: ComponentNode[] = []
      if (dataSources.length > 0) {
        dataSources.forEach((v, index) => {
          canvasChildrenArray[index] = cloneDeep(templateContainerNode)
        })
        return updateTemplateContainerNodesProps(canvasChildrenArray)
      } else {
        return updateTemplateContainerNodesProps([templateContainerNode])
      }
    },
    [dataSources, updateTemplateContainerNodesProps],
  )

  const renderChildrenNodes = useMemo(() => {
    if (childrenNode && childrenNode.length > 0 && dataSources) {
      const children = cloneDeep(childrenNode)
      let canvas = children[0]
      const templateContainerNodes = canvas.childrenNode
      let finalCanvas = transTemplateContainerNodes(canvas)
      return finalCanvas.map((node, index) => {
        if (index === 0) {
          return null
        }
        return (
          <div
            css={listItemStyle}
            key={node.displayName}
            style={{ height: `${itemHeight}px` }}
          >
            <RenderCopyContainer
              templateComponentNodes={node}
              templateContainerHeight={itemHeight}
            />
          </div>
        )
      })
    }
    return null
  }, [childrenNode, dataSources, itemHeight, transTemplateContainerNodes])

  return (
    <div
      css={ListParentContainerWithScroll}
      ref={containerRef}
      onMouseEnter={() => {
        setIsMouseHover(true)
      }}
      onMouseLeave={() => {
        setIsMouseHover(false)
      }}
    >
      <Resizable
        size={{
          width: "100%",
          height: itemHeight,
        }}
        bounds="parent"
        minHeight={48}
        maxHeight={containerBounds.height - 4}
        handleComponent={
          isMouseHover && !isDraggingActive ? resizeBottomHandler() : undefined
        }
        enable={{
          bottom: true,
        }}
        onResizeStart={handleResizeStart}
        onResizeStop={handleOnResizeTopStop}
      >
        <div css={listItemStyle}>
          <RenderTemplateContainer
            templateComponentNodes={childrenNode[0]}
            templateContainerHeight={itemHeight}
          />
        </div>
        {isMouseHover && !isDraggingActive && (
          <div css={applyDashedLineStyle(false, true, false)} />
        )}
      </Resizable>
      {renderChildrenNodes}
    </div>
  )
}

export const ListWidget: FC<ListWidgetProps> = (props) => {
  const {
    overflowMethod,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
  } = props

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, { ...props })

    return () => {
      handleDeleteGlobalData?.(displayName)
    }
  }, [displayName, handleDeleteGlobalData, handleUpdateGlobalData, props])

  return overflowMethod === OVERFLOW_TYPE.PAGINATION ? (
    <ListWidgetWithPagination {...props} />
  ) : (
    <ListWidgetWithScroll {...props} />
  )
}
