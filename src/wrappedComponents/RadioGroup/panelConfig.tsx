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

export const RADIO_GROUP_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "radioGroup-options",
    groupName: "Options",
    children: [
      {
        id: "radioGroup-basic-defaultValue",
        labelName: "Default Value",
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "radioGroup-label",
    groupName: "Label",
    children: [
      {
        id: "radioGroup-label-label",
        labelName: "Label",
        attrName: "label",
        setterType: "INPUT_SETTER",
      },
      {
        id: "radioGroup-label-caption",
        labelName: "Caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
      },
      {
        id: "radioGroup-label-position",
        labelName: "Position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: <div style={OptionsStyle}>Left</div>, value: "left" },
          { label: <div style={OptionsStyle}>Top</div>, value: "top" },
        ],
      },
      {
        id: "radioGroup-label-alignment",
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
    id: "radioGroup-validation",
    groupName: "Validation",
    children: [
      {
        id: "radioGroup-validation-required",
        labelName: "Required field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "required",
      },
      {
        id: "radioGroup-validation-hide-message",
        labelName: "Hide validation message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "radioGroup-interaction",
    groupName: "Interaction",
    children: [
      {
        id: "radioGroup-interaction-disabled",
        labelName: "Disabled",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "false",
        defaultValue: false,
      },
    ],
  },
  {
    id: "radioGroup-Adornments",
    groupName: "Adornments",
    children: [
      {
        id: "radioGroup-adornments-tooltip",
        labelName: "Tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "radioGroup-layout",
    groupName: "Layout",
    children: [
      {
        id: "radioGroup-layout-hidden",
        labelName: "Hidden",
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        placeholder: "false",
      },
    ],
  },
  {
    id: "radioGroup-style",
    groupName: "Style",
    children: [
      {
        id: "radioGroup-style-color",
        labelName: "Color",
        setterType: "INPUT_SETTER",
        attrName: "checkedBackgroundColor",
      },
      {
        id: "radioGroup-style-direction",
        labelName: "Direction",
        setterType: "RADIO_GROUP_SETTER",
        attrName: "direction",
        options: [
          {
            label: (
              <div style={OptionsStyle}>
                <AlignmentLeftIcon />
              </div>
            ),
            value: "vertical",
          },
          {
            label: (
              <div style={OptionsStyle}>
                <AlignmentRightIcon />
              </div>
            ),
            value: "horizontal",
          },
        ],
      },
    ],
  },
]
