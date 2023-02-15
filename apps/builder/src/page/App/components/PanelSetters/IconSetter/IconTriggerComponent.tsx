import { t } from "i18next"
import { FC, useMemo, useState } from "react"
import { IconManifest } from "react-icons"
import { CloseIcon, Search, isFunction } from "@illa-design/react"
import { IconShowType } from "@/page/App/components/PanelSetters/IconSetter/interface"
import {
  getNameSelectedStyle,
  getSelectedStyle,
  headerCloseIconStyle,
  iconPickerBodyStyle,
  iconPickerContainerStyle,
  iconPickerHeaderContainerStyle,
  iconPickerHeaderTextStyle,
  iconPickerLeftPanelStyle,
  iconPickerSearchStyle,
  leftPanelItemStyle,
  rightBottomItemStyle,
  rightBottomStyle,
  rightPanelStyle,
  rightTopItemStyle,
  rightTopPanelStyle,
} from "@/page/App/components/PanelSetters/IconSetter/style"
import {
  ALL_ICONS,
  AllData,
  AllIconData,
} from "@/widgetLibrary/IconWidget/utils"

const defaultItem: IconManifest = {
  id: "default",
  name: "Default",
  projectUrl: "",
  license: "MIT",
  licenseUrl: "https://opensource.org/licenses/MIT",
}

const iconsList = ALL_ICONS.sort((a, b) => (a.name > b.name ? 1 : -1))
const [firstItem, ...others] = iconsList
const realIconsNameLists = [defaultItem, ...others, firstItem]

export const IconTriggerComponent: FC<any> = (props) => {
  const { handleCurrentIconClick, handleCloseModal } = props

  const [iconType, setIconType] = useState<IconShowType>("All")
  const [iconOrigin, setIconOrigin] = useState<string>("bs")
  const [searchInput, setSearchInput] = useState<string>("")

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

  const handleOnChange = (value: string) => {
    setSearchInput(value)
  }

  const handleIconOriginChange = (origin: string) => {
    setIconOrigin(origin)
  }

  const handleIconTypeChange = (type: string) => {
    setIconType(type as IconShowType)
  }

  const handleCloseIconClick = () => handleCloseModal(false)

  const Header = useMemo(
    () => (
      <div css={iconPickerHeaderContainerStyle}>
        <div css={iconPickerHeaderTextStyle}>Icon picker</div>
        <CloseIcon css={headerCloseIconStyle} onClick={handleCloseIconClick} />
      </div>
    ),
    [handleCloseIconClick],
  )

  const LeftPanel = useMemo(
    () => (
      <div css={iconPickerLeftPanelStyle}>
        {realIconsNameLists.map((info) => {
          const { name, id } = info
          return (
            <div
              css={[
                leftPanelItemStyle,
                getNameSelectedStyle(iconOrigin === id),
              ]}
              key={id}
              onClick={() => handleIconOriginChange(id)}
            >
              {name}
            </div>
          )
        })}
      </div>
    ),
    [iconOrigin],
  )

  const RightTopPanel = useMemo(() => {
    return (
      <div css={rightTopPanelStyle}>
        {["All", "Filled", "Outline"].map((type) => (
          <div
            css={[rightTopItemStyle, getSelectedStyle(iconType === type)]}
            key={type}
            onClick={() => handleIconTypeChange(type)}
          >
            {type}
          </div>
        ))}
      </div>
    )
  }, [iconType])

  const RightBottomPanel = useMemo(() => {
    console.log("Bottom: ", filteredIconsInfoSet)
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
  }, [filteredIconsInfoSet, handleCurrentIconClick])

  const RightPanel = useMemo(() => {
    return (
      <div css={rightPanelStyle}>
        {RightTopPanel}
        {RightBottomPanel}
      </div>
    )
  }, [RightBottomPanel, RightTopPanel])

  const IconPickerBody = useMemo(() => {
    return (
      <div css={iconPickerBodyStyle}>
        {LeftPanel}
        {RightPanel}
      </div>
    )
  }, [LeftPanel, RightPanel])

  const IconSearchBar = useMemo(
    () => (
      <div css={iconPickerSearchStyle}>
        <Search
          value={searchInput}
          colorScheme="techPurple"
          variant="fill"
          placeholder={t("editor.widget_picker.search_placeholder")}
          onChange={handleOnChange}
        />
      </div>
    ),
    [searchInput],
  )

  return (
    <div css={iconPickerContainerStyle}>
      {Header}
      {IconSearchBar}
      {IconPickerBody}
    </div>
  )
}

IconTriggerComponent.displayName = "IconTriggerComponent"
