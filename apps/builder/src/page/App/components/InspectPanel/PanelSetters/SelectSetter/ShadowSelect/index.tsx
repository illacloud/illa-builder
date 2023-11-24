import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Select, SelectValue } from "@illa-design/react"
import ShadowIcon from "@/assets/shadow-icon.svg?react"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ShadowSelectProps } from "./interface"
import { setterContainerStyle } from "./style"

const ShadowSelect: FC<ShadowSelectProps> = (props) => {
  const { attrName, handleUpdateMultiAttrDSL, value, widgetType, labelName } =
    props

  const { t } = useTranslation()

  const options = [
    {
      label: t("editor.inspect.setter_option.shadow.none"),
      value: "none",
    },
    {
      label: t("editor.inspect.setter_option.shadow.large"),
      value: "large",
    },
    {
      label: t("editor.inspect.setter_option.shadow.medium"),
      value: "medium",
    },
    {
      label: t("editor.inspect.setter_option.shadow.small"),
      value: "small",
    },
  ]

  const handleUpdateShadow = (value: SelectValue | undefined) => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CHANGE, {
      element: "component_inspect_select",
      parameter1: widgetType,
      parameter2: attrName,
      parameter3: value,
    })
    handleUpdateMultiAttrDSL?.({
      [attrName]: value,
    })
  }

  return (
    <div css={setterContainerStyle}>
      <PanelLabel labelName={labelName} labelSize="small" />
      <Select
        onChange={handleUpdateShadow}
        value={value}
        prefix={<ShadowIcon />}
        w="170px"
        colorScheme="techPurple"
        options={options}
      />
    </div>
  )
}

ShadowSelect.displayName = "ShadowSelect"

export default ShadowSelect
