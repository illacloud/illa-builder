import { memo } from "react"
import { useSelector } from "react-redux"
import { getGuideStatus } from "@/redux/guide/guideSelector"
import { ComponentItem } from "./ComponentItem"
import { ComponentSessionProps } from "./interface"
import {
  componentListContainerStyle,
  sessionContainerStyle,
  sessionTitleStyle,
} from "./style"

export const ComponentSession = memo((props: ComponentSessionProps) => {
  const { sessionTitle, widgetCardInfos, sessionType } = props
  const isGuideOpen = useSelector(getGuideStatus)

  return widgetCardInfos.length > 0 ? (
    <div
      css={sessionContainerStyle}
      {...(isGuideOpen ? { "data-onboarding-session": sessionType } : {})}
    >
      <span css={sessionTitleStyle}>{sessionTitle}</span>
      <div css={componentListContainerStyle}>
        {widgetCardInfos.map((item) => (
          <ComponentItem
            key={item.id}
            icon={item.icon}
            widgetType={item.widgetType}
            widgetName={item.widgetName}
            displayName={item.displayName}
            isPremiumWidget={item.isPremiumWidget}
          />
        ))}
      </div>
    </div>
  ) : null
})

ComponentSession.displayName = "ComponentSession"
