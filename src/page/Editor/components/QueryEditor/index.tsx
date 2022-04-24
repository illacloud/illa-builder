import { FC, HTMLAttributes, useState } from "react"
import { QueryList } from "./QueryList"
import { QueryEditorPanel } from "./QueryEditorPanel"
import { QueryEditorContainer } from "./style"
import { FormContainer } from "./FormContainer"

interface QueryEditorProps extends HTMLAttributes<HTMLDivElement> { }

export const QueryEditor: FC<QueryEditorProps> = (props) => {
  const { className } = props
  const [formVisible, setFormVisible] = useState(false)

  return (
    <div className={className} css={QueryEditorContainer}>
      <QueryList />
      <QueryEditorPanel
        onCreateResource={() => setFormVisible(true)}
        onEditResource={() => setFormVisible(true)}
      />
      <FormContainer visible={formVisible} actionType={"select"} onCancel={() => setFormVisible(false)} />
    </div>
  )
}

QueryEditor.displayName = "QueryEditor"
