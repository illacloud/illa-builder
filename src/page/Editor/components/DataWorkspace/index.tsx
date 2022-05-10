import { FC, HTMLAttributes } from "react"
import { useDispatch, useSelector } from "react-redux"

import { countAdd } from "@/reducers/DataWorkspace/count"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className={className}>
      DataWorkspace
      <div>{count}</div>
      <div onClick={() => dispatch(countAdd())}>Add</div>
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
