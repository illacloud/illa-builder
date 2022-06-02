import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
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
        attrName: "value",
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
        attrName: "checkedBackgroundColor",
        setterType: "COLOR_SELECT_SETTER",
        defaultValue: "blue",
        options: colorSchemeOptions,
      },
    ],
  },
]
