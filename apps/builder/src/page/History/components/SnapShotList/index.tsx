import { FC, HTMLAttributes, useState } from "react"
import { useSelector } from "react-redux"
import { Divider } from "@illa-design/react"
import { ActionArea } from "@/page/History/components/ActionArea"
import { SnapShotItem } from "@/page/History/components/SnapShotItem"
import {
  contentContainerStyle,
  headerContainerStyle,
  snapShotListWrapperStyle,
} from "@/page/History/components/SnapShotList/style"
import {
  getCurrentAppSnapshotList,
  getSnapshotListHasMore,
} from "@/redux/currentAppHistory/currentAppHistorySelector"

interface SnapShotListProps extends HTMLAttributes<HTMLDivElement> {}

export const SnapShotList: FC<SnapShotListProps> = (props) => {
  const { className, ...rest } = props
  const snapshotList = useSelector(getCurrentAppSnapshotList)
  const hasMore = useSelector(getSnapshotListHasMore)
  const [selectedID, setSelectedID] = useState<string>(
    snapshotList[0].snapshotID,
  )

  return (
    <div css={snapShotListWrapperStyle} className={className} {...rest}>
      <div css={headerContainerStyle}>Version History</div>
      <Divider />
      <div css={contentContainerStyle}>
        {snapshotList.map((snapshot, index) => {
          return (
            <SnapShotItem
              key={snapshot.snapshotID}
              snapshot={snapshot}
              last={snapshotList.length - 1 === index}
              selected={selectedID === snapshot.snapshotID}
              onClickItem={setSelectedID}
            />
          )
        })}
        {hasMore && <ActionArea />}
      </div>
    </div>
  )
}

SnapShotList.displayName = "SnapShotList"
