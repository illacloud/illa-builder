import { FC, HTMLAttributes } from "react"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props

  return <div className={className}>DataWorkspace</div>
}

DataWorkspace.displayName = "DataWorkspace"
