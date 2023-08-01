import { FC } from "react"
import { Trigger } from "@illa-design/react"
import { ReactComponent as RequireIcon } from "@/assets/agent/require.svg"
import { AIAgentBlockProps } from "@/page/AIAgent/components/AIAgentBlock/interface"
import {
  agentBlockStyle,
  applyBlockSubTitleStyle,
  blockRequireStyle,
  blockTextStyle,
  blockTitleContainer,
} from "@/page/AIAgent/components/AIAgentBlock/style"

export const AIAgentBlock: FC<AIAgentBlockProps> = (props) => {
  const { title, children, subTitle, tips, required } = props

  return (
    <div css={agentBlockStyle}>
      <div css={blockTitleContainer}>
        <div css={blockTextStyle}>{title}</div>
        {required && <RequireIcon css={blockRequireStyle} />}
        <div style={{ flex: 1 }} />
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
