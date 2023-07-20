import { FC, HTMLAttributes, useCallback, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import AutoSizer, { Size } from "react-virtualized-auto-sizer"
import { VariableSizeList } from "react-window"
import { Divider } from "@illa-design/react"
import { Signal } from "@/api/ws/ILLA_PROTO"
import { ActionArea } from "@/page/History/components/ActionArea"
import { ACTION_AREA_HEIGHT } from "@/page/History/components/ActionArea/style"
import { SnapShotItem } from "@/page/History/components/SnapShotItem"
import {
  HISTORY_HEADER_HEIGHT,
  HISTORY_ITEM_GAP,
  HISTORY_ITEM_HEIGHT,
  HISTORY_PADDING,
} from "@/page/History/components/SnapShotItem/style"
import {
  contentContainerStyle,
  headerContainerStyle,
  snapShotListWrapperStyle,
} from "@/page/History/components/SnapShotList/style"
import {
  getCurrentAppSnapshotID,
  getCurrentAppSnapshotList,
  getSnapshotListHasMore,
} from "@/redux/currentAppHistory/currentAppHistorySelector"

interface SnapShotListProps extends HTMLAttributes<HTMLDivElement> {
  onChangeCurrentID: (snapshotID: string) => void
}

const validOperations = [
  Signal.CREATE_STATE,
  Signal.DELETE_STATE,
  Signal.UPDATE_STATE,
  Signal.MOVE_STATE,
  Signal.RECOVER_APP_SNAPSHOT,
]

export const SnapShotList: FC<SnapShotListProps> = (props) => {
  const { className, onChangeCurrentID, ...rest } = props
  const snapshotList = useSelector(getCurrentAppSnapshotList)
  const hasMore = useSelector(getSnapshotListHasMore)
  const currentSnapshotID = useSelector(getCurrentAppSnapshotID)

  const listRef = useRef<VariableSizeList>(null)

  const filteredSnapshotList = useMemo(() => {
    return snapshotList.map((snapshot) => {
      const modifyHistory = snapshot.modifyHistory
        .filter((history) => {
          return validOperations.includes(history.operation)
        })
        .slice(0, 2)

      return {
        ...snapshot,
        modifyHistory,
      }
    })
  }, [snapshotList])

  const getItemSize = useCallback(
    (index: number) => {
      const snapshot = filteredSnapshotList[index]

      return index === 0
        ? HISTORY_HEADER_HEIGHT + HISTORY_PADDING
        : hasMore && filteredSnapshotList.length === index
        ? ACTION_AREA_HEIGHT
        : (HISTORY_ITEM_HEIGHT + HISTORY_ITEM_GAP) *
            snapshot.modifyHistory.length +
          HISTORY_HEADER_HEIGHT +
          HISTORY_PADDING
    },
    [filteredSnapshotList, hasMore],
  )

  const resetVirtualList = () => {
    // VariableSizeList caches offsets and measurements for each index for performance purposes.
    // This means it's necessary to reset these cached values when the list's item sizes change.
    listRef.current?.forceUpdate()
  }

  return (
    <div css={snapShotListWrapperStyle} className={className} {...rest}>
      <div css={headerContainerStyle}>Version History</div>
      <Divider />
      <div css={contentContainerStyle}>
        <AutoSizer>
          {({ width, height }: Size) => {
            return (
              <VariableSizeList
                ref={listRef}
                height={height}
                width={width}
                itemCount={filteredSnapshotList.length + (hasMore ? 1 : 0)}
                itemSize={getItemSize}
              >
                {({ index, style }) => {
                  const snapshot = filteredSnapshotList[index]

                  if (hasMore && filteredSnapshotList.length === index) {
                    return (
                      <ActionArea
                        style={style}
                        resetVirtualList={resetVirtualList}
                      />
                    )
                  }
                  return (
                    <SnapShotItem
                      style={style}
                      key={snapshot.snapshotID}
                      snapshot={snapshot}
                      last={
                        !hasMore && filteredSnapshotList.length - 1 === index
                      }
                      selected={currentSnapshotID === snapshot.snapshotID}
                      onChangeCurrentID={onChangeCurrentID}
                    />
                  )
                }}
              </VariableSizeList>
            )
          }}
        </AutoSizer>
      </div>
    </div>
  )
}

SnapShotList.displayName = "SnapShotList"
