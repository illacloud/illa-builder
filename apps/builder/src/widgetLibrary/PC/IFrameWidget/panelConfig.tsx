import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const baseWidgetName = "iframe"
export const IFRAME_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-src`,
        labelName: i18n.t("editor.inspect.setter_label.src"),
        attrName: "src",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        placeholder: "https://illacloud.com",
      },
    ],
  },
]
