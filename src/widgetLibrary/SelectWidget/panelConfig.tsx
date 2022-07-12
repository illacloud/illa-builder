import { HorizontalStartIcon, HorizontalEndIcon } from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"

import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const SELECT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "select-options",
    groupName: "editor.inspect.setter_group.options",
    children: [
      {
        id: "select-options-mode",
        attrName: "optionConfigureMode",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: "Manual",
            value: "static",
          },
          {
            label: "Mapped",
            value: "dynamic",
          },
        ],
      },
      {
        id: "select-basic-options",
        useCustomLayout: true,
        attrName: "manualOptions",
        setterType: "OPTION_LIST_SETTER",
        bindAttrName: "optionConfigureMode",
        shown: (value) => !value || value === "static",
        childrenSetter: [
          {
            id: "select-options-label",
            labelName: "Label",
            attrName: "label",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: "select-options-value",
            labelName: "Value",
            attrName: "value",
            setterType: "INPUT_SETTER",
          },
          {
            id: "select-options-disabled",
            labelName: "Disabled",
            attrName: "disabled",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
          },
        ],
      },
      {
        id: "select-option-data-sources",
        labelName: "editor.inspect.setter_label.data_sources",
        attrName: "dataSources",
        setterType: "INPUT_SETTER",
        bindAttrName: "optionConfigureMode",
        expectedType: VALIDATION_TYPES.ARRAY,
        shown: (value) => value === "dynamic",
        isSetterSingleRow: true,
      },
      {
        id: "select-option-mapped",
        labelName: "editor.inspect.setter_label.mapped_option",
        useCustomLayout: true,
        attrName: "mappedOption",
        setterType: "OPTION_MAPPED_SETTER",
        bindAttrName: "optionConfigureMode",
        shown: (value) => value === "dynamic",
        childrenSetter: [
          {
            id: `select-mappedOption-labels`,
            labelName: "editor.inspect.setter_label.label",
            attrName: "labels",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `select-mappedOption-values`,
            labelName: "editor.inspect.setter_label.value",
            attrName: "values",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `select-mappedOption-disables`,
            labelName: "editor.inspect.setter_label.disabled",
            attrName: "disables",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
        ],
      },
      {
        id: "select-basic-defaultValue",
        labelName: "editor.inspect.setter_label.default_value",
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
      {
        id: "select-basic-placeholder",
        labelName: "editor.inspect.setter_label.placeholder",
        attrName: "placeholder",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "select-label",
    groupName: "editor.inspect.setter_group.label",
    children: [
      {
        id: "select-label-label",
        labelName: "editor.inspect.setter_label.label",
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "select-label-caption",
        labelName: "editor.inspect.setter_label.caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "select-label-position",
        labelName: "editor.inspect.setter_label.label_position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      },
      {
        id: "select-label-alignment",
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
    id: "select-validation",
    groupName: "editor.inspect.setter_group.validation",
    children: [
      {
        id: "select-validation-required",
        labelName: "editor.inspect.setter_label.required_field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "required",
      },
      {
        id: "select-validation-hide-message",
        labelName: "editor.inspect.setter_label.hide_validation_message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "select-interaction",
    groupName: "editor.inspect.setter_group.interaction",
    children: [
      {
        id: "select-interaction-disabled",
        labelName: "editor.inspect.setter_label.disabled",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: "select-interaction-readonly",
        labelName: "editor.inspect.setter_label.read_only",
        attrName: "readOnly",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "select-Adornments",
    groupName: "editor.inspect.setter_group.adornments",
    children: [
      {
        id: "select-adornments-showClear",
        labelName: "editor.inspect.setter_label.show_clear_button",
        attrName: "showClear",
        useCustomLayout: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: "select-adornments-prefixText",
        labelName: "editor.inspect.setter_label.prefix_text",
        attrName: "prefixText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "select-adornments-suffixText",
        labelName: "editor.inspect.setter_label.suffix_text",
        attrName: "suffixText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "select-adornments-tooltip",
        labelName: "editor.inspect.setter_label.tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "select-layout",
    groupName: "editor.inspect.setter_group.layout",
    children: [
      {
        id: "select-layout-hidden",
        labelName: "editor.inspect.setter_label.hidden",
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        placeholder: "false",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `select-style`,
    groupName: "editor.inspect.setter_group.style",
    children: [
      {
        id: `select-style-styles`,
        setterType: "LIST_SETTER",
        labelName: "editor.inspect.setter_label.styles",
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `select-style-color`,
            labelName: "editor.inspect.setter_label.theme_color",
            attrName: "colorScheme",
            setterType: "COLOR_SELECT_SETTER",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
        ],
      },
    ],
  },
]
