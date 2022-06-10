import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { HorizontalStart, HorizontalEnd } from "@/wrappedComponents/svg"
import { colorSchemeOptions } from "@/wrappedComponents/colorSchemeOptions"
import i18n from "@/i18n/config"

const OptionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const SWITCH_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "switch-basic",
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: "switch-basic-defaultValue",
        labelName: i18n.t("editor.inspect.setter_label.default_value"),
        attrName: "value",
        setterType: "INPUT_SETTER",
        placeholder: "false",
      },
    ],
  },
  {
    id: "switch-label",
    groupName: i18n.t("editor.inspect.setter_group.label"),
    children: [
      {
        id: "switch-label-label",
        labelName: i18n.t("editor.inspect.setter_label.label"),
        attrName: "label",
        setterType: "INPUT_SETTER",
      },
      {
        id: "switch-label-caption",
        labelName: i18n.t("editor.inspect.setter_label.caption"),
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
      },
      {
        id: "switch-label-position",
        labelName: i18n.t("editor.inspect.setter_label.label_position"),
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      },
      {
        id: "switch-label-alignment",
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
        id: "switch-label-labelWidth",
        labelName: i18n.t("editor.inspect.setter_label.label_width"),
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "switch-interaction",
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        id: "switch-interaction-disabled",
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "false",
        defaultValue: false,
      },
    ],
  },
  {
    id: "switch-Adornments",
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: "switch-adornments-tooltip",
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "switch-validation",
    groupName: i18n.t("editor.inspect.setter_group.validation"),
    children: [
      {
        id: "switch-validation-required",
        labelName: i18n.t("editor.inspect.setter_label.required_field"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "required",
      },
      {
        id: "switch-validation-hide-message",
        labelName: i18n.t(
          "editor.inspect.setter_label.hide_validation_message",
        ),
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "switch-layout",
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: "switch-layout-hidden",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        placeholder: "false",
      },
    ],
  },
  {
    id: "switch-style",
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: "switch-style-radius",
        labelName: i18n.t("editor.inspect.setter_label.background_color"),
        attrName: "checkedBackgroundColor",
        setterType: "COLOR_SELECT_SETTER",
        defaultValue: "blue",
        options: colorSchemeOptions,
      },
    ],
  },
]
