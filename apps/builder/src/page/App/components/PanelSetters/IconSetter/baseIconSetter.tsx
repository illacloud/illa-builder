import { FC, MouseEventHandler, useCallback, useEffect, useState } from "react"
import { ErrorCircleIcon, Input } from "@illa-design/react"
import {
  applyBaseIconWrapperStyle,
  clearIconStyle,
  iconContentStyle,
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

  const handleMouseEnter = useCallback(() => {
    setShowClear(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setShowClear(false)
  }, [])

  return (
    <div
      css={applyBaseIconWrapperStyle(isSetterSingleRow)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div css={iconSelectorContainerStyle}>
        <div css={iconSelectorIconStyle}>
          {displayData?.getIcon && displayData?.getIcon({})}
        </div>
        <Input
          css={iconContentStyle}
          value={displayData?.name ?? ""}
          disabled
        />
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
