import {
  HorizontalCenter,
  HorizontalEnd,
  HorizontalStart,
} from "@/wrappedComponents/svg"
import { colorSchemeOptions } from "@/wrappedComponents/colorSchemeOptions"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"

const OptionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

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
      },
      {
        id: "divider-basic-text-align",
        labelName: i18n.t("editor.inspect.setter_label.text_align"),
        attrName: "textAlign",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: (
              <div style={OptionsStyle}>
                <HorizontalStart />
              </div>
            ),
            value: "start",
          },
          {
            label: (
              <div style={OptionsStyle}>
                <HorizontalCenter />
              </div>
            ),
            value: "center",
          },
          {
            label: (
              <div style={OptionsStyle}>
                <HorizontalEnd />
              </div>
            ),
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
        setterType: "INPUT_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        attrName: "hidden",
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
        attrName: "style",
        useCustomLabel: true,
        childrenSetter: [
          {
            id: "divider-style-color",
            labelName: i18n.t("editor.inspect.setter_label.color"),
            setterType: "COLOR_SELECT_SETTER",
            attrName: "color",
            defaultValue: "grayBlue",
            options: colorSchemeOptions,
          },
          {
            id: "divider-style-text-size",
            labelName: i18n.t("editor.inspect.setter_label.text_size"),
            setterType: "INPUT_SETTER",
            attrName: "textSize",
          },
        ],
      },
    ],
  },
]
