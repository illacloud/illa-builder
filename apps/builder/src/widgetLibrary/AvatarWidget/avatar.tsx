import { getColorByString } from "@illa-public/utils"
import { FC, useCallback, useMemo } from "react"
import { Avatar } from "@illa-design/react"
import { getIcon } from "@/widgetLibrary/IconWidget/utils"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { AvatarWidgetProps } from "./interface"
import {
  applyLabelAndComponentWrapperStyle,
  labelCaptionStyle,
  labelContainerStyle,
  labelStyle,
} from "./style"

export const AvatarWidget: FC<AvatarWidgetProps> = (props) => {
  const {
    allowWrap,
    labelPosition,
    triggerEventHandler,
    label,
    labelAlign,
    labelCaption,
    labelHidden,
    avatarType,
    icon,
    text,
    image,
    avatarSize,
    colorScheme,
    updateComponentHeight,
  } = props

  const finalColorScheme = useMemo(() => {
    if (colorScheme) {
      return colorScheme
    } else {
      switch (avatarType) {
        case "image":
          return getColorByString(image || "")
        case "icon":
          return getColorByString(icon || "")
        case "text":
          return getColorByString(text || "")
      }
    }
  }, [avatarType, colorScheme, icon, image, text])

  const currentIcon = getIcon(icon ?? "")

  const handleOnClick = useCallback(() => {
    triggerEventHandler("click")
  }, [triggerEventHandler])

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
      <div css={applyLabelAndComponentWrapperStyle(labelPosition, labelHidden)}>
        <div css={labelContainerStyle(labelAlign)}>
          {!labelHidden && (
            <>
              <span css={labelStyle(allowWrap)}>{label}</span>
              <span css={labelCaptionStyle(allowWrap)}>{labelCaption}</span>
            </>
          )}
        </div>

        {avatarType === "image" && (
          <Avatar
            src={image ?? ""}
            size={avatarSize}
            colorScheme={finalColorScheme}
            onClick={handleOnClick}
          />
        )}
        {avatarType === "icon" && (
          <Avatar
            icon={currentIcon?.({})}
            size={avatarSize}
            colorScheme={finalColorScheme}
            onClick={handleOnClick}
          />
        )}
        {avatarType === "text" && (
          <Avatar
            text={text?.slice(0, 2)}
            size={avatarSize}
            colorScheme={finalColorScheme}
            onClick={handleOnClick}
          />
        )}
      </div>
    </AutoHeightContainer>
  )
}

AvatarWidget.displayName = "AvatarWidget"
export default AvatarWidget
