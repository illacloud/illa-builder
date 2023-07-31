import { FC } from "react"
import { Trigger } from "@illa-design/react"
import { AIAgentBlockProps } from "@/page/AIAgent/components/AIAgentBlock/interface"
import {
  agentBlockStyle,
  applyBlockSubTitleStyle,
  blockTextStyle,
  blockTitleContainer,
} from "@/page/AIAgent/components/AIAgentBlock/style"

export const AIAgentBlock: FC<AIAgentBlockProps> = (props) => {
  const { title, children, subTitle, tips } = props

  return (
    <div css={agentBlockStyle}>
      <div css={blockTitleContainer}>
        <div css={blockTextStyle}>{title}</div>
        {subTitle && (
          <Trigger disabled={tips === undefined} content={tips} trigger="hover">
            <div css={applyBlockSubTitleStyle(tips !== undefined)}>
              {subTitle}
            </div>
          </Trigger>
        )}
      </div>
      {children}
    </div>
  )
}

export default AIAgentBlock
AIAgentBlock.displayName = "AIAgentBlock"
