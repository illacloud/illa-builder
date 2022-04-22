import { FC, HTMLAttributes } from "react"
import { FormContainer } from "./FormContainer"

interface QueryEditorProps extends HTMLAttributes<HTMLDivElement> {}

export const QueryEditor: FC<QueryEditorProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      <FormContainer visible={true} actionType={"select"} />
    </div>
  )
}

QueryEditor.displayName = "QueryEditor"
