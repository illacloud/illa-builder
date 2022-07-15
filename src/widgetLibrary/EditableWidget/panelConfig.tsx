import { HorizontalStartIcon, HorizontalEndIcon } from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"

import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const EDITABLE_TEXT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "editable-text-basic",
    groupName: "editor.inspect.setter_group.basic",
    children: [
      {
        id: "editable-text-basic-defaultValue",
        labelName: "editor.inspect.setter_label.default_value",
        labelDesc: "editor.inspect.setter_tooltip.default_value",
        attrName: "value",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: "editable-text-basic-placeholder",
        labelName: "editor.inspect.setter_label.placeholder",
        labelDesc: "editor.inspect.setter_tooltip.placeholder",
        attrName: "placeholder",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "editable-text-label",
    groupName: "editor.inspect.setter_group.label",
    children: [
      {
        id: "editable-text-label-label",
        labelName: "editor.inspect.setter_label.label",
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "editable-text-label-caption",
        labelName: "editor.inspect.setter_label.caption",
        attrName: "labelCaption",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: "editable-text-label-position",
        labelName: "editor.inspect.setter_label.label_position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: "editable-text-label-alignment",
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
        expectedType: VALIDATION_TYPES.NUMBER,
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "editable-text-interaction",
    groupName: "editor.inspect.setter_group.interaction",
    children: [
      {
        id: "editable-text-interaction-disabled",
        labelName: "editor.inspect.setter_label.disabled",
        labelDesc: "editor.inspect.setter_tooltip.disabled",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        placeholder: "{{false}}",
      },
      {
        id: "editable-text-interaction-readonly",
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
    id: "editable-text-Adornments",
    groupName: "editor.inspect.setter_group.adornments",
    children: [
      {
        id: "editable-text-adornments-showClear",
        labelName: "editor.inspect.setter_label.show_clear_button",
        attrName: "allowClear",
        useCustomLayout: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: "editable-text-adornments-showChartCount",
        labelName: "editor.inspect.setter_label.show_character_count",
        attrName: "showCharacterCount",
        useCustomLayout: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: "editable-text-adornments-prefixText",
        labelName: "editor.inspect.setter_label.prefix_text",
        attrName: "prefixText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "editable-text-adornments-suffixText",
        labelName: "editor.inspect.setter_label.suffix_text",
        attrName: "suffixText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "editable-text-adornments-tooltip",
        labelName: "editor.inspect.setter_label.tooltip",
        labelDesc: "editor.inspect.setter_tooltip.tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "editable-text-validation",
    groupName: "editor.inspect.setter_group.validation",
    children: [
      {
        id: "editable-text-validation-required",
        labelName: "editor.inspect.setter_label.required_field",
        labelDesc: "editor.inspect.setter_tooltip.required_field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "required",
      },
      {
        id: "editable-text-validation-pattern",
        labelName: "editor.inspect.setter_label.pattern",
        setterType: "SEARCH_SELECT_SETTER",
        attrName: "pattern",
        options: ["Email", "URL", "Regex"],
      },
      {
        id: "editable-text-validation-regex",
        labelName: "editor.inspect.setter_label.regex",
        setterType: "INPUT_SETTER",
        attrName: "regex",
        bindAttrName: "pattern",
        expectedType: VALIDATION_TYPES.STRING,
        shown: (value) => value === "Regex",
      },
      {
        id: "editable-text-validation-max",
        labelName: "editor.inspect.setter_label.max_length",
        setterType: "INPUT_SETTER",
        attrName: "maxLength",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: "editable-text-validation-min",
        labelName: "editor.inspect.setter_label.min_length",
        setterType: "INPUT_SETTER",
        attrName: "minLength",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: "editable-text-validation-custom",
        labelName: "editor.inspect.setter_label.custom_rule",
        labelDesc: "editor.inspect.setter_tooltip.custom_rule",
        setterType: "INPUT_SETTER",
        attrName: "customRule",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "editable-text-validation-hide-message",
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
    id: "editable-text-layout",
    groupName: "editor.inspect.setter_group.layout",
    children: [
      {
        id: "editable-text-layout-hidden",
        labelName: "editor.inspect.setter_label.hidden",
        labelDesc: "editor.inspect.setter_tooltip.hidden",
        labelDescOption: { name: "editableTextName" },
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "hidden",
        placeholder: "false",
        useCustomLayout: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `editable-text-styles`,
    groupName: "editor.inspect.setter_group.style",
    children: [
      {
        id: "editable-text-style",
        setterType: "LIST_SETTER",
        labelName: "editor.inspect.setter_label.styles",
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "editable-text-style-color",
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
