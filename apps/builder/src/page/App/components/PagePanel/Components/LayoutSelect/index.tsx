import { ExpandIcon, Trigger } from "@illa-design/react"
import { FC, useCallback } from "react"
import {
  LayoutOptionItemProps,
  LayoutOptionsPanelProps,
  LayoutSelectProps,
} from "./interface"
import {
  applyLayoutOptionItemIconStyle,
  layoutOptionItemLabelStyle,
  layoutOptionItemWrapperStyle,
  layoutOptionsPanelWrapperStyle,
  layoutSelectWrapperStyle,
} from "./style"
import { ReactComponent as DefaultIcon } from "@/assets/rightPagePanel/layout/default.svg"
import { ReactComponent as PresetAIcon } from "@/assets/rightPagePanel/layout/preset-a.svg"
import { ReactComponent as PresetBIcon } from "@/assets/rightPagePanel/layout/preset-b.svg"
import { ReactComponent as PresetCIcon } from "@/assets/rightPagePanel/layout/preset-c.svg"
import { ReactComponent as PresetDIcon } from "@/assets/rightPagePanel/layout/preset-d.svg"
import { ReactComponent as PresetEIcon } from "@/assets/rightPagePanel/layout/preset-e.svg"
import { useDispatch, useSelector } from "react-redux"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getCurrentPageDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"

export const LAYOUT_OPTIONS = [
  {
    label: "Default",
    value: "default",
    icon: <DefaultIcon />,
  },
  { label: "Preset A", value: "presetA", icon: <PresetAIcon /> },
  { label: "Preset B", value: "presetB", icon: <PresetBIcon /> },
  { label: "Preset C", value: "presetC", icon: <PresetCIcon /> },
  { label: "Preset D", value: "presetD", icon: <PresetDIcon /> },
  { label: "Preset E", value: "presetE", icon: <PresetEIcon /> },
]

export const findLayoutOptionItem = (layoutValue: string) => {
  const targetItem = LAYOUT_OPTIONS.find((item) => item.value === layoutValue)
  return targetItem?.label || "Customer"
}

export const LayoutOptionItem: FC<LayoutOptionItemProps> = (props) => {
  const { isSelected, label, value, icon, selectedValue } = props
  const dispatch = useDispatch()
  const currentPageDisplayName = useSelector(getCurrentPageDisplayName)

  const handleChangeLayout = useCallback(() => {
    if (selectedValue === value || !currentPageDisplayName) return
    dispatch(
      componentsActions.updateTargetPageLayoutReducer({
        pageName: currentPageDisplayName,
        layout: value as
          | "default"
          | "presetA"
          | "presetB"
          | "presetC"
          | "presetD"
          | "presetE",
      }),
    )
  }, [currentPageDisplayName, dispatch, selectedValue, value])

  return (
    <div css={layoutOptionItemWrapperStyle} onClick={handleChangeLayout}>
      <div css={applyLayoutOptionItemIconStyle(isSelected)} data-value={value}>
        {icon}
      </div>
      <span css={layoutOptionItemLabelStyle} data-value={value}>
        {label}
      </span>
    </div>
  )
}

export const LayoutOptionsPanel: FC<LayoutOptionsPanelProps> = (props) => {
  const { selectedValue } = props

  return (
    <div css={layoutOptionsPanelWrapperStyle}>
      {LAYOUT_OPTIONS.map((item) => {
        return (
          <LayoutOptionItem
            key={`${item.label}-${item.value}`}
            label={item.label}
            value={item.value}
            icon={item.icon}
            isSelected={selectedValue === item.value}
            selectedValue={selectedValue}
          />
        )
      })}
    </div>
  )
}

export const LayoutSelect: FC<LayoutSelectProps> = (props) => {
  const { value } = props
  return (
    <Trigger
      trigger="click"
      content={<LayoutOptionsPanel selectedValue={value} />}
      position="bottom-end"
      colorScheme="white"
      withoutPadding
    >
      <div css={layoutSelectWrapperStyle}>
        <span>{findLayoutOptionItem(value)}</span>
        <ExpandIcon />
      </div>
    </Trigger>
  )
}
