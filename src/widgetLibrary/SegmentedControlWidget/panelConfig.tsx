import { HorizontalStartIcon, HorizontalEndIcon } from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import i18n from "@/i18n/config"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const baseWidgetName = "segmented-control"
export const SEGMENTED_CONTROL_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-options`,
    groupName: i18n.t("editor.inspect.setter_group.options"),
    children: [
      {
        id: `${baseWidgetName}-options-mode`,
        attrName: "optionMode",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: "Manual",
            value: "manual",
          },
          {
            label: "Mapped",
            value: "mapped",
          },
        ],
      },
      {
        id: `${baseWidgetName}-options-options`,
        useCustomLayout: true,
        attrName: "options",
        setterType: "OPTION_LIST_SETTER",
        bindAttrName: "optionMode",
        shown: (value) => !value || value === "manual",
      },
      {
        id: `${baseWidgetName}-options-data-sources`,
        labelName: i18n.t("editor.inspect.setter_label.data_sources"),
        attrName: "dataSources",
        setterType: "INPUT_SETTER",
        bindAttrName: "optionMode",
        expectedType: VALIDATION_TYPES.ARRAY,
        shown: (value) => value === "mapped",
        isSetterSingleRow: true,
      },
      {
        id: `${baseWidgetName}-options-mapped`,
        labelName: i18n.t("editor.inspect.setter_label.mapped_option"),
        useCustomLayout: true,
        attrName: "mappedOption",
        setterType: "OPTION_MAPPED_SETTER",
        bindAttrName: "optionMode",
        shown: (value) => value === "mapped",
      },
      {
        id: `${baseWidgetName}-options-default-value`,
        labelName: i18n.t("editor.inspect.setter_label.default_value"),
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: `${baseWidgetName}-label`,
    groupName: i18n.t("editor.inspect.setter_group.label"),
    children: [
      {
        id: `${baseWidgetName}-label-label`,
        labelName: i18n.t("editor.inspect.setter_label.label"),
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-label-caption`,
        labelName: i18n.t("editor.inspect.setter_label.caption"),
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-label-position`,
        labelName: i18n.t("editor.inspect.setter_label.label_position"),
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: `${baseWidgetName}-label-alignment`,
        labelName: i18n.t("editor.inspect.setter_label.label_alignment"),
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
        labelName: i18n.t("editor.inspect.setter_label.label_width"),
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
    ],
  },
  {
    id: `${baseWidgetName}-validation`,
    groupName: i18n.t("editor.inspect.setter_group.validation"),
    children: [
      {
        id: `${baseWidgetName}-validation-required`,
        labelName: i18n.t("editor.inspect.setter_label.required_field"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "required",
      },
      {
        id: `${baseWidgetName}-validation-hide-message`,
        labelName: i18n.t(
          "editor.inspect.setter_label.hide_validation_message",
        ),
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: `${baseWidgetName}-interaction`,
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        id: `${baseWidgetName}-interaction-disabled`,
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `${baseWidgetName}-adornments`,
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: `${baseWidgetName}-adornments-tooltip`,
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: `${baseWidgetName}-layout`,
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: `${baseWidgetName}-layout-hidden`,
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        placeholder: "false",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `${baseWidgetName}-style`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: `${baseWidgetName}-style-styles`,
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.styles"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-color`,
            labelName: i18n.t("editor.inspect.setter_label.theme_color"),
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
