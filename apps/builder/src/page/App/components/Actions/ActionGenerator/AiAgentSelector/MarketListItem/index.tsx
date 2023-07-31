import { CSSProperties, FC } from "react"
import { Button, PlayOutlineIcon } from "@illa-design/react"
import { ReactComponent as ForkIcon } from "@/assets/tutorial/fork.svg"
import { MarketAiAgent } from "@/redux/aiAgent/aiAgentState"
import { ReactComponent as EmojiSmileIcon } from "./assets/emoji-smile.svg"
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
  item: MarketAiAgent
  onClickCreateAction: (id: string) => void
}
export const MarketListItem: FC<MarketListItemItemProps> = (props) => {
  const { item } = props

  return (
    <div css={containerStyle}>
      <div css={infoContainerStyle}>
        <div css={leftContentStyle}>
          <img css={coverStyle} src={item.aiAgent.icon} alt="cover" />
          <div css={contentStyle}>
            <div css={nameStyle}>{item.aiAgent.name}</div>
            <div css={descStyle}>{item.aiAgent.description}</div>
            <div css={labelStyle}>
              <EmojiSmileIcon />
              <span css={teamNameStyle}>
                {item.marketplace.contributorTeam.name}
              </span>
            </div>
          </div>
        </div>
        <div css={actionCountStyle}>
          <PlayOutlineIcon />
          {item.marketplace.numRuns}
        </div>
      </div>
      <Button colorScheme="grayBlue" leftIcon={<ForkIcon />}>
        Fork {item.marketplace.numForks}
      </Button>
    </div>
  )
}

MarketListItem.displayName = "MarketListItem"
