import { FC, HTMLAttributes } from "react"
import { useSelector } from "react-redux"
import { Divider } from "@illa-design/react"
import { SnapShotItem } from "@/page/History/components/SnapShotItem"
import {
  contentContainerStyle,
  headerContainerStyle,
  snapShotListWrapperStyle,
} from "@/page/History/components/SnapShotList/style"
import { getCurrentAppSnapshotList } from "@/redux/currentAppHistory/currentAppHistorySelector"

interface SnapShotListProps extends HTMLAttributes<HTMLDivElement> {}

export const SnapShotList: FC<SnapShotListProps> = (props) => {
  const { className, ...rest } = props
  const snapshotList = useSelector(getCurrentAppSnapshotList)

  return (
    <div css={snapShotListWrapperStyle} className={className} {...rest}>
      <div css={headerContainerStyle}>Version History</div>
      <Divider />
      <div css={contentContainerStyle}>
        {snapshotList.map((snapshot) => {
          return <SnapShotItem key={snapshot.snapshotID} snapshot={snapshot} />
        })}
      </div>
    </div>
  )
}

SnapShotList.displayName = "SnapShotList"
