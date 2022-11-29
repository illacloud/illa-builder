import {
  ListWidgetProps,
  OVERFLOW_TYPE,
} from "@/widgetLibrary/ListWidget/interface"
import {
  listContainerStyle,
  listItemStyle,
  listParentContainerStyle,
  ListParentContainerWithScroll,
  paginationWrapperStyle,
} from "@/widgetLibrary/ListWidget/style"
import { Pagination } from "@illa-design/react"
import { chunk } from "lodash"
import { FC, useCallback, useMemo } from "react"
import useMeasure from "react-use-measure"

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
  } = props
  const [containerRef, containerBounds] = useMeasure()

  return (
    <div css={ListParentContainerWithScroll} ref={containerRef}>
      {dataSources?.map((item) => {
        return (
          <div css={listItemStyle} key={JSON.stringify(item)}>
            1111
          </div>
        )
      })}
    </div>
  )
}

export const ListWidget: FC<ListWidgetProps> = (props) => {
  const {
    dataSources = [1, 2, 3, 4, 5, 6],
    overflowMethod,
    pageSize,
    itemHeight = 48,
    displayName,
    currentPage,
    handleUpdateMultiExecutionResult,
  } = props

  const [containerRef, containerBounds] = useMeasure()

  return overflowMethod === OVERFLOW_TYPE.PAGINATION ? (
    <ListWidgetWithPagination {...props} />
  ) : (
    <ListWidgetWithScroll {...props} />
  )
}
