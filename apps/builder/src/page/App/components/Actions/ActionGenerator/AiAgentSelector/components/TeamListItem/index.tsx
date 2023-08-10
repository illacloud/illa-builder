import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/react"
import { TeamListItemProps } from "./interface"
import {
  descStyle,
  detailContainerStyle,
  imgStyle,
  teamListItemContainerStyle,
  titleAndDescContainerStyle,
  titleStyle,
} from "./style"

export const TeamListItem: FC<TeamListItemProps> = (props) => {
  const { item, onSelected, style } = props
  const { t } = useTranslation()

  const handleClickOnSelect = useCallback(() => {
    onSelected(item)
  }, [item, onSelected])

  return (
    <div css={teamListItemContainerStyle} style={style}>
      <div css={detailContainerStyle}>
        <img src={item.icon} css={imgStyle} />
        <div css={titleAndDescContainerStyle}>
          <span css={titleStyle}>{item.name}</span>
          <span css={descStyle}>{item.description}</span>
        </div>
      </div>
      <Button onClick={handleClickOnSelect} colorScheme="grayBlue" w="72px">
        {t("editor.action.form.button.marketplace.select")}
      </Button>
    </div>
  )
}
