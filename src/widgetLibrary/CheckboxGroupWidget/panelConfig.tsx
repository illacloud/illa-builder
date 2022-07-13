import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { HorizontalStartIcon, HorizontalEndIcon } from "@illa-design/icon"

import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const baseWidgetName = "checkboxGroup"
export const CHECKBOX_GROUP_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-options`,
    groupName: "editor.inspect.setter_group.options",
    children: [
      {
        id: `${baseWidgetName}-options-mode`,
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
        id: `${baseWidgetName}-basic-options`,
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
        id: `${baseWidgetName}-options-data-sources`,
        labelName: "editor.inspect.setter_label.data_sources",
        attrName: "dataSources",
        setterType: "INPUT_SETTER",
        bindAttrName: "optionConfigureMode",
        expectedType: VALIDATION_TYPES.ARRAY,
        shown: (value) => value === "dynamic",
        isSetterSingleRow: true,
      },
      {
        id: `${baseWidgetName}-options-mapped`,
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
        id: `${baseWidgetName}-options-default-value`,
        labelName: "editor.inspect.setter_label.default_value",
        attrName: "value",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: `${baseWidgetName}-label`,
    groupName: "editor.inspect.setter_group.label",
    children: [
      {
        id: `${baseWidgetName}-label-label`,
        labelName: "editor.inspect.setter_label.label",
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-label-caption`,
        labelName: "editor.inspect.setter_label.caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-label-position`,
        labelName: "editor.inspect.setter_label.label_position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: `${baseWidgetName}-label-alignment`,
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
        id: `${baseWidgetName}-label-label-width`,
        labelName: "editor.inspect.setter_label.label_width",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
    ],
  },
  {
    id: `${baseWidgetName}-validation`,
    groupName: "editor.inspect.setter_group.validation",
    children: [
      {
        id: `${baseWidgetName}-validation-required`,
        labelName: "editor.inspect.setter_label.required_field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "required",
      },
      {
        id: `${baseWidgetName}-validation-hide-message`,
        labelName: "editor.inspect.setter_label.hide_validation_message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: `${baseWidgetName}-interaction`,
    groupName: "editor.inspect.setter_group.interaction",
    children: [
      {
        id: `${baseWidgetName}-interaction-disabled`,
        labelName: "editor.inspect.setter_label.disabled",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `${baseWidgetName}-adornments`,
    groupName: "editor.inspect.setter_group.adornments",
    children: [
      {
        id: `${baseWidgetName}-adornments-tooltip`,
        labelName: "editor.inspect.setter_label.tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: `${baseWidgetName}-layout`,
    groupName: "editor.inspect.setter_group.layout",
    children: [
      {
        id: `${baseWidgetName}-layout-hidden`,
        labelName: "editor.inspect.setter_label.hidden",
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "hidden",
        placeholder: "false",
        useCustomLayout: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-layout-direction`,
        labelName: "editor.inspect.setter_label.label_alignment",
        setterType: "RADIO_GROUP_SETTER",
        attrName: "direction",
        options: ["vertical", "horizontal"],
      },
    ],
  },
  {
    id: `${baseWidgetName}-styles`,
    groupName: "editor.inspect.setter_group.style",
    children: [
      {
        id: `${baseWidgetName}-style`,
        setterType: "LIST_SETTER",
        labelName: "editor.inspect.setter_label.styles",
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-coloScheme`,
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
