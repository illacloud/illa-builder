import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { HorizontalStart, HorizontalEnd } from "@/wrappedComponents/svg"

const OptionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const widgetBaseName = "number-input"

export const NUMBER_INPUT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${widgetBaseName}-BASIC`,
    groupName: "BASIC",
    children: [
      {
        id: `${widgetBaseName}-basic-default-value`,
        labelName: "Default Value",
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
      {
        id: `${widgetBaseName}-basic-placeholder`,
        labelName: "Placeholder",
        attrName: "placeholder",
        setterType: "INPUT_SETTER",
      },
      {
        id: `${widgetBaseName}-basic-decimal-place`,
        labelName: "Decimal place",
        labelDesc: "xxxx",
        attrName: "precision",
        setterType: "INPUT_SETTER",
      },
      {
        id: `${widgetBaseName}-basic-minimum`,
        labelName: "Minimum",
        attrName: "min",
        setterType: "INPUT_SETTER",
      },
      {
        id: `${widgetBaseName}-basic-maximum  `,
        labelName: "Maximum",
        attrName: "max",
        setterType: "INPUT_SETTER",
      },
      {
        id: `${widgetBaseName}-separator`,
        labelName: "Thousand separator",
        attrName: "openThousandSeparator",
        useCustomLabel: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
      },
    ],
  },
  {
    id: `${widgetBaseName}-label`,
    groupName: "LABEL",
    children: [
      {
        id: `${widgetBaseName}-label-label`,
        labelName: "Label",
        attrName: "label",
        setterType: "INPUT_SETTER",
      },
      {
        id: `${widgetBaseName}-label-caption`,
        labelName: "Caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
      },
      {
        id: `${widgetBaseName}-label-position`,
        labelName: "Position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: `${widgetBaseName}-label-alignment`,
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
        id: `${widgetBaseName}-label-width`,
        labelName: "Width(%)",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: `${widgetBaseName}-interaction`,
    groupName: "INTERACTION",
    children: [
      {
        id: `${widgetBaseName}-interaction-disabled`,
        labelName: "Disabled",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "false",
        defaultValue: false,
      },
      {
        id: `${widgetBaseName}-interaction-readonly`,
        labelName: "Readonly",
        attrName: "readOnly",
        setterType: "INPUT_SETTER",
        placeholder: "false",
        defaultValue: false,
      },
    ],
  },
  {
    id: `${widgetBaseName}-adornments`,
    groupName: "ADORNMENTS",
    children: [
      {
        id: `${widgetBaseName}-adornments-tooltip`,
        labelName: "Tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
      {
        id: `${widgetBaseName}-adornments-loading`,
        labelName: "Loading",
        attrName: "loading",
        setterType: "INPUT_SETTER",
      },
      {
        id: `${widgetBaseName}-adornments-prefix`,
        labelName: "Prefix text",
        attrName: "prefix",
        setterType: "INPUT_SETTER",
      },
      {
        id: `${widgetBaseName}-adornments-suffix`,
        labelName: "Suffix text",
        attrName: "suffix",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: `${widgetBaseName}-validation`,
    groupName: "VALIDATION",
    children: [
      {
        id: `${widgetBaseName}-validation-required`,
        labelName: "Required field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "required",
      },
      {
        id: `${widgetBaseName}-validation-custom`,
        labelName: "Custom rule",
        setterType: "INPUT_SETTER",
        attrName: "customRule",
      },
      {
        id: `${widgetBaseName}-validation-hide-message`,
        labelName: "Hide validation message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: `${widgetBaseName}-layout`,
    groupName: "LAYOUT",
    children: [
      {
        id: `${widgetBaseName}-layout-hidden`,
        labelName: "Hidden",
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        placeholder: "false",
      },
    ],
  },
]
