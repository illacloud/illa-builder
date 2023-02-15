import { FC, MouseEventHandler, useCallback, useEffect, useState } from "react"
import { ErrorCircleIcon } from "@illa-design/react"
import {
  applyBaseIconWrapperStyle,
  clearIconStyle,
  iconContentStyle,
  iconNameStyle,
  iconSelectorContainerStyle,
  iconSelectorIconStyle,
} from "@/page/App/components/PanelSetters/IconSetter/style"
import { BaseIconSetterProps, IconDataType } from "./interface"

export const BaseIconSetter: FC<BaseIconSetterProps> = (props) => {
  const { attrName, isSetterSingleRow, handleUpdateDsl, showData } = props

  const [displayData, setDisplayData] = useState<IconDataType | undefined>(
    undefined,
  )
  const [showClear, setShowClear] = useState<boolean>(false)

  useEffect(() => {
    handleUpdateDsl(attrName, showData?.name)
    setDisplayData(showData)
  }, [attrName, handleUpdateDsl, showData])

  const handleClearClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation()
      setDisplayData(undefined)
      handleUpdateDsl(attrName, undefined)
    },
    [attrName, handleUpdateDsl],
  )

  const handleMouseEnter = () => {
    setShowClear(true)
  }

  const handleMouseLeave = () => {
    setShowClear(false)
  }

  return (
    <div
      css={applyBaseIconWrapperStyle(isSetterSingleRow)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div css={iconSelectorContainerStyle}>
        <div css={iconContentStyle}>
          <div css={iconSelectorIconStyle}>
            {displayData?.getIcon && displayData?.getIcon({})}
          </div>
          <div css={iconNameStyle}>{displayData?.name ?? ""}</div>
        </div>
        {showClear && (
          <div css={clearIconStyle} onClick={handleClearClick}>
            <ErrorCircleIcon />
          </div>
        )}
      </div>
    </div>
  )
}

BaseIconSetter.displayName = "BaseIconSetter"
