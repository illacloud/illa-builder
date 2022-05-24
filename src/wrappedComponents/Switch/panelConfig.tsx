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

export const SWITCH_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "switch-basic",
    groupName: "Basic",
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
    groupName: "Label",
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
          { label: <div style={OptionsStyle}>Left</div>, value: "left" },
          { label: <div style={OptionsStyle}>Right</div>, value: "right" },
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
    id: "switch-interaction",
    groupName: "Interaction",
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
    groupName: "Adornments",
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
    groupName: "Validation",
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
    groupName: "Layout",
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
    groupName: "Style",
    children: [
      {
        id: "switch-style-radius",
        labelName: "Background",
        attrName: "checkedBackgroundColor",
        setterType: "INPUT_SETTER",
      },
    ],
  },
]
