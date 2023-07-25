import { CSSProperties, FC } from "react"
import { Button } from "@illa-design/react"
import { ReactComponent as ForkIcon } from "@/assets/tutorial/fork.svg"
import { AgentItem } from "@/page/App/components/Actions/ActionGenerator/AiAgentSelector"
import { ReactComponent as EmojiSmileIcon } from "./assets/emoji-smile.svg"
import { ReactComponent as RunOutlineIcon } from "./assets/run-outline.svg"
import {
  actionCountStyle,
  containerStyle,
  contentStyle,
  coverStyle,
  descStyle,
  infoContainerStyle,
  labelStyle,
  leftContentStyle,
  nameStyle,
  teamNameStyle,
} from "./style"

interface MarketListItemItemProps {
  style?: CSSProperties
  item: AgentItem
  onClickCreateAction: (id: string) => void
}
export const MarketListItem: FC<MarketListItemItemProps> = (props) => {
  const { item } = props

  return (
    <div css={containerStyle}>
      <div css={infoContainerStyle}>
        <div css={leftContentStyle}>
          <img css={coverStyle} src={item.cover} alt="cover" />
          <div css={contentStyle}>
            <div css={nameStyle}>{item.name}</div>
            <div css={descStyle}>{item.description}</div>
            <div css={labelStyle}>
              <EmojiSmileIcon />
              <span css={teamNameStyle}>{item.teamName}</span>
            </div>
          </div>
        </div>
        <div css={actionCountStyle}>
          <RunOutlineIcon />
          {item.runCount}
        </div>
      </div>
      <Button colorScheme="grayBlue" leftIcon={<ForkIcon />}>
        Fork {item.forkCount}
      </Button>
    </div>
  )
}

MarketListItem.displayName = "MarketListItem"
