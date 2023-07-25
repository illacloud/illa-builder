import { FC } from "react"
import { Button } from "@illa-design/react"
import { AgentItem } from "@/page/App/components/Actions/ActionGenerator/AiAgentSelector"
import {
  containerStyle,
  contentStyle,
  coverStyle,
  descStyle,
  leftContentStyle,
  nameStyle,
} from "@/page/App/components/Actions/ActionGenerator/AiAgentSelector/MarketListItem/style"

interface AgentListItemProps {
  item: AgentItem
  onClickCreateAction: (id: string) => void
}
export const AgentListItem: FC<AgentListItemProps> = (props) => {
  const { item } = props

  return (
    <div css={containerStyle}>
      <div css={leftContentStyle}>
        <img css={coverStyle} src={item.cover} alt="cover" />
        <div css={contentStyle}>
          <div css={nameStyle}>{item.name}</div>
          <div css={descStyle}>{item.description}</div>
        </div>
      </div>
      <Button colorScheme="grayBlue">Select</Button>
    </div>
  )
}

AgentListItem.displayName = "AgentListItem"
