import { FC, HTMLAttributes, useMemo } from "react"
import { useSelector } from "react-redux"
import { Divider } from "@illa-design/react"
import { Signal } from "@/api/ws/ILLA_PROTO"
import { ActionArea } from "@/page/History/components/ActionArea"
import { SnapShotItem } from "@/page/History/components/SnapShotItem"
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

  return (
    <div css={snapShotListWrapperStyle} className={className} {...rest}>
      <div css={headerContainerStyle}>Version History</div>
      <Divider />
      <div css={contentContainerStyle}>
        {filteredSnapshotList.map((snapshot, index) => {
          return (
            <SnapShotItem
              key={snapshot.snapshotID}
              snapshot={snapshot}
              last={!hasMore && filteredSnapshotList.length - 1 === index}
              selected={currentSnapshotID === snapshot.snapshotID}
              onChangeCurrentID={onChangeCurrentID}
            />
          )
        })}
        {hasMore && <ActionArea />}
      </div>
    </div>
  )
}

SnapShotList.displayName = "SnapShotList"
