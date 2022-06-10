import { FC, HTMLAttributes } from "react"

import { CodeEditor } from "@/components/CodeEditor"
import { CodeInput } from "@/components/CodeInput"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      <CodeEditor mode="JAVASCRIPT" />
      <CodeEditor mode="SQL" />
      <CodeEditor mode="SQL_JS" />
      <CodeEditor mode="TEXT_JS" />
      <CodeEditor mode="TEXT_SQL" />
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
