import { FC, HTMLAttributes } from "react"
import { useDispatch, useSelector } from "react-redux"

import { BuilderState } from "@/redux/reducers/interface"
import {
  changeDemoValueA,
  changeDemoValueB,
} from "@/redux/reducers/editorReducer/demoReducer"
import { ActionCreators as UndoActionCreators } from "redux-undo"
import { Button } from "@illa-design/button"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props

  const dispatch = useDispatch()
  const demoValue = useSelector(
    (state: BuilderState) => state.editor.present.demo,
  )

  return (
    <div className={className}>
      DataWorkspace
      <div>demo:</div>
      <div>{demoValue.value.a}</div>
      <Button onClick={() => dispatch(changeDemoValueA())}>
        changeDemoValueA
      </Button>
      <div>{demoValue.value.b}</div>
      <Button onClick={() => dispatch(changeDemoValueB())}>
        changeDemoValueB
      </Button>
      <br />
      <br />
      <br />
      <Button onClick={() => dispatch(UndoActionCreators.undo())}>undo</Button>
      <Button onClick={() => dispatch(UndoActionCreators.redo())}>redo</Button>
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
