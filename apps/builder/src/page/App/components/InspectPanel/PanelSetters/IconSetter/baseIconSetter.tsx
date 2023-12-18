import { FC, MouseEventHandler, useCallback, useEffect, useState } from "react"
import { ErrorCircleIcon, getColor } from "@illa-design/react"
import {
  applyBaseIconWrapperStyle,
  clearIconStyle,
  iconContentStyle,
  iconSelectorContainerStyle,
  iconSelectorIconStyle,
} from "@/page/App/components/InspectPanel/PanelSetters/IconSetter/style"
import { BaseIconSetterProps, IconDataType } from "./interface"

export const BaseIconSetter: FC<BaseIconSetterProps> = (props) => {
  const { attrName, isSetterSingleRow, handleUpdateDsl, showData } = props

  const [displayData, setDisplayData] = useState<IconDataType | undefined>(
    undefined,
  )

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

  return (
    <div css={applyBaseIconWrapperStyle(isSetterSingleRow)}>
      <div css={iconSelectorContainerStyle}>
        <div css={iconSelectorIconStyle}>
          {displayData?.getIcon && displayData?.getIcon({})}
        </div>
        <span css={iconContentStyle}>{displayData?.name ?? ""}</span>
        <div css={clearIconStyle} onClick={handleClearClick}>
          <ErrorCircleIcon color={getColor("grayBlue", "05")} />
        </div>
      </div>
    </div>
  )
}

BaseIconSetter.displayName = "BaseIconSetter"
