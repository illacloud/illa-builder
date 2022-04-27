import { FC } from "react"
import { WrapperProps } from "./interface"

export const QueryEditor: FC<WrapperProps> = (props) => {
  const { className } = props

  return <div className={className}>QueryEditor</div>
}

QueryEditor.displayName = "QueryEditor"
