import { FC, HTMLAttributes } from "react"
import { useDispatch, useSelector } from "react-redux"

import { builderState } from "@/reducers/interface"
import {
  changeDemoValueA,
  changeDemoValueB,
} from "@/reducers/moduleReducer/demoReducer"
import { ActionCreators as UndoActionCreators } from "redux-undo"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> { }

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props

  const dispatch = useDispatch()
  const demoValue = useSelector((state: builderState) => state.module.demo)

  return (
    <div className={className}>
      DataWorkspace
      <div>{demoValue.present.name}</div>
      <div>{demoValue.present.value.a}</div>
      <button onClick={() => dispatch(changeDemoValueA())}>
        changeDemoValueA
      </button>
      <div>{demoValue.present.value.b}</div>
      <button onClick={() => dispatch(changeDemoValueB())}>
        changeDemoValueB
      </button>
      <div onClick={() => dispatch(UndoActionCreators.undo())}>undo</div>
      <div onClick={() => dispatch(UndoActionCreators.redo())}>redo</div>
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
