import { FC, memo } from "react"
import { useTranslation } from "react-i18next"
import { ComponentItem } from "./ComponentItem"
import { ComponentSessionProps } from "./interface"
import {
  componentListContainerStyle,
  sessionContainerStyle,
  sessionTitleStyle,
} from "./style"

export const ComponentSession = memo((props: ComponentSessionProps) => {
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
})

ComponentSession.displayName = "ComponentSession"
