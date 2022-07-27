import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalStartIcon,
} from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import i18n from "@/i18n/config"
import { EditableInputIconType } from "@/page/App/components/PanelSetters/InputSetter/interface"

export const DIVIDER_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "divider-basic",
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: "divider-basic-text",
        labelName: i18n.t("editor.inspect.setter_label.text"),
        attrName: "text",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "divider-basic-text-align",
        labelName: i18n.t("editor.inspect.setter_label.text_align"),
        attrName: "textAlign",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: <HorizontalStartIcon />,
            value: "start",
          },
          {
            label: <HorizontalCenterIcon />,
            value: "center",
          },
          {
            label: <HorizontalEndIcon />,
            value: "end",
          },
        ],
      },
    ],
  },
  {
    id: "divider-layout",
    groupName: i18n.t("editor.inspect.setter_group.label"),
    children: [
      {
        id: "divider-layout-hidden",
        setterType: "DYNAMIC_SWITCH_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        attrName: "hidden",
        useCustomLayout: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "divider-style",
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: "divider-style-list",
        setterType: "LIST_SETTER",
        attrName: "styles",
        labelName: i18n.t("editor.inspect.setter_label.styles"),
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "divider-style-text-size",
            labelName: i18n.t("editor.inspect.setter_label.text_size"),
            setterType: "EDITABLE_INPUT_SETTER",
            attrName: "textSize",
            iconName: EditableInputIconType.TEXT_SIZE,
            defaultValue: "14px",
            expectedType: VALIDATION_TYPES.STRING,
          },
        ],
      },
    ],
  },
]
