import { FC, memo } from "react"
import { AiAgentCardProps } from "./interface"
import {
  aiAgentCardStyle,
  aiAgentCardTitleStyle,
  backgroundPartContainerStyle,
  betaTagStyle,
} from "./style"

const AIAgentCard: FC<AiAgentCardProps> = (props) => {
  const { onClickCard } = props
  return (
    <button css={aiAgentCardStyle} onClick={onClickCard}>
      <span css={aiAgentCardTitleStyle}>AiAgent</span>
      <span css={betaTagStyle}>Beta</span>
      <span css={backgroundPartContainerStyle}></span>
    </button>
  )
}

export default memo(AIAgentCard)
