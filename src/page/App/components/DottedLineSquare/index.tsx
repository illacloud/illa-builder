import { DottedLineSquareProps } from "@/page/App/components/DottedLineSquare/interface"
import { FC } from "react"
import { dottedContainer } from "./style"

export const DottedLineSquare: FC<DottedLineSquareProps> = (props) => {
  return <div css={dottedContainer} />
}
