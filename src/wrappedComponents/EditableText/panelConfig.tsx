import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"
import { globalColor, illaPrefix } from "@illa-design/theme"
import {
  AlignmentLeftIcon,
  AlignmentRightIcon,
} from "@/wrappedComponents/Input/svg"

const OptionsStyle = {
  width: "77px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: globalColor(`--${illaPrefix}-grayBlue-04`),
}

export const EDITABLE_TEXT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "editable-text-options",
    groupName: "Options",
    children: [
      {
        id: "editable-text-basic-defaultValue",
        labelName: "Default Value",
        attrName: "value", // todo@aoao
        setterType: "INPUT_SETTER",
      },
      {
        id: "editable-text-basic-placeholder",
        labelName: "Placeholder",
        attrName: "placeholder",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "editable-text-label",
    groupName: "Label",
    children: [
      {
        id: "editable-text-label-label",
        labelName: "Label",
        attrName: "label",
        setterType: "INPUT_SETTER",
      },
      {
        id: "editable-text-label-caption",
        labelName: "Caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
      },
      {
        id: "editable-text-label-position",
        labelName: "Position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: <div style={OptionsStyle}>Left</div>, value: "left" },
          { label: <div style={OptionsStyle}>Right</div>, value: "right" },
        ],
      },
      {
        id: "editable-text-label-alignment",
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
    id: "editable-text-validation",
    groupName: "Validation",
    children: [
      {
        id: "editable-text-validation-required",
        labelName: "Required field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "required",
      },
      {
        id: "editable-text-validation-pattern",
        labelName: "Pattern",
        setterType: "INPUT_SETTER",
        attrName: "pattern",
      },
      {
        id: "editable-text-validation-regex",
        labelName: "Regex",
        setterType: "INPUT_SETTER",
        attrName: "regex",
      },
      {
        id: "editable-text-validation-max",
        labelName: "Max length",
        setterType: "INPUT_SETTER",
        attrName: "maxLength",
      },
      {
        id: "editable-text-validation-min",
        labelName: "min Length",
        setterType: "INPUT_SETTER",
        attrName: "minLength",
      },
      {
        id: "editable-text-validation-custom",
        labelName: "Custom rule",
        setterType: "INPUT_SETTER",
        attrName: "custom rule",
      },
      {
        id: "editable-text-validation-hide-message",
        labelName: "Hide validation message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "editable-text-interaction",
    groupName: "Interaction",
    children: [
      {
        id: "editable-text-interaction-disabled",
        labelName: "Disabled",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "false",
        defaultValue: false,
      },
      {
        id: "editable-text-interaction-readonly",
        labelName: "Readonly",
        attrName: "readOnly",
        setterType: "INPUT_SETTER",
        placeholder: "false",
        defaultValue: false,
      },
    ],
  },
  {
    id: "editable-text-Adornments",
    groupName: "Adornments",
    children: [
      {
        id: "editable-text-adornments-showClear",
        labelName: "Show clear button",
        attrName: "allowClear",
        useCustomLabel: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
      },
      {
        id: "editable-text-adornments-showChartCount",
        labelName: "Show character count",
        attrName: "showCharacterCount",
        useCustomLabel: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
      },
      {
        id: "editable-text-adornments-prefixText",
        labelName: "Prefix text",
        attrName: "prefixText",
        setterType: "INPUT_SETTER",
      },
      {
        id: "editable-text-adornments-suffixText",
        labelName: "Suffix text",
        attrName: "suffixText",
        setterType: "INPUT_SETTER",
      },
      {
        id: "editable-text-adornments-tooltip",
        labelName: "Tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "editable-text-layout",
    groupName: "Layout",
    children: [
      {
        id: "editable-text-layout-hidden",
        labelName: "Hidden",
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        placeholder: "false",
      },
    ],
  },
]
