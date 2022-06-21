import { FC, HTMLAttributes, useState } from "react"
import { WorkSpaceItem } from "@/page/App/components/DataWorkspace/components/WorkSpaceItem"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props
  return (
    <div className={className}>
      <WorkSpaceItem />
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
