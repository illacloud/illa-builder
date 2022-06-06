import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"
import { HorizontalStart, HorizontalEnd } from "@/wrappedComponents/svg"

const OptionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const SELECT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "select-options",
    groupName: "OPTIONS",
    children: [
      {
        id: "select-options-mode",
        isFullWidth: true,
        attrName: "optionMode",
        setterType: "RADIO_GROUP_SETTER",
        defaultValue: "manual",
        options: [
          {
            label: "Manual",
            value: "manual",
          },
          {
            label: "Mapped",
            value: "mapped",
          },
        ],
      },
      {
        id: "select-basic-options",
        useCustomLabel: true,
        attrName: "options",
        setterType: "OPTION_LIST_SETTER",
        bindAttrName: "optionMode",
        shown: (value) => !value || value === "manual",
      },
      {
        id: "select-option-data-sources",
        labelName: "data sources",
        isFullWidth: true,
        attrName: "dataSources",
        setterType: "INPUT_SETTER",
        defaultValue: "{{[]}}",
        bindAttrName: "optionMode",
        shown: (value) => value === "mapped",
      },
      {
        id: "select-option-mapped",
        labelName: "Mapped Option",
        useCustomLabel: true,
        isFullWidth: true,
        attrName: "mappedOption",
        setterType: "OPTION_MAPPED_SETTER",
        bindAttrName: "optionMode",
        shown: (value) => value === "mapped",
      },
      {
        id: "select-basic-defaultValue",
        labelName: "Default Value",
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
      {
        id: "select-basic-placeholder",
        labelName: "Placeholder",
        attrName: "placeholder",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "select-label",
    groupName: "LABEL",
    children: [
      {
        id: "select-label-label",
        labelName: "Label",
        attrName: "label",
        setterType: "INPUT_SETTER",
      },
      {
        id: "select-label-caption",
        labelName: "Caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
      },
      {
        id: "select-label-position",
        labelName: "Position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      },
      {
        id: "select-label-alignment",
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
        id: "select-label-labelWidth",
        labelName: "Width(%)",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "select-validation",
    groupName: "VALIDATION",
    children: [
      {
        id: "select-validation-required",
        labelName: "Required field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "required",
      },
      {
        id: "select-validation-hide-message",
        labelName: "Hide validation message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "select-interaction",
    groupName: "INTERACTION",
    children: [
      {
        id: "select-interaction-disabled",
        labelName: "Disabled",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "false",
        defaultValue: false,
      },
      {
        id: "select-interaction-readonly",
        labelName: "Readonly",
        attrName: "readOnly",
        setterType: "INPUT_SETTER",
        placeholder: "false",
        defaultValue: false,
      },
    ],
  },
  {
    id: "select-Adornments",
    groupName: "ADORNMENTS",
    children: [
      {
        id: "select-adornments-showClear",
        labelName: "Show clear button",
        attrName: "showClear",
        useCustomLabel: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
      },
      {
        id: "select-adornments-prefixText",
        labelName: "Prefix text",
        attrName: "prefixText",
        setterType: "INPUT_SETTER",
      },
      {
        id: "select-adornments-suffixText",
        labelName: "Suffix text",
        attrName: "suffixText",
        setterType: "INPUT_SETTER",
      },
      {
        id: "select-adornments-tooltip",
        labelName: "Tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "select-layout",
    groupName: "LAYOUT",
    children: [
      {
        id: "select-layout-hidden",
        labelName: "Hidden",
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        placeholder: "false",
      },
    ],
  },
]
