import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalStartIcon,
  VerticalStartIcon,
  VerticalCenterIcon,
  VerticalEndIcon,
} from "@illa-design/react"
import { colorSchemeOptions } from "@/widgetLibrary/colorSchemeOptions"
import i18n from "@/i18n/config"

export const TEXT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "text-basic",
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: "text-basic-inputModal",
        labelName: i18n.t("editor.inspect.setter_label.value"),
        attrName: "disableMarkdown",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Markdown", value: true },
          { label: "Plain Text", value: false },
        ],
      },
      {
        id: "text-basic-value",
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "text-adornments",
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: "text-adornments-startAdornment",
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        labelDesc: "xxxxx",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "text-layout",
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: "text-layout-col",
        labelName: i18n.t("editor.inspect.setter_label.horizontal_alignment"),
        attrName: "horizontalAlign",
        labelDesc: "xxxxxxx",
        setterType: "RADIO_GROUP_SETTER",
        isSetterSingleRow: true,
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
      {
        id: "text-layout-row",
        labelName: i18n.t("editor.inspect.setter_label.vertical_alignment"),
        setterType: "RADIO_GROUP_SETTER",
        labelDesc: "xxxxxxx",
        attrName: "verticalAlign",
        isSetterSingleRow: true,
        options: [
          {
            label: <VerticalStartIcon />,
            value: "start",
          },
          {
            label: <VerticalCenterIcon />,
            value: "center",
          },
          {
            label: <VerticalEndIcon />,
            value: "end",
          },
        ],
      },
      {
        id: "text-layout-hidden",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        expectedType: "Boolean",
      },
    ],
  },
  {
    id: "text-style",
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: "text-style-list",
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.color"),
        attrName: "color",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "text-style-color",
            labelName: i18n.t("editor.inspect.setter_label.text"),
            setterType: "COLOR_SELECT_SETTER",
            attrName: "textColor",
            defaultValue: "gray",
            options: colorSchemeOptions,
          },
          {
            id: "text-style-link-color",
            labelName: i18n.t("editor.inspect.setter_label.links_color"),
            setterType: "COLOR_SELECT_SETTER",
            attrName: "linkColor",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
        ],
      },
    ],
  },
]
