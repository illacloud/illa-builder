import { FC, memo } from "react"
import { AIAgentCardProps } from "./interface"
import {
  aiAgentCardStyle,
  aiAgentCardTitleStyle,
  backgroundPartContainerStyle,
  betaTagStyle,
} from "./style"

const AIAgentCard: FC<AIAgentCardProps> = (props) => {
  const { onClickCard } = props
  return (
    <button css={aiAgentCardStyle} onClick={onClickCard}>
      <span css={aiAgentCardTitleStyle}>AI Agent</span>
      <span css={betaTagStyle}>Beta</span>
      <span css={backgroundPartContainerStyle}></span>
    </button>
  )
}

export default memo(AIAgentCard)
