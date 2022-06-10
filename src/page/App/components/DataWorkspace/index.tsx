import { FC, HTMLAttributes, useState } from "react"
import { CodeEditor } from "@/components/CodeEditor"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props
  const [value, setValue] = useState<string>()

  return (
    <div className={className}>
      <CodeEditor mode="JAVASCRIPT" value={value} onChange={setValue} />
      <CodeEditor mode="SQL" />
      <CodeEditor mode="SQL_JS" />
      <CodeEditor mode="TEXT_JS" />
      <CodeEditor mode="TEXT_SQL" />
      <button
        onClick={() => {
          setValue(Math.random().toString(10))
        }}
      >
        set random value
      </button>
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
