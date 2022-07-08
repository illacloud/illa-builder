import { FC } from "react"
import { TransformerResultProps } from "./interface"
import { transformerResultContainerStyle } from "./style"

export const TransformerResult: FC<TransformerResultProps> = (props) => {
  const { result } = props

  return <div css={transformerResultContainerStyle}>{result}</div>
}

TransformerResult.displayName = "TransformerResult"
