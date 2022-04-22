import { FC, HTMLAttributes } from "react"
import { QueryList } from "./QeuryList"
import { QueryEditorPanel } from "./QueryEditorPanel"
import { QueryEditorContainer } from "./style"

interface QueryEditorProps extends HTMLAttributes<HTMLDivElement> { }

export const QueryEditor: FC<QueryEditorProps> = (props) => {
  const { className } = props

  return <div className={className} css={QueryEditorContainer}>
    <QueryList />
    <QueryEditorPanel />
  </div>
}

QueryEditor.displayName = "QueryEditor"
