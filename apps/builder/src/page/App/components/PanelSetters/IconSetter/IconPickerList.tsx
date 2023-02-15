import { FC } from "react"
import { isFunction } from "@illa-design/react"
import { IconPickerListProps } from "@/page/App/components/PanelSetters/IconSetter/interface"
import {
  rightBottomItemStyle,
  rightBottomStyle,
} from "@/page/App/components/PanelSetters/IconSetter/style"
import { AllData, AllIconData } from "@/widgetLibrary/IconWidget/utils"

const IconPickerList: FC<IconPickerListProps> = (props) => {
  const { iconOrigin, iconType, searchInput, handleCurrentIconClick } = props

  const iconSets = iconOrigin === "default" ? AllData : AllIconData[iconOrigin]
  const iconsInfo = iconSets
    ? Object.keys(iconSets).map((key) => ({
        name: key,
        getIcon: iconSets[key],
      }))
    : []

  const originAndTypeFilter =
    iconType === "All"
      ? iconsInfo
      : iconType === "Filled"
      ? iconsInfo.filter((icon) => icon.name.toLowerCase().includes("filled"))
      : iconsInfo.filter((icon) => icon.name.toLowerCase().includes("outline"))

  const filteredIconsInfoSet = !searchInput
    ? originAndTypeFilter
    : originAndTypeFilter.filter((icon) => icon.name.includes(searchInput))

  return (
    <div css={rightBottomStyle}>
      {filteredIconsInfoSet.map((icons) => {
        const { name, getIcon } = icons
        return (
          <span
            css={rightBottomItemStyle}
            key={name}
            onClick={() => handleCurrentIconClick(icons)}
          >
            {isFunction(getIcon) && getIcon({})}
          </span>
        )
      })}
    </div>
  )
}

IconPickerList.displayName = "IconPickerList"

export default IconPickerList
