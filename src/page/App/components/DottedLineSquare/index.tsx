import { DottedLineSquareProps } from "@/page/App/components/DottedLineSquare/interface"
import { FC } from "react"
import { applyDottedContainer } from "@/page/App/components/DottedLineSquare/style"

export const DottedLineSquare: FC<DottedLineSquareProps> = (props) => {
  const { w, h, ...otherProps } = props
  return <div css={applyDottedContainer(w, h)} {...otherProps} />
}
