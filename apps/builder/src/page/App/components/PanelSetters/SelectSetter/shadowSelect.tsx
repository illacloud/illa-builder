import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { DropList, DropListItem, Dropdown } from "@illa-design/react"
import { ReactComponent as ShadowIcon } from "@/assets/shadow-icon.svg"
import { BaseSelectSetterProps } from "@/page/App/components/PanelSetters/SelectSetter/interface"
import {
  shadowIconHotSpotStyle,
  shadowSelectStyle,
  shadowSelectWrapperStyle,
} from "@/page/App/components/PanelSetters/SelectSetter/style"
import { trackInEditor } from "@/utils/mixpanelHelper"

const ShadowSelect: FC<BaseSelectSetterProps> = (props) => {
  const { options, attrName, handleUpdateDsl, value, widgetType } = props

  const { t } = useTranslation()

  const dropList = useMemo(() => {
    return options?.map((option: { label: string; value: string }) => {
      return (
        <DropListItem
          key={option.label}
          value={option.value}
          selected={value === option.value}
          colorScheme="techPurple"
          title={option.label}
          onClick={() => {
            handleUpdateDsl(attrName, option.value)
            trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CHANGE, {
              element: "component_inspect_select",
              parameter1: widgetType,
              parameter2: attrName,
              parameter3: value,
            })
          }}
        />
      )
    })
  }, [attrName, handleUpdateDsl, options, value, widgetType])

  return (
    <div css={shadowSelectWrapperStyle}>
      <div css={shadowSelectStyle}>
        <div css={shadowIconHotSpotStyle}>
          <ShadowIcon />
        </div>
        <Dropdown
          trigger="click"
          position="bottom"
          autoAlignPopupWidth
          dropList={<DropList>{dropList}</DropList>}
          onVisibleChange={(visible) => {
            if (visible) {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "component_inspect_select",
                parameter1: widgetType,
                parameter2: attrName,
              })
            }
          }}
        >
          <div style={{ width: "130px" }}>
            {t(`editor.inspect.setter_option.shadow.${value || "small"}`)}
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

ShadowSelect.displayName = "ShadowSelect"

export default ShadowSelect
