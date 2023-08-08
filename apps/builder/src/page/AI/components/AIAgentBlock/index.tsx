import { FC } from "react"
import { Trigger } from "@illa-design/react"
import { ReactComponent as RequireIcon } from "@/assets/agent/require.svg"
import { AIAgentBlockProps } from "./interface"
import {
  agentBlockStyle,
  applyBlockSubtitleStyle,
  applyBlockTextStyle,
  blockRequireStyle,
  blockTitleContainer,
} from "./style"

export const AIAgentBlock: FC<AIAgentBlockProps> = (props) => {
  const { title, tips, children, subtitle, subtitleTips, required } = props

  return (
    <div css={agentBlockStyle}>
      <div css={blockTitleContainer}>
        {title && (
          <Trigger
            disabled={tips === undefined}
            content={tips}
            trigger="hover"
            position="top-start"
          >
            <div css={applyBlockTextStyle(tips !== undefined)}>{title}</div>
          </Trigger>
        )}
        {required && <RequireIcon css={blockRequireStyle} />}
        <div style={{ flex: 1 }} />
        {subtitle && (
          <Trigger
            disabled={subtitleTips === undefined}
            content={subtitleTips}
            trigger="hover"
          >
            <div css={applyBlockSubtitleStyle(subtitleTips !== undefined)}>
              {subtitle}
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
