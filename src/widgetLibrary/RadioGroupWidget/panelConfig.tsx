import { HorizontalStartIcon, HorizontalEndIcon } from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"

import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const RADIO_GROUP_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "radioGroup-options",
    groupName: "editor.inspect.setter_group.options",
    children: [
      {
        id: "radioGroup-options-mode",
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
        id: "radioGroup-basic-options",
        useCustomLayout: true,
        attrName: "manualOptions",
        setterType: "OPTION_LIST_SETTER",
        bindAttrName: "optionConfigureMode",
        shown: (value) => !value || value === "static",
        childrenSetter: [
          {
            id: "radioGroup-options-label",
            labelName: "Label",
            attrName: "label",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: "radioGroup-options-value",
            labelName: "Value",
            attrName: "value",
            setterType: "INPUT_SETTER",
          },
          {
            id: "radioGroup-options-disabled",
            labelName: "Disabled",
            attrName: "disabled",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
          },
        ],
      },
      {
        id: "radioGroup-option-data-sources",
        labelName: "editor.inspect.setter_label.data_sources",
        attrName: "dataSources",
        setterType: "INPUT_SETTER",
        bindAttrName: "optionConfigureMode",
        expectedType: VALIDATION_TYPES.ARRAY,
        shown: (value) => value === "dynamic",
        isSetterSingleRow: true,
      },
      {
        id: `radioGroup-options-mapped`,
        labelName: "editor.inspect.setter_label.mapped_option",
        useCustomLayout: true,
        attrName: "mappedOption",
        setterType: "OPTION_MAPPED_SETTER",
        bindAttrName: "optionConfigureMode",
        shown: (value) => value === "dynamic",
        childrenSetter: [
          {
            id: `radioGroup-mappedOption-labels`,
            labelName: "editor.inspect.setter_label.label",
            attrName: "labels",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `radioGroup-mappedOption-values`,
            labelName: "editor.inspect.setter_label.value",
            attrName: "values",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `radioGroup-mappedOption-disables`,
            labelName: "editor.inspect.setter_label.disabled",
            attrName: "disables",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
        ],
      },
      {
        id: "radioGroup-basic-defaultValue",
        labelName: "editor.inspect.setter_label.default_value",
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "radioGroup-label",
    groupName: "editor.inspect.setter_group.label",
    children: [
      {
        id: "radioGroup-label-label",
        labelName: "editor.inspect.setter_label.label",
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "radioGroup-label-caption",
        labelName: "editor.inspect.setter_label.caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "radioGroup-label-position",
        labelName: "editor.inspect.setter_label.label_position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: "radioGroup-label-alignment",
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
        id: "radioGroup-label-labelWidth",
        labelName: "editor.inspect.setter_label.label_width",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
    ],
  },
  {
    id: "radioGroup-validation",
    groupName: "editor.inspect.setter_group.validation",
    children: [
      {
        id: "radioGroup-validation-required",
        labelName: "editor.inspect.setter_label.required_field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "required",
      },
      {
        id: "radioGroup-validation-hide-message",
        labelName: "editor.inspect.setter_label.hide_validation_message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "radioGroup-interaction",
    groupName: "editor.inspect.setter_group.interaction",
    children: [
      {
        id: "radioGroup-interaction-disabled",
        labelName: "editor.inspect.setter_label.disabled",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "radioGroup-Adornments",
    groupName: "editor.inspect.setter_group.adornments",
    children: [
      {
        id: "radioGroup-adornments-tooltip",
        labelName: "editor.inspect.setter_label.tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "radioGroup-layout",
    groupName: "editor.inspect.setter_group.layout",
    children: [
      {
        id: "radioGroup-layout-hidden",
        labelName: "editor.inspect.setter_label.hidden",
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        placeholder: "false",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: "radioGroup-style-direction",
        labelName: "editor.inspect.setter_label.label_alignment",
        setterType: "RADIO_GROUP_SETTER",
        attrName: "direction",
        options: ["vertical", "horizontal"],
      },
    ],
  },
  {
    id: `radioGroup-styles`,
    groupName: "editor.inspect.setter_group.style",
    children: [
      {
        id: "radioGroup-style",
        setterType: "LIST_SETTER",
        labelName: "editor.inspect.setter_label.styles",
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "radioGroup-style-color",
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
