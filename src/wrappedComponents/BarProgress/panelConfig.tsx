import { HorizontalEnd, HorizontalStart } from "@/wrappedComponents/svg"
import { colorSchemeOptions } from "@/wrappedComponents/colorSchemeOptions"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"

const OptionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const BAR_PROGRESS_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "bar-progress-basic",
    groupName: "BASIC",
    children: [
      {
        id: "bar-progress-basic-Value",
        labelName: i18n.t("editor.inspect.setter_label.value"),
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "bar-progress-label",
    groupName: "LABEL",
    children: [
      {
        id: "bar-progress-label-label",
        labelName: i18n.t("editor.inspect.setter_label.label"),
        attrName: "label",
        setterType: "INPUT_SETTER",
      },
      {
        id: "bar-progress-label-caption",
        labelName: i18n.t("editor.inspect.setter_label.caption"),
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
      },
      {
        id: "bar-progress-label-position",
        labelName: i18n.t("editor.inspect.setter_label.label_position"),
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: "bar-progress-label-alignment",
        labelName: i18n.t("editor.inspect.setter_label.label_alignment"),
        attrName: "labelAlign",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: (
              <div style={OptionsStyle}>
                <HorizontalStart />
              </div>
            ),
            value: "left",
          },
          {
            label: (
              <div style={OptionsStyle}>
                <HorizontalEnd />
              </div>
            ),
            value: "right",
          },
        ],
      },
      {
        id: "bar-progress-label-labelWidth",
        labelName: i18n.t("editor.inspect.setter_label.label_width"),
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "bar-progress-adornments",
    groupName: "ADORNMENTS",
    children: [
      {
        id: "bar-progress-adornments-showText",
        labelName: i18n.t("editor.inspect.setter_label.hide_value_label"),
        attrName: "showText",
        setterType: "SWITCH_SETTER",
      },
      {
        id: "bar-progress-adornments-tooltip",
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "bar-progress-layout",
    groupName: "LAYOUT",
    children: [
      {
        id: "bar-progress-layout-hidden",
        setterType: "INPUT_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        attrName: "hidden",
        defaultValue: false,
      },
    ],
  },
  {
    id: "bar-progress-style",
    groupName: "STYLE",
    children: [
      {
        id: "bar-progress-style-list",
        setterType: "LIST_SETTER",
        isFullWidth: true,
        labelName: i18n.t("editor.inspect.setter_label.styles"),
        attrName: "styles",
        useCustomLabel: true,
        childrenSetter: [
          {
            id: "bar-progress-color",
            labelName: i18n.t("editor.inspect.setter_label.color"),
            setterType: "COLOR_SELECT_SETTER",
            attrName: "color",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
          {
            id: "bar-progress-trailColor",
            labelName: i18n.t("editor.inspect.setter_label.trail_color"),
            setterType: "COLOR_SELECT_SETTER",
            attrName: "trailColor",
            defaultValue: "gray",
            options: colorSchemeOptions,
          },
          {
            id: "bar-progress-strokeWidth",
            labelName: i18n.t("editor.inspect.setter_label.stroke_width"),
            setterType: "INPUT_SETTER",
            attrName: "strokeWidth",
            defaultValue: "4px",
          },
        ],
      },
    ],
  },
]
