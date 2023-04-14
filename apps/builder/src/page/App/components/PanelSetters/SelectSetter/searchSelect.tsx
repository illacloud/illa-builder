import { FC } from "react"
import { BaseSelectSetter } from "./baseSelect"
import { BaseSelectSetterProps } from "./interface"

export const SearchSelectSetter: FC<BaseSelectSetterProps> = (props) => {
  return <BaseSelectSetter {...props} showSearch allowClear />
}
