import { useTour } from "@reactour/tour"
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
  const { title, widgetCardInfos, type } = props
  const { t } = useTranslation()
  const { isOpen } = useTour()
  return widgetCardInfos.length > 0 ? (
    <div
      css={sessionContainerStyle}
      // isGuideMode
      {...(isOpen ? { "data-onboarding-session": type } : {})}
    >
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
