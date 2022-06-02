import { FC, useContext } from "react"
import { ChartDatasetsProps } from "./interface"

import { listWrapperCss } from "@/page/Editor/components/PanelSetters/ListSetter/style"

export const DatasetsList: FC<ChartDatasetsProps> = (props) => {
  const { options } = props

  return (
    <div css={listWrapperCss}>
      {options?.map((set) => {
        return <span>{set}</span>
      })}
    </div>
  )
}

DatasetsList.displayName = "BaseInput"
