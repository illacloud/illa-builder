import { FC } from "react"
import { AIAgentBlockProps } from "@/page/AIAgent/components/AIAgentBlock/interface"
import {
  agentBlockStyle,
  blockTextStyle,
} from "@/page/AIAgent/components/AIAgentBlock/style"

export const AIAgentBlock: FC<AIAgentBlockProps> = (props) => {
  const { title, children } = props

  return (
    <div css={agentBlockStyle}>
      <div css={blockTextStyle}>{title}</div>
      {children}
    </div>
  )
}

export default AIAgentBlock
AIAgentBlock.displayName = "AIAgentBlock"
