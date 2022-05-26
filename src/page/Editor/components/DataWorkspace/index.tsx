import { FC, HTMLAttributes } from "react"
import { EditorInput } from "@/components/EditorInput"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      DataWorkspace
      <EditorInput mode="text-js" />
      {/* <EditorInput mode="sql" /> */}
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
