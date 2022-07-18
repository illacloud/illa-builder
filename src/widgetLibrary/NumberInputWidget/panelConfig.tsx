import { HorizontalStartIcon, HorizontalEndIcon } from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"

import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const widgetBaseName = "number-input"

export const NUMBER_INPUT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${widgetBaseName}-BASIC`,
    groupName: "editor.inspect.setter_group.basic",
    children: [
      {
        id: `${widgetBaseName}-basic-default-value`,
        labelName: "editor.inspect.setter_label.default_value",
        labelDesc: "editor.inspect.setter_tooltip.input_default_value",
        attrName: "value",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${widgetBaseName}-basic-placeholder`,
        labelName: "editor.inspect.setter_label.placeholder",
        labelDesc: "editor.inspect.setter_tooltip.placeholder",
        attrName: "placeholder",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${widgetBaseName}-basic-decimal-place`,
        labelName: "editor.inspect.setter_label.decimal_place",
        attrName: "precision",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${widgetBaseName}-basic-minimum`,
        labelName: "editor.inspect.setter_label.minimum",
        attrName: "min",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${widgetBaseName}-basic-maximum  `,
        labelName: "editor.inspect.setter_label.maximum",
        attrName: "max",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${widgetBaseName}-separator`,
        labelName: "editor.inspect.setter_label.thousand_separator",
        attrName: "openThousandSeparator",
        useCustomLayout: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `${widgetBaseName}-label`,
    groupName: "editor.inspect.setter_group.label",
    children: [
      {
        id: `${widgetBaseName}-label-label`,
        labelName: "editor.inspect.setter_label.label",
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${widgetBaseName}-label-caption`,
        labelName: "editor.inspect.setter_label.caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${widgetBaseName}-label-position`,
        labelName: "editor.inspect.setter_label.label_position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: `${widgetBaseName}-label-alignment`,
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
        id: `${widgetBaseName}-label-width`,
        labelName: "editor.inspect.setter_label.label_width",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
    ],
  },
  {
    id: `${widgetBaseName}-interaction`,
    groupName: "editor.inspect.setter_group.interaction",
    children: [
      {
        id: `${widgetBaseName}-interaction-disabled`,
        labelName: "editor.inspect.setter_label.disabled",
        labelDesc: "editor.inspect.setter_tooltip.disabled",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${widgetBaseName}-interaction-readonly`,
        labelName: "editor.inspect.setter_label.read_only",
        labelDesc: "editor.inspect.setter_tooltip.read_only",
        attrName: "readOnly",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `${widgetBaseName}-adornments`,
    groupName: "editor.inspect.setter_group.adornments",
    children: [
      {
        id: `${widgetBaseName}-adornments-tooltip`,
        labelName: "editor.inspect.setter_label.tooltip",
        labelDesc: "editor.inspect.setter_tooltip.tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${widgetBaseName}-adornments-loading`,
        labelName: "editor.inspect.setter_label.loading",
        labelDesc: "editor.inspect.setter_tooltip.loading",
        attrName: "loading",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${widgetBaseName}-adornments-prefix`,
        labelName: "editor.inspect.setter_label.prefix_text",
        attrName: "prefix",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${widgetBaseName}-adornments-suffix`,
        labelName: "editor.inspect.setter_label.suffix_text",
        attrName: "suffix",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: `${widgetBaseName}-validation`,
    groupName: "editor.inspect.setter_group.validation",
    children: [
      {
        id: `${widgetBaseName}-validation-required`,
        labelName: "editor.inspect.setter_label.required_field",
        labelDesc: "editor.inspect.setter_tooltip.required_field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "required",
      },
      {
        id: `${widgetBaseName}-validation-custom`,
        labelName: "editor.inspect.setter_label.custom_rule",
        labelDesc: "editor.inspect.setter_tooltip.custom_rule",
        setterType: "INPUT_SETTER",
        attrName: "customRule",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${widgetBaseName}-validation-hide-message`,
        labelName: "editor.inspect.setter_label.hide_validation_message",
        labelDesc: "editor.inspect.setter_tooltip.hide_validation_message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: `${widgetBaseName}-layout`,
    groupName: "editor.inspect.setter_group.layout",
    children: [
      {
        id: `${widgetBaseName}-layout-hidden`,
        labelName: "editor.inspect.setter_label.hidden",
        labelDesc: "editor.inspect.setter_tooltip.hidden",
        labelDescOption: { name: "numberInputName" },
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "hidden",
        placeholder: "false",
        useCustomLayout: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `${widgetBaseName}-styles`,
    groupName: "editor.inspect.setter_group.style",
    children: [
      {
        id: `${widgetBaseName}-styles-styles`,
        setterType: "LIST_SETTER",
        labelName: "editor.inspect.setter_label.styles",
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${widgetBaseName}-styles-color`,
            labelName: "editor.inspect.setter_label.theme_color",
            attrName: "colorScheme",
            setterType: "COLOR_PICKER_SETTER",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
        ],
      },
    ],
  },
]
