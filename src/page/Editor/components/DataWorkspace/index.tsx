import { FC, HTMLAttributes, useState } from "react"

import { EditorInput } from "@/components/EditorInput"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      DataWorkspace
      <EditorInput mode="sql-js" lineNumbers={false} />
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
