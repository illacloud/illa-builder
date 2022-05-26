import { FC, HTMLAttributes } from "react"
import { useDispatch } from "react-redux"

import { EditorInput } from "@/components/EditorInput"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props

  const dispatch = useDispatch()

  return (
    <div className={className}>
      DataWorkspace
      <EditorInput mode="javascript" />
      <button
        onClick={() => {
          dispatch({ type: "incrementAsync_demo_saga" })
        }}
      >
        changeDemoValueA
      </button>
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
