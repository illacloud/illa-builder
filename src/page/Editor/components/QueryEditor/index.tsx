import { FC, HTMLAttributes } from "react"

interface QueryEditorProps extends HTMLAttributes<HTMLDivElement> {}

export const QueryEditor: FC<QueryEditorProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      QueryEditor
      <div>drag:</div>
    </div>
  )
}

QueryEditor.displayName = "QueryEditor"
