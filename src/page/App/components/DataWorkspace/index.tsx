import { FC, HTMLAttributes } from "react"

import { EditorInput } from "@/components/EditorInput"
import { CodeEditor } from "@/components/CodeEditor"
import { CodeInput } from "@/components/CodeInput"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      DataWorkspace
      <EditorInput mode="sql-js" />
      <EditorInput mode="sql" />
      <CodeEditor mode="JAVASCRIPT" />
      <CodeEditor mode="SQL_JS" />
      <CodeInput mode="javascript" />
      <CodeInput mode="sql" />
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
