import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { AlignmentLeftIcon, AlignmentRightIcon } from "./svg"

const OptionsStyle = {
  width: "77px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: globalColor(`--${illaPrefix}-grayBlue-04`),
}

export const INPUT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "input-options",
    groupName: "Options",
    children: [
      {
        id: "input-basic-defaultValue",
        labelName: "Default Value",
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
      {
        id: "input-basic-placeholder",
        labelName: "Placeholder",
        attrName: "placeholder",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "input-label",
    groupName: "Label",
    children: [
      {
        id: "input-label-label",
        labelName: "Label",
        attrName: "label",
        setterType: "INPUT_SETTER",
      },
      {
        id: "input-label-caption",
        labelName: "Caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
      },
      {
        id: "input-label-position",
        labelName: "Position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: <div style={OptionsStyle}>Left</div>, value: "left" },
          { label: <div style={OptionsStyle}>Right</div>, value: "right" },
        ],
      },
      {
        id: "input-label-alignment",
        labelName: "Alignment",
        attrName: "labelAlign",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: (
              <div style={OptionsStyle}>
                <AlignmentLeftIcon />
              </div>
            ),
            value: "left",
          },
          {
            label: (
              <div style={OptionsStyle}>
                <AlignmentRightIcon />
              </div>
            ),
            value: "right",
          },
        ],
      },
    ],
  },
  {
    id: "input-validation",
    groupName: "Validation",
    children: [
      {
        id: "input-validation-required",
        labelName: "Required field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "required",
      },
      {
        id: "input-validation-pattern",
        labelName: "Pattern",
        setterType: "INPUT_SETTER",
        attrName: "pattern",
      },
      {
        id: "input-validation-regex",
        labelName: "Regex",
        setterType: "INPUT_SETTER",
        attrName: "regex",
      },
      {
        id: "input-validation-max",
        labelName: "Max length",
        setterType: "INPUT_SETTER",
        attrName: "maxLength",
      },
      {
        id: "input-validation-min",
        labelName: "min Length",
        setterType: "INPUT_SETTER",
        attrName: "minLength",
      },
      {
        id: "input-validation-custom",
        labelName: "Custom rule",
        setterType: "INPUT_SETTER",
        attrName: "custom rule",
      },
      {
        id: "input-validation-hide-message",
        labelName: "Hide validation message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "input-interaction",
    groupName: "Interaction",
    children: [
      {
        id: "input-interaction-disabled",
        labelName: "Disabled",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "false",
        defaultValue: false,
      },
      {
        id: "input-interaction-readonly",
        labelName: "Readonly",
        attrName: "readOnly",
        setterType: "INPUT_SETTER",
        placeholder: "false",
        defaultValue: false,
      },
    ],
  },
  {
    id: "input-Adornments",
    groupName: "Adornments",
    children: [
      {
        id: "input-adornments-showClear",
        labelName: "Show clear button",
        attrName: "allowClear",
        useCustomLabel: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
      },
      {
        id: "input-adornments-showChartCount",
        labelName: "Show character count",
        attrName: "showCharacterCount",
        useCustomLabel: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
      },
      {
        id: "input-adornments-prefixText",
        labelName: "Prefix text",
        attrName: "prefixText",
        setterType: "INPUT_SETTER",
      },
      {
        id: "input-adornments-suffixText",
        labelName: "Suffix text",
        attrName: "suffixText",
        setterType: "INPUT_SETTER",
      },
      {
        id: "input-adornments-tooltip",
        labelName: "Tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "input-layout",
    groupName: "Layout",
    children: [
      {
        id: "input-layout-hidden",
        labelName: "Hidden",
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        placeholder: "false",
      },
    ],
  },
]
