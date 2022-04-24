import { FC, HTMLAttributes } from "react"
import { QueryList } from "./QueryList"
import { QueryEditorPanel } from "./QueryEditorPanel"
import { QueryEditorContainer } from "./style"
import { FormContainer } from "./FormContainer"

interface QueryEditorProps extends HTMLAttributes<HTMLDivElement> { }

export const QueryEditor: FC<QueryEditorProps> = (props) => {
  const { className } = props


  return <div className={className} css={QueryEditorContainer}>
    <QueryList />
    <QueryEditorPanel />
    <FormContainer visible={false} actionType={"select"} />
  </div>
}

QueryEditor.displayName = "QueryEditor"
