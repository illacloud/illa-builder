import { FC, HTMLAttributes } from "react"
import { useSelector } from "react-redux"
import { BuilderState } from "@/redux/reducers/interface"

interface QueryEditorProps extends HTMLAttributes<HTMLDivElement> {}

export const QueryEditor: FC<QueryEditorProps> = (props) => {
  const { className } = props

  const dragValue = useSelector((state: BuilderState) => state.editor.drag)

  return (
    <div className={className}>
      QueryEditor
      <div>drag:</div>
      <div>{dragValue.value}</div>
    </div>
  )
}

QueryEditor.displayName = "QueryEditor"
