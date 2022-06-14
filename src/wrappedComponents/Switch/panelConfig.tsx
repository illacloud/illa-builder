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
        id: "image-interaction-tooltip",
        attrName: "events",
        labelName: "Event Handler",
        labelDesc: "xxxxx",
        setterType: "EVENT_HANDLER_SETTER",
        useCustomLabel: true,
        childrenSetter: [
          {
            id: "event",
            labelName: "Event",
            setterType: "BASE_SELECT_SETTER",
            attrName: "event",
            options: [{ label: "Change", value: "onChange" }],
          },
          {
            id: "type",
            labelName: "Action",
            setterType: "BASE_SELECT_SETTER",
            attrName: "type",
            options: [
              { label: "Trigger Query", value: "datasource" },
              { label: "Control component", value: "widget" },
              { label: "Run script", value: "script" },
              { label: "Go to URL", value: "openUrl" },
              { label: "Show notification", value: "showNotification" },
              { label: "Set temporary state", value: "state" },
            ],
          },
          {
            id: "query",
            labelName: "Query",
            setterType: "BASE_SELECT_SETTER",
            attrName: "targetId",
            bindAttrName: "type",
            shown: (type) => type === "datasource",
            options: [],
          },
          {
            id: "component",
            labelName: "Component",
            setterType: "EVENT_TARGET_SELECT_SETTER",
            attrName: "targetId",
            bindAttrName: "type",
            shown: (type) => type === "widget",
            options: [],
          },
          {
            id: "Method",
            labelName: "Method",
            setterType: "BASE_SELECT_SETTER",
            attrName: "method",
            bindAttrName: "type",
            shown: (type) => type === "widget",
            options: [
              { label: "Set Value", value: "setValue" },
              { label: "Clear Value", value: "clearValue" },
              { label: "Toggle Value", value: "toggleValue" },
            ],
          },
          {
            id: "disabled",
            labelName: "Disabled",
            setterType: "DYNAMIC_SWITCH_SETTER",
            attrName: "disabled",
            bindAttrName: "type",
            useCustomLabel: true,
            shown: (type) => type === "widget",
          },
          {
            id: "script",
            setterType: "INPUT_SETTER",
            attrName: "script",
            bindAttrName: "type",
            shown: (type) => type === "script",
          },
          {
            id: "URL",
            labelName: "URL",
            setterType: "INPUT_SETTER",
            attrName: "url",
            bindAttrName: "type",
            shown: (type) => type === "openUrl",
          },
          {
            id: "newTab",
            labelName: "New Tab",
            setterType: "DYNAMIC_SWITCH_SETTER",
            attrName: "newTab",
            bindAttrName: "type",
            useCustomLabel: true,
            shown: (type) => type === "openUrl",
          },
          {
            id: "title",
            labelName: "Title",
            setterType: "INPUT_SETTER",
            attrName: "title",
            bindAttrName: "type",
            shown: (type) => type === "showNotification",
          },
          {
            id: "description",
            labelName: "Description",
            setterType: "INPUT_SETTER",
            attrName: "description",
            bindAttrName: "type",

            shown: (type) => type === "showNotification",
          },
          {
            id: "notification-type",
            labelName: "Type",
            setterType: "BASE_SELECT_SETTER",
            attrName: "notificationType",
            bindAttrName: "type",
            shown: (type) => type === "showNotification",
            options: [
              { label: "Success", value: "success" },
              { label: "Error", value: "error" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" },
            ],
          },
          {
            id: "duration",
            labelName: "Duration",
            setterType: "INPUT_SETTER",
            attrName: "duration",
            bindAttrName: "type",
            shown: (type) => type === "showNotification",
          },
          {
            id: "State",
            labelName: "State",
            setterType: "BASE_SELECT_SETTER",
            attrName: "targetId",
            bindAttrName: "type",
            shown: (type) => type === "state",
            options: [],
          },
          {
            id: "value",
            labelName: "Value",
            setterType: "INPUT_SETTER",
            attrName: "stateValue",
            bindAttrName: "type",
            shown: (type) => type === "state",
          },
          {
            id: "enabled",
            labelName: "Only run when",
            labelDesc: "xxxxx",
            setterType: "INPUT_SETTER",
            attrName: "enabled",
          },
        ],
      },
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
