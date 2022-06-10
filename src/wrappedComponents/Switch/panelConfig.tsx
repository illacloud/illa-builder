import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"
import { HorizontalStart, HorizontalEnd } from "@/wrappedComponents/svg"
import { colorSchemeOptions } from "@/wrappedComponents/colorSchemeOptions"

const OptionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const SWITCH_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "switch-basic",
    groupName: "BASIC",
    children: [
      {
        id: "switch-basic-defaultValue",
        labelName: "Default Value",
        attrName: "checked",
        setterType: "INPUT_SETTER",
        placeholder: "false",
      },
    ],
  },
  {
    id: "switch-label",
    groupName: "LABEL",
    children: [
      {
        id: "switch-label-label",
        labelName: "Label",
        attrName: "label",
        setterType: "INPUT_SETTER",
      },
      {
        id: "switch-label-caption",
        labelName: "Caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
      },
      {
        id: "switch-label-position",
        labelName: "Position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      },
      {
        id: "switch-label-alignment",
        labelName: "Alignment",
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
        labelName: "Width(%)",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "switch-interaction",
    groupName: "INTERACTION",
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
        labelName: "Disabled",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "false",
        defaultValue: false,
      },
    ],
  },
  {
    id: "switch-Adornments",
    groupName: "ADORNMENTS",
    children: [
      {
        id: "switch-adornments-tooltip",
        labelName: "Tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "switch-validation",
    groupName: "VALIDATION",
    children: [
      {
        id: "switch-validation-required",
        labelName: "Required field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "required",
      },
      {
        id: "switch-validation-hide-message",
        labelName: "Hide validation message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "switch-layout",
    groupName: "LAYOUT",
    children: [
      {
        id: "switch-layout-hidden",
        labelName: "Hidden",
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        placeholder: "false",
      },
    ],
  },
  {
    id: "switch-style",
    groupName: "STYLE",
    children: [
      {
        id: "switch-style-radius",
        labelName: "Background",
        attrName: "colorScheme",
        setterType: "COLOR_SELECT_SETTER",
        defaultValue: "blue",
        options: colorSchemeOptions,
      },
    ],
  },
]
