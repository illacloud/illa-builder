import { FC, HTMLAttributes } from "react"

import { EditorInput } from "@/components/EditorInput"
import { CodeEditor } from "@/components/CodeEditor"
import { EditorModes } from "@/components/CodeEditor/interface"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      DataWorkspace
      <EditorInput mode="sql-js" />
      <CodeEditor mode="TEXT_JS" />
      <CodeEditor mode="SQL_JS" />
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
