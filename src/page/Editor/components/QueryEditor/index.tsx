import { FC, HTMLAttributes } from "react"
import { QueryList } from "./QeuryList"
import { QueryEditorPanel } from "./QueryEditorPanel"
import { QueryEditorContainer } from "./style"
import { FormContainer } from "./FormContainer"

interface QueryEditorProps extends HTMLAttributes<HTMLDivElement> { }

export const QueryEditor: FC<QueryEditorProps> = (props) => {
  const { className } = props


  return <div className={className} css={QueryEditorContainer}>
    <QueryList />
    <QueryEditorPanel />
    <FormContainer visible={true} actionType={"select"} />
  </div>
}

QueryEditor.displayName = "QueryEditor"
