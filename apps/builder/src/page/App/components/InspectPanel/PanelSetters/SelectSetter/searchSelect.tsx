import { FC } from "react"
import BaseSelectSetter from "./baseSelect"
import { BaseSelectSetterProps } from "./interface"

const SearchSelectSetter: FC<BaseSelectSetterProps> = (props) => {
  return <BaseSelectSetter {...props} showSearch allowClear />
}

SearchSelectSetter.displayName = "SearchSelectSetter"

export default SearchSelectSetter
