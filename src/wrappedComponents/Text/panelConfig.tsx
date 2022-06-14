import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import {
  HorizontalCenter,
  HorizontalEnd,
  HorizontalStart,
  VerticalStart,
  VerticalCenter,
  VerticalEnd,
} from "@/wrappedComponents/svg"
import { colorSchemeOptions } from "@/wrappedComponents/colorSchemeOptions"
import i18n from "@/i18n/config"

const AlignmentOptionStyle = {
  display: "flex",
  alignItems: "center",
}

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
        defaultValue: false,
        options: [
          { label: "Markdown", value: true },
          { label: "Plain Text", value: false },
        ],
      },
      {
        id: "text-basic-value",
        attrName: "value",
        isFullWidth: true,
        setterType: "INPUT_SETTER",
        defaultValue: "I'm a text",
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
        isFullWidth: true,
        setterType: "RADIO_GROUP_SETTER",
        defaultValue: "start",
        options: [
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <HorizontalStart />
              </div>
            ),
            value: "start",
          },
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <HorizontalCenter />
              </div>
            ),
            value: "center",
          },
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <HorizontalEnd />
              </div>
            ),
            value: "end",
          },
        ],
      },
      {
        id: "text-layout-row",
        labelName: i18n.t("editor.inspect.setter_label.vertical_alignment"),
        setterType: "RADIO_GROUP_SETTER",
        isFullWidth: true,
        labelDesc: "xxxxxxx",
        attrName: "verticalAlign",
        defaultValue: "start",
        options: [
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <VerticalStart />
              </div>
            ),
            value: "start",
          },
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <VerticalCenter />
              </div>
            ),
            value: "center",
          },
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <VerticalEnd />
              </div>
            ),
            value: "end",
          },
        ],
      },
      {
        id: "text-layout-hidden",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        setterType: "INPUT_SETTER",
        attrName: "hidden",
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
        isFullWidth: true,
        labelName: i18n.t("editor.inspect.setter_label.color"),
        attrName: "color",
        useCustomLabel: true,
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
