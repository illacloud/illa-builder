import { FC } from "react"
import { ILabelProps } from "./interface"
import { Tooltip } from "@illa-design/tooltip"
import { labelNameCss } from "./style"

const Label: FC<ILabelProps> = (props) => {
  const { labelDesc, labelName } = props
  return (
    <>
      {labelDesc ? (
        <Tooltip content={labelDesc} position="left">
          <span css={labelNameCss}>{labelName}</span>
        </Tooltip>
      ) : (
        <span>{labelName}</span>
      )}
    </>
  )
}

export default Label
