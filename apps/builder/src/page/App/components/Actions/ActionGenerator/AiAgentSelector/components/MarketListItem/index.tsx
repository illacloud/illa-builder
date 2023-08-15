import { formatNumForAgent } from "@illa-public/utils"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Button, PlayOutlineIcon, StarOutlineIcon } from "@illa-design/react"
import { ReactComponent as EmojiSmileIcon } from "@/assets/agent/emojiSmile.svg"
import { ReactComponent as ForkIcon } from "@/assets/tutorial/fork.svg"
import { MarketListItemProps } from "./interface"
import {
  descStyle,
  detailContainerStyle,
  imgStyle,
  itemDetailAndOtherInfosContainerStyle,
  listItemContainerStyle,
  numberContainerStyle,
  starAndRunIconContainerStyle,
  teamIconStyle,
  teamInfoContainerStyle,
  teamNameStyle,
  titleAndDescContainerStyle,
  titleStyle,
} from "./style"

export const MarketListItem: FC<MarketListItemProps> = (props) => {
  const { item, onSelected, style } = props
  const { t } = useTranslation()

  const handleClickOnSelect = useCallback(() => {
    onSelected(item.aiAgent)
  }, [item, onSelected])

  return (
    <div css={listItemContainerStyle} style={style}>
      <div css={itemDetailAndOtherInfosContainerStyle}>
        <div css={detailContainerStyle}>
          <img src={item.aiAgent.icon} css={imgStyle} />
          <div css={titleAndDescContainerStyle}>
            <span css={titleStyle}>{item.aiAgent.name}</span>
            <span css={descStyle}>{item.aiAgent.description}</span>
            <div css={teamInfoContainerStyle}>
              <span css={teamIconStyle}>
                <EmojiSmileIcon />
              </span>
              <span css={teamNameStyle}>
                {item.marketplace.contributorTeam.name}
              </span>
            </div>
          </div>
        </div>
        <div css={starAndRunIconContainerStyle}>
          <div css={numberContainerStyle}>
            <StarOutlineIcon />
            {formatNumForAgent(item.marketplace.numStars)}
          </div>
          <div css={numberContainerStyle}>
            <PlayOutlineIcon />
            {formatNumForAgent(item.marketplace.numRuns)}
          </div>
        </div>
      </div>
      <Button
        onClick={handleClickOnSelect}
        colorScheme="grayBlue"
        leftIcon={<ForkIcon />}
      >
        {t("marketplace.fork", {
          operationNum: formatNumForAgent(item.marketplace.numForks),
        })}
      </Button>
    </div>
  )
}
