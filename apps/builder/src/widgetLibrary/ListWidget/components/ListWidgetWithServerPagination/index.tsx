import { isEqual } from "lodash-es"
import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useMeasure from "react-use-measure"
import { Pagination } from "@illa-design/react"
import { applyDashedLineStyle } from "@/page/App/components/ScaleSquare/style"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getShadowStyle } from "@/utils/styleUtils/shadow"
import {
  ListWidgetPropsWithChildrenNodes,
  PAGINATION_TYPE,
} from "@/widgetLibrary/ListWidget/interface"
import {
  ListParentContainerWithScroll,
  applyListItemStyle,
  itemContainerStyle,
  paginationWrapperStyle,
  selectStyle,
} from "@/widgetLibrary/ListWidget/style"
import { resizeBottomHandler } from "../../utils"
import CursorBasedSelector from "../CursorBasedSelector"
import RenderCopyContainer from "../RenderCopyContainer"
import RenderTemplateContainer from "../RenderTemplateContainer"

const ListWidgetWithServerPagination: FC<ListWidgetPropsWithChildrenNodes> = (
  props,
) => {
  const {
    itemHeight = 48,
    handleUpdateOriginalDSLMultiAttr,
    childrenNode,
    copyComponents = [],
    handleUpdateSelectedItem,
    itemBackGroundColor,
    columnNumber,
    pageSize,
    paginationType,
    totalRowCount = 1,
    nextCursor,
    previousCursor,
    itemGap,
    page = 0,
    itemBorderColor,
    itemBorderRadius,
    itemBorderWidth,
    itemShadow,
    enableServerSidePagination,
    dynamicHeight,
    updateComponentHeight,
    h,
    dynamicMinHeight,
    dynamicMaxHeight,
    displayName,
    handleUpdateMultiExecutionResult,
    triggerEventHandler,
    enablePagination,
    disabled,
    selectIndexForMark,
    themeColor,
    loading,
    itemPadding,
  } = props
  const [containerRef, containerBounds] = useMeasure()
  const [paginationRef, paginationBounds] = useMeasure()
  const [isMouseHover, setIsMouseHover] = useState(false)
  const safePageSize = !pageSize ? 0 : pageSize

  const currentContainerBoundsHeight =
    containerBounds.height - paginationBounds.height
  const isEditMode = useSelector(getIsILLAEditMode)
  const dispatch = useDispatch()

  const propsRef = useRef(props)
  const handleChangePage = useCallback(
    (pageNumber: number) => {
      if (pageNumber <= 0 || disabled) return
      handleUpdateSelectedItem()
      new Promise((resolve) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              page: pageNumber - 1,
            },
          },
        ])
        resolve(true)
      }).then(() => {
        triggerEventHandler("pageChange")
      })
    },
    [
      disabled,
      displayName,
      handleUpdateMultiExecutionResult,
      handleUpdateSelectedItem,
      triggerEventHandler,
    ],
  )

  const handleCursorBasedChangePage = useCallback(
    (isNext: boolean) => {
      if ((page <= 0 && !isNext) || disabled) return
      handleUpdateSelectedItem()
      let value: {
        page: number
        beforeCursor: string | undefined
        afterCursor: string | undefined
      }
      if (isNext) {
        value = {
          page: page + 1,
          beforeCursor: undefined,
          afterCursor: nextCursor,
        }
      } else {
        value = {
          page: page - 1,
          beforeCursor: previousCursor,
          afterCursor: undefined,
        }
      }
      new Promise((resolve) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value,
          },
        ])
        resolve(true)
      }).then(() => {
        triggerEventHandler("pageChange")
      })
    },
    [
      disabled,
      displayName,
      handleUpdateMultiExecutionResult,
      handleUpdateSelectedItem,
      nextCursor,
      page,
      previousCursor,
      triggerEventHandler,
    ],
  )

  useEffect(() => {
    if (!isEqual(propsRef.current, props)) {
      propsRef.current = props
    }
  }, [props])

  const handleResizeStart: ResizeStartCallback = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(
      configActions.setResizingNodeIDsReducer([
        `${displayName}-resize-listItem`,
      ]),
    )
  }

  const handleOnResizeTopStop: ResizeCallback = useCallback(
    (e, dir, elementRef, delta) => {
      let finalHeight = itemHeight + delta.height
      handleUpdateOriginalDSLMultiAttr({
        itemHeight: finalHeight,
      })
      dispatch(configActions.setResizingNodeIDsReducer([]))
    },
    [dispatch, handleUpdateOriginalDSLMultiAttr, itemHeight],
  )

  const canShowBorder = isEditMode && isMouseHover

  const shadowStyle = getShadowStyle(itemShadow)
  const borderStyle = useMemo(() => {
    let borderWidth, borderRadius
    const borderWidthNum = itemBorderWidth?.match(/\d+(\.\d+)?/g)
    if (borderWidthNum) borderWidth = borderWidthNum?.join("") + "px"
    const radiusNum = itemBorderRadius?.match(/\d+(\.\d+)?/g)
    if (radiusNum) borderRadius = radiusNum?.join("") + "px"
    return `
    border: ${
      borderWidth ? `${borderWidth} solid ${itemBorderColor}` : "unset"
    };
      border-radius: ${borderRadius ?? "unset"}
    `
  }, [itemBorderColor, itemBorderRadius, itemBorderWidth])

  useEffect(() => {
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: {
          offset: safePageSize * page,
        },
      },
    ])
  }, [displayName, handleUpdateMultiExecutionResult, page, safePageSize])

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
      <div css={itemContainerStyle(itemGap, itemShadow)}>
        <Resizable
          size={{
            width: "100%",
            height: itemHeight,
          }}
          bounds="parent"
          minHeight={48}
          maxHeight={
            dynamicHeight !== "fixed"
              ? "unset"
              : currentContainerBoundsHeight - 4
          }
          handleComponent={isMouseHover ? resizeBottomHandler() : undefined}
          enable={
            dynamicHeight !== "fixed"
              ? {}
              : {
                  bottom: true,
                }
          }
          onResizeStart={handleResizeStart}
          onResizeStop={handleOnResizeTopStop}
        >
          <div
            css={selectStyle(
              selectIndexForMark === 0,
              isEditMode,
              themeColor,
              itemBorderRadius,
            )}
          >
            <div
              css={applyListItemStyle(
                true,
                canShowBorder,
                itemBackGroundColor,
                shadowStyle,
                borderStyle,
                isEditMode,
                loading,
              )}
              onClick={(e) => {
                const isClickOnContainer = !!(
                  e.target as HTMLElement
                )?.getAttribute("data-list-widget-container")
                handleUpdateSelectedItem(0, isClickOnContainer)
              }}
            >
              <RenderTemplateContainer
                templateComponentDisplayName={childrenNode[0]}
                templateContainerHeight={itemHeight}
                columnNumber={columnNumber}
                dynamicHeight={dynamicHeight}
                extraHeight={paginationBounds.height}
                itemShadow={itemShadow}
                enableAutoPagination={enablePagination}
                handleUpdateOriginalDSLMultiAttr={
                  handleUpdateOriginalDSLMultiAttr
                }
                itemNumber={copyComponents?.length}
                updateComponentHeight={updateComponentHeight}
                h={h}
                dynamicMinHeight={dynamicMinHeight}
                dynamicMaxHeight={dynamicMaxHeight}
                itemGap={itemGap}
                itemPadding={itemPadding}
              />
            </div>
          </div>
          {canShowBorder && (
            <div css={applyDashedLineStyle(false, true, false)} />
          )}
        </Resizable>
        {copyComponents?.map((node, index) => {
          if (index === 0) return null
          return (
            <div
              key={node.displayName}
              css={selectStyle(
                selectIndexForMark === index,
                isEditMode,
                themeColor,
                itemBorderRadius,
                itemHeight,
              )}
            >
              <div
                css={applyListItemStyle(
                  false,
                  canShowBorder,
                  itemBackGroundColor,
                  shadowStyle,
                  borderStyle,
                  isEditMode,
                  loading,
                  itemHeight,
                  itemPadding?.size,
                )}
                key={node.displayName}
                onClick={(e) => {
                  const isClickOnContainer = !!(
                    e.target as HTMLElement
                  )?.getAttribute("data-list-widget-container")
                  handleUpdateSelectedItem(index, isClickOnContainer)
                }}
              >
                <RenderCopyContainer
                  templateComponentNodes={node}
                  templateContainerHeight={itemHeight}
                  columnNumber={columnNumber}
                  displayNamePrefix={`list-child-${index}-`}
                />
              </div>
            </div>
          )
        })}
      </div>
      {enablePagination && enableServerSidePagination && (
        <div css={paginationWrapperStyle} ref={paginationRef}>
          {paginationType === PAGINATION_TYPE.LIMIT_OFFSET_BASED ? (
            <Pagination
              total={totalRowCount <= 1 ? 1 : totalRowCount}
              current={page <= 0 ? 1 : page + 1}
              pageSize={safePageSize}
              size="medium"
              disableSimplePageJump
              sizeCanChange={false}
              hideOnSinglePage={false}
              simple
              onChange={handleChangePage}
            />
          ) : (
            <CursorBasedSelector
              page={page}
              hasNextPage={props.hasNextPage}
              onChange={handleCursorBasedChangePage}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default ListWidgetWithServerPagination
