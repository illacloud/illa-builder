import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalStartIcon,
} from "@illa-design/icon"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const DIVIDER_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "divider-basic",
    groupName: "editor.inspect.setter_group.basic",
    children: [
      {
        id: "divider-basic-text",
        labelName: "editor.inspect.setter_label.text",
        attrName: "text",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "divider-basic-text-align",
        labelName: "editor.inspect.setter_label.text_align",
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
    groupName: "editor.inspect.setter_group.label",
    children: [
      {
        id: "divider-layout-hidden",
        setterType: "INPUT_SETTER",
        labelName: "editor.inspect.setter_label.hidden",
        attrName: "hidden",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "divider-style",
    groupName: "editor.inspect.setter_group.style",
    children: [
      {
        id: "divider-style-list",
        setterType: "LIST_SETTER",
        attrName: "styles",
        labelName: "editor.inspect.setter_label.styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "divider-style-color",
            labelName: "editor.inspect.setter_label.theme_color",
            setterType: "COLOR_SELECT_SETTER",
            attrName: "colorScheme",
            defaultValue: "grayBlue",
            options: colorSchemeOptions,
          },
          {
            id: "divider-style-text-size",
            labelName: "editor.inspect.setter_label.text_size",
            setterType: "INPUT_SETTER",
            attrName: "textSize",
            defaultValue: "14px",
            expectedType: VALIDATION_TYPES.STRING,
          },
        ],
      },
    ],
  },
]
