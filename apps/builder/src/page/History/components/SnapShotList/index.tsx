import { FC, HTMLAttributes } from "react"

interface SnapShotListProps extends HTMLAttributes<HTMLDivElement> {}
export const SnapShotList: FC<SnapShotListProps> = (props) => {
  const { className, ...rest } = props

  return (
    <div className={className} {...rest}>
      SnapShotList
    </div>
  )
}

SnapShotList.displayName = "SnapShotList"
