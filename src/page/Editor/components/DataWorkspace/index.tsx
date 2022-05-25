import { FC, HTMLAttributes, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { EditorInput } from "@/components/EditorInput"
import { fetchUser, changeDemoValueA } from "@/redux/editor/demoReducer"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props

  const dispatch = useDispatch()
  const demoValue = useSelector((state: any) => state.editor.demo)

  return (
    <div className={className}>
      DataWorkspace
      <EditorInput mode="javascript" />
      <div>{demoValue.value.a}</div>
      <button
        onClick={() => {
          dispatch(fetchUser())
            .unwrap()
            .then((originalPromiseResult) => {
              // 调试用，用来看调用顺序，暂时保留
              console.log(originalPromiseResult)
              console.log(demoValue.value.d)
            })
        }}
      >
        getData
      </button>
      <button
        onClick={() => {
          // dispatch(changeDemoValueA())
          dispatch({ type: "incrementAsync_demo_saga" })
        }}
      >
        changeDemoValueA
      </button>
      <button
        onClick={() => {
          console.log(demoValue.value)
        }}
      >
        show data
      </button>
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
