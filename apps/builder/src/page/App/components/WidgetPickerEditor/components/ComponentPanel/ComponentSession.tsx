import { FC } from "react"
import { ComponentSessionProps } from "./interface"
import {
  componentListContainerStyle,
  sessionContainerStyle,
  sessionTitleStyle,
} from "./style"
import { ComponentItem } from "./ComponentItem"
import { useTranslation } from "react-i18next"

export const ComponentSession: FC<ComponentSessionProps> = (props) => {
  const { title, widgetCardInfos } = props
  const { t } = useTranslation()

  return widgetCardInfos.length > 0 ? (
    <div css={sessionContainerStyle}>
      <span css={sessionTitleStyle}>{t(title)}</span>
      <div css={componentListContainerStyle}>
        {widgetCardInfos.map((item) => (
          <ComponentItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  ) : null
}

ComponentSession.displayName = "ComponentSession"
