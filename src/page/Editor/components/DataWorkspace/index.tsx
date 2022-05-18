import { FC, HTMLAttributes } from "react"
import { useDispatch, useSelector } from "react-redux"

import { BuilderState } from "@/redux/reducers/interface"
import { EditorInput } from "@/components/EditorInput"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> { }

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props

  const dispatch = useDispatch()
  const demoValue = useSelector(
    (state: BuilderState) => state.editor.present.demo,
  )

  return (
    <div className={className}>
      DataWorkspace
      <EditorInput mode="javascript" />

      <div>{demoValue.value.a}</div>
      <button onClick={() => dispatch({ type: 'incrementAsync_demo_saga' })}>incrementAsync_1s</button>
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
