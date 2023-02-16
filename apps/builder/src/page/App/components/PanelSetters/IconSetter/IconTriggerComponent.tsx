import { t } from "i18next"
import { FC, Suspense, lazy, useCallback, useMemo, useState } from "react"
import { IconManifest } from "react-icons"
import { CloseIcon, Loading, Search } from "@illa-design/react"
import {
  IconShowType,
  IconTriggerComponentProps,
} from "@/page/App/components/PanelSetters/IconSetter/interface"
import {
  fallbackContainerStyle,
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
  rightPanelStyle,
  rightTopItemStyle,
  rightTopPanelStyle,
} from "@/page/App/components/PanelSetters/IconSetter/style"
import { ALL_ICONS } from "@/widgetLibrary/IconWidget/utils"

const defaultItem: IconManifest = {
  id: "default",
  name: "All",
  projectUrl: "",
  license: "MIT",
  licenseUrl: "https://opensource.org/licenses/MIT",
}

const iconsList = ALL_ICONS.sort((a, b) => (a.name > b.name ? 1 : -1))
const [firstItem, ...others] = iconsList
const realIconsNameLists = [defaultItem, ...others, firstItem]
realIconsNameLists.forEach((nameInfo) => {
  if (nameInfo.name.length > 16) {
    const names = nameInfo.name.split(" ")
    nameInfo.name = names.slice(0, names.length - 1).join(" ")
  }
})
const IconTypes = ["All", "Filled", "Outline"]

export const IconTriggerComponent: FC<IconTriggerComponentProps> = (props) => {
  const { handleCurrentIconClick, handleCloseModal } = props

  const [iconType, setIconType] = useState<IconShowType>("All")
  const [iconOrigin, setIconOrigin] = useState<string>("default")
  const [searchInput, setSearchInput] = useState<string>("")

  const RightBottomPanel = lazy(() => import("./IconPickerList"))

  const handleOnChange = (value: string) => {
    setSearchInput(value)
  }

  const handleIconOriginChange = (origin: string) => {
    setIconOrigin(origin)
  }

  const handleIconTypeChange = (type: string) => {
    setIconType(type as IconShowType)
  }

  const handleCloseIconClick = useCallback(
    () => handleCloseModal(false),
    [handleCloseModal],
  )

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
        {IconTypes.map((type) => (
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

  const Fallback = () => {
    return (
      <div css={fallbackContainerStyle}>
        <Loading />
      </div>
    )
  }

  const RightBottom = useMemo(() => {
    return (
      <Suspense fallback={<Fallback />}>
        <RightBottomPanel
          iconOrigin={iconOrigin}
          iconType={iconType}
          searchInput={searchInput}
          handleCurrentIconClick={handleCurrentIconClick}
        />
      </Suspense>
    )
  }, [
    RightBottomPanel,
    handleCurrentIconClick,
    iconOrigin,
    iconType,
    searchInput,
  ])

  const RightPanel = useMemo(() => {
    return (
      <div css={rightPanelStyle}>
        {RightTopPanel}
        {RightBottom}
      </div>
    )
  }, [RightBottom, RightTopPanel])

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
