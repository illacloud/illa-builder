import { FC, HTMLAttributes } from "react"
import { useDispatch, useSelector } from "react-redux"

// import { countAdd } from "@/reducers/DataWorkspace/count"
import { builderState } from "@/reducers/interface"
import { changeDemoValueA } from "@/reducers/moduleReducer/demoReducer"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props

  const dispatch = useDispatch()
  const demoValue = useSelector((state: builderState) => state.module.demo)
  // console.log('demoValue', demoValue)

  return (
    <div className={className}>
      DataWorkspace
      <div>{demoValue.name}</div>
      <div>{demoValue.value.a}</div>
      <div onClick={() => dispatch(changeDemoValueA())}>click</div>
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
