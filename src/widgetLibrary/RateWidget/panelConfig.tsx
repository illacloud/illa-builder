import { HorizontalEndIcon, HorizontalStartIcon } from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { HeartIcon, StarIcon } from "@illa-design/icon"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const RATE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "rate-basic",
    groupName: "editor.inspect.setter_group.basic",
    children: [
      {
        id: "rate-basic-DefaultValue",
        labelName: "editor.inspect.setter_label.default_value",
        attrName: "defaultValue",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: "rate-basic-icon",
        labelName: "editor.inspect.setter_label.icon",
        attrName: "icon",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: (
              <HeartIcon
                css={{ color: globalColor(`--${illaPrefix}-red-03`) }}
              />
            ),
            value: "heart",
          },
          {
            label: (
              <StarIcon
                css={{ color: globalColor(`--${illaPrefix}-yellow-04`) }}
              />
            ),
            value: "star",
          },
        ],
      },
      {
        id: "rate-basic-max-rate",
        labelName: "editor.inspect.setter_label.max_count",
        attrName: "maxCount",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: "rate-basic-allow-half",
        labelName: "editor.inspect.setter_label.allow_half",
        attrName: "allowHalf",
        setterType: "SWITCH_SETTER",
      },
      {
        id: "rate-basic-allow-clear",
        labelName: "editor.inspect.setter_label.allow_clear",
        attrName: "allowClear",
        setterType: "SWITCH_SETTER",
      },
    ],
  },
  {
    id: "rate-label",
    groupName: "editor.inspect.setter_group.label",
    children: [
      {
        id: "rate-label-label",
        labelName: "editor.inspect.setter_label.label",
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "rate-label-caption",
        labelName: "editor.inspect.setter_label.caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "rate-label-position",
        labelName: "editor.inspect.setter_label.label_position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: "rate-label-alignment",
        labelName: "editor.inspect.setter_label.label_alignment",
        attrName: "labelAlign",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: <HorizontalStartIcon />,
            value: "left",
          },
          {
            label: <HorizontalEndIcon />,
            value: "right",
          },
        ],
      },
      {
        id: "select-label-labelWidth",
        labelName: "editor.inspect.setter_label.label_width",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
    ],
  },
  {
    id: "rate-interaction",
    groupName: "editor.inspect.setter_group.interaction",
    children: [
      // eventHandle @aoao
      {
        id: "rate-interaction-disabled",
        labelName: "editor.inspect.setter_label.disabled",
        labelDesc: "xxxxx",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: "rate-interaction-readonly",
        labelName: "editor.inspect.setter_label.read_only",
        labelDesc: "xxxxx",
        attrName: "readonly",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "rate-adornments",
    groupName: "editor.inspect.setter_group.adornments",
    children: [
      {
        id: "rate-adornments-tooltip",
        labelName: "editor.inspect.setter_label.tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "rate-validation",
    groupName: "editor.inspect.setter_group.validation",
    children: [
      {
        id: "rate-validation-required",
        labelName: "editor.inspect.setter_label.required_field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "required",
      },
      {
        id: "rate-validation-custom",
        labelName: "editor.inspect.setter_label.custom_rule",
        setterType: "INPUT_SETTER",
        attrName: "customRule",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "rate-validation-hide-message",
        labelName: "editor.inspect.setter_label.hide_validation_message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "rate-layout",
    groupName: "editor.inspect.setter_group.layout",
    children: [
      {
        id: "rate-layout-hidden",
        setterType: "DYNAMIC_SWITCH_SETTER",
        labelName: "editor.inspect.setter_label.hidden",
        useCustomLayout: true,
        attrName: "hidden",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
]
