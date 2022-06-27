import { FC, HTMLAttributes, useState } from "react"
import { CodeEditor } from "@/components/CodeEditor"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props
  const [value, setValue] = useState<string>()

  return (
    <div className={className}>
      <CodeEditor
        mode="JAVASCRIPT"
        expectedType="Boolean"
        value={value}
        onChange={setValue}
      />
      <CodeEditor mode="JAVASCRIPT" expectedType="Object" />
      <CodeEditor mode="SQL" expectedType="Object" />
      <CodeEditor
        mode="SQL_JS"
        expectedType="String"
        lineNumbers
        tables={{
          table1: ["col_A", "col_B", "col_C"],
          table2: ["other_columns1", "other_columns2"],
        }}
      />
      <CodeEditor mode="TEXT_JS" expectedType="String" />
      <CodeEditor mode="TEXT_SQL" expectedType="Number" />
      <CodeEditor mode="TEXT_SQL" expectedType="Array" />
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
