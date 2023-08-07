import { FC, useCallback } from "react"
import { Button, PlayOutlineIcon, StarOutlineIcon } from "@illa-design/react"
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
  titleAndDescContainerStyle,
  titleStyle,
} from "./style"
import { formatNumForAgent } from "./utils"

export const MarketListItem: FC<MarketListItemProps> = (props) => {
  const { item, onSelected, style } = props

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
        {/* TODO: I18n */}
        Fork {formatNumForAgent(item.marketplace.numForks)}
      </Button>
    </div>
  )
}
