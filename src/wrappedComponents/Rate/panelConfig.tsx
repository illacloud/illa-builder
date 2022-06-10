import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { HorizontalEnd, HorizontalStart } from "@/wrappedComponents/svg"
import { HeartIcon, StarIcon } from "@illa-design/icon"
import { globalColor, illaPrefix } from "@illa-design/theme"

const OptionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const RATE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "rate-basic",
    groupName: "BASIC",
    children: [
      {
        id: "rate-basic-DefaultValue",
        labelName: "Default value",
        attrName: "defaultValue",
        setterType: "INPUT_SETTER",
      },
      {
        id: "rate-basic-icon",
        labelName: "Icon",
        attrName: "heart",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: (
              <HeartIcon
                css={{ color: globalColor(`--${illaPrefix}-red-03`) }}
              />
            ),
            value: true,
          },
          {
            label: (
              <StarIcon
                css={{ color: globalColor(`--${illaPrefix}-yellow-04`) }}
              />
            ),
            value: false,
          },
        ],
      },
      {
        id: "rate-basic-max-rate",
        labelName: "Max count",
        attrName: "maxCount",
        setterType: "INPUT_SETTER",
      },
      {
        id: "rate-basic-allow-half",
        labelName: "Allow Half",
        attrName: "allowHalf",
        setterType: "SWITCH_SETTER",
      },
      {
        id: "rate-basic-allow-clear",
        labelName: "Allow Clear",
        attrName: "allowClear",
        setterType: "SWITCH_SETTER",
      },
    ],
  },
  {
    id: "rate-label",
    groupName: "LABEL",
    children: [
      {
        id: "rate-label-label",
        labelName: "Label",
        attrName: "label",
        setterType: "INPUT_SETTER",
      },
      {
        id: "rate-label-caption",
        labelName: "Caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
      },
      {
        id: "rate-label-position",
        labelName: "Position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: "rate-label-alignment",
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
    id: "rate-interaction",
    groupName: "INTERACTION",
    children: [
      // eventHandle @aoao
      {
        id: "rate-interaction-disabled",
        labelName: "Disabled",
        labelDesc: "xxxxx",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
      },
      {
        id: "rate-interaction-readonly",
        labelName: "Read only",
        labelDesc: "xxxxx",
        attrName: "readonly",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "rate-adornments",
    groupName: "ADORNMENTS",
    children: [
      {
        id: "rate-adornments-tooltip",
        labelName: "Tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "rate-validation",
    groupName: "VALIDATION",
    children: [
      {
        id: "rate-validation-required",
        labelName: "Required field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "required",
      },
      {
        id: "rate-validation-custom",
        labelName: "Custom rule",
        setterType: "INPUT_SETTER",
        attrName: "customRule",
      },
      {
        id: "rate-validation-hide-message",
        labelName: "Hide validation message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "rate-layout",
    groupName: "LAYOUT",
    children: [
      {
        id: "rate-layout-hidden",
        setterType: "INPUT_SETTER",
        labelName: "Hidden",
        attrName: "hidden",
      },
    ],
  },
]
