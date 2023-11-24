import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { DownIcon, Trigger, useModal } from "@illa-design/react"
import DefaultIcon from "@/assets/rightPagePanel/layout/default.svg?react"
import PresetAIcon from "@/assets/rightPagePanel/layout/preset-a.svg?react"
import PresetBIcon from "@/assets/rightPagePanel/layout/preset-b.svg?react"
import PresetCIcon from "@/assets/rightPagePanel/layout/preset-c.svg?react"
import PresetDIcon from "@/assets/rightPagePanel/layout/preset-d.svg?react"
import PresetEIcon from "@/assets/rightPagePanel/layout/preset-e.svg?react"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { trackInEditor } from "@/utils/mixpanelHelper"
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
  return targetItem?.label || "Custom"
}

export const LayoutOptionItem: FC<LayoutOptionItemProps> = (props) => {
  const { isSelected, label, value, icon, selectedValue, currentPageName } =
    props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const modal = useModal()

  const handleChangeLayout = useCallback(() => {
    if (selectedValue === value || !currentPageName) return
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SELECT, {
      element: "preset_selection",
      parameter3: value,
    })
    modal.show({
      w: "496px",
      children: t("editor.page.model_tips.change_layout_message"),
      cancelText: t("editor.page.model_tips.cancel_button"),
      okText: t("editor.page.model_tips.ok_button"),
      okButtonProps: {
        colorScheme: "red",
      },
      closable: false,
      onOk: () => {
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
          element: "preset_confirm",
          parameter3: value,
        })
        dispatch(
          componentsActions.updateTargetPageLayoutReducer({
            pageName: currentPageName,
            layout: value as
              | "default"
              | "presetA"
              | "presetB"
              | "presetC"
              | "presetD"
              | "presetE",
          }),
        )
      },
    })
  }, [currentPageName, dispatch, modal, selectedValue, t, value])

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
  const { selectedValue, currentPageName } = props

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
            currentPageName={currentPageName}
          />
        )
      })}
    </div>
  )
}

export const LayoutSelect: FC<LayoutSelectProps> = (props) => {
  const { value, currentPageName } = props
  return (
    <Trigger
      trigger="click"
      content={
        <LayoutOptionsPanel
          selectedValue={value}
          currentPageName={currentPageName}
        />
      }
      position="bottom-end"
      colorScheme="white"
      withoutPadding
      closeOnInnerClick
      onVisibleChange={(visible) => {
        if (visible) {
          trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
            element: "preset_selection",
          })
        }
      }}
    >
      <div css={layoutSelectWrapperStyle}>
        <span>{findLayoutOptionItem(value)}</span>
        <DownIcon />
      </div>
    </Trigger>
  )
}
