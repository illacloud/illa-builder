import { FC, HTMLAttributes } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@illa-design/button"
import { builderState } from "@/redux/reducers/interface"
import { increaseDragValue } from "@/redux/reducers/editorReducer/dragReducer"

interface QueryEditorProps extends HTMLAttributes<HTMLDivElement> {}

export const QueryEditor: FC<QueryEditorProps> = (props) => {
  const { className } = props

  const dispatch = useDispatch()
  const dragValue = useSelector(
    (state: builderState) => state.editor.present.drag,
  )

  return (
    <div className={className}>
      QueryEditor
      <div>drag:</div>
      <div>{dragValue.value}</div>
      <Button onClick={() => dispatch(increaseDragValue())}>drarValue</Button>
    </div>
  )
}

QueryEditor.displayName = "QueryEditor"
