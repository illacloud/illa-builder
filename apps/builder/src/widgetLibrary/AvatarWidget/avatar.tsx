import { getColorByString } from "@illa-public/utils"
import { FC, useCallback, useMemo } from "react"
import { Avatar } from "@illa-design/react"
import { getIcon } from "@/widgetLibrary/IconWidget/utils"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { AvatarWidgetProps, WrappedAvatarProps } from "./interface"
import {
  applyLabelAndComponentWrapperStyle,
  labelCaptionStyle,
  labelContainerStyle,
  labelStyle,
} from "./style"
import { getSafeNode } from "./utils"

export const WrapperAvatar: FC<WrappedAvatarProps> = ({
  allowWrap = false,
  labelPosition = "right",
  label,
  labelAlign = "left",
  labelCaption,
  labelHidden,
  avatarType,
  icon,
  text,
  imageSrc,
  avatarSize,
  colorScheme,
  handleOnClick,
}) => {
  const finalColorScheme = useMemo(() => {
    if (colorScheme) {
      return colorScheme
    } else {
      switch (avatarType) {
        case "image":
          return getColorByString(imageSrc || "")
        case "icon":
          return getColorByString(icon || "")
        case "text":
          return getColorByString(text || "")
      }
    }
  }, [avatarType, colorScheme, icon, imageSrc, text])

  const currentIcon = getIcon(icon ?? "")

  return (
    <div css={applyLabelAndComponentWrapperStyle(labelPosition, labelHidden)}>
      <div css={labelContainerStyle(labelAlign)}>
        {!labelHidden && (
          <>
            <span css={labelStyle(allowWrap)}>{getSafeNode(label)}</span>
            <span css={labelCaptionStyle(allowWrap)}>
              {getSafeNode(labelCaption)}
            </span>
          </>
        )}
      </div>

      {avatarType === "image" && (
        <Avatar
          src={imageSrc ?? ""}
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
          text={getSafeNode(text?.slice(0, 2)?.toLocaleUpperCase())}
          size={avatarSize}
          colorScheme={finalColorScheme}
          onClick={handleOnClick}
        />
      )}
    </div>
  )
}
export const AvatarWidget: FC<AvatarWidgetProps> = (props) => {
  const { triggerEventHandler, updateComponentHeight, disabled } = props

  const handleOnClick = useCallback(() => {
    !disabled && triggerEventHandler("click")
  }, [disabled, triggerEventHandler])

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
      <WrapperAvatar {...props} handleOnClick={handleOnClick} />
    </AutoHeightContainer>
  )
}

AvatarWidget.displayName = "AvatarWidget"
export default AvatarWidget
