import { FC } from "react"
import { Button } from "@illa-design/react"
import { AgentItem } from "@/page/App/components/Actions/ActionGenerator/AiAgentSelector"
import {
  containerStyle,
  contentStyle,
  coverStyle,
  descStyle,
  infoContainerStyle,
  nameStyle,
} from "@/page/App/components/Actions/ActionGenerator/AiAgentSelector/AgentListItem/style"
import { ReactComponent as EmojiSmileIcon } from "./assets/emoji-smile.svg"
import { ReactComponent as RunOutlineIcon } from "./assets/run-outline.svg"
import { ReactComponent as StarOutlineIcon } from "./assets/star-outline.svg"

interface AgentListItemProps {
  item: AgentItem
  onClickCreateAction: (id: string) => void
}
export const AgentListItem: FC<AgentListItemProps> = (props) => {
  const { item } = props

  return (
    <div css={containerStyle}>
      <div css={infoContainerStyle}>
        <img css={coverStyle} src={item.cover} alt="cover" />
        <div css={contentStyle}>
          <div css={nameStyle}>{item.name}</div>
          <div css={descStyle}>{item.description}</div>
          <div>
            <EmojiSmileIcon />
            <span>{item.teamName}</span>
          </div>
        </div>
        <div>
          <div>
            <StarOutlineIcon />
            {item.starCount}
          </div>
          <div>
            <RunOutlineIcon />
            {item.runCount}
          </div>
        </div>
      </div>
      <Button>Fork {item.forkCount}</Button>
    </div>
  )
}

AgentListItem.displayName = "AgentListItem"
