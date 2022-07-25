import { HorizontalStartIcon, HorizontalEndIcon } from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import i18n from "@/i18n/config"

export const RADIO_GROUP_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "radioGroup-options",
    groupName: i18n.t("editor.inspect.setter_group.options"),
    children: [
      {
        id: "radioGroup-options-mode",
        attrName: "optionConfigureMode",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: i18n.t("widget.public.select_options.manual"),
            value: "static",
          },
          {
            label: i18n.t("widget.public.select_options.mapped"),
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
            labelName: i18n.t("editor.inspect.setter_label.label"),
            attrName: "label",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: "radioGroup-options-value",
            labelName: i18n.t("editor.inspect.setter_label.value"),
            attrName: "value",
            setterType: "INPUT_SETTER",
          },
          {
            id: "radioGroup-options-disabled",
            labelName: i18n.t("editor.inspect.setter_label.disabled"),
            attrName: "disabled",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
          },
        ],
      },
      {
        id: "radioGroup-option-data-sources",
        labelName: i18n.t("editor.inspect.setter_label.data_sources"),
        attrName: "dataSources",
        setterType: "INPUT_SETTER",
        bindAttrName: "optionConfigureMode",
        expectedType: VALIDATION_TYPES.ARRAY,
        shown: (value) => value === "dynamic",
        isSetterSingleRow: true,
      },
      {
        id: `radioGroup-options-mapped`,
        labelName: i18n.t("editor.inspect.setter_label.mapped_option"),
        useCustomLayout: true,
        attrName: "mappedOption",
        setterType: "OPTION_MAPPED_SETTER",
        bindAttrName: "optionConfigureMode",
        shown: (value) => value === "dynamic",
        childrenSetter: [
          {
            id: `radioGroup-mappedOption-labels`,
            labelName: i18n.t("editor.inspect.setter_label.label"),
            attrName: "labels",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            placeholder: "{{item}}",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `radioGroup-mappedOption-values`,
            labelName: i18n.t("editor.inspect.setter_label.value"),
            attrName: "values",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            placeholder: "{{item}}",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `radioGroup-mappedOption-disables`,
            labelName: i18n.t("editor.inspect.setter_label.disabled"),
            attrName: "disables",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            placeholder: "{{false}}",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
        ],
      },
      {
        id: "radioGroup-basic-defaultValue",
        labelName: i18n.t("editor.inspect.setter_label.default_value"),
        labelDesc: i18n.t(
          "editor.inspect.setter_tooltip.component_default_value",
        ),
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "radioGroup-label",
    groupName: i18n.t("editor.inspect.setter_group.label"),
    children: [
      {
        id: "radioGroup-label-label",
        labelName: i18n.t("editor.inspect.setter_label.label"),
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "radioGroup-label-caption",
        labelName: i18n.t("editor.inspect.setter_label.caption"),
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "select-label-hidden",
        labelName: i18n.t("editor.inspect.setter_label.hidden_label"),
        attrName: "labelHidden",
        setterType: "SWITCH_SETTER",
      },
      {
        id: "radioGroup-label-position",
        labelName: i18n.t("editor.inspect.setter_label.label_position"),
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        bindAttrName: "labelHidden",
        shown: (value) => !value,
        options: [
          { label: i18n.t("widget.public.left"), value: "left" },
          { label: i18n.t("widget.public.right"), value: "top" },
        ],
      },
      {
        id: "radioGroup-label-alignment",
        labelName: i18n.t("editor.inspect.setter_label.label_alignment"),
        attrName: "labelAlign",
        setterType: "RADIO_GROUP_SETTER",
        bindAttrName: "labelHidden",
        shown: (value) => !value,
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
        labelName: i18n.t("editor.inspect.setter_label.label_width"),
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
        bindAttrName: "labelHidden",
        shown: (value) => !value,
      },
    ],
  },
  {
    id: "radioGroup-interaction",
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        id: "radioGroup-interaction-disabled",
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.disabled"),
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "radioGroup-Adornments",
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: "radioGroup-adornments-tooltip",
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "radioGroup-layout",
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: "radioGroup-layout-hidden",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "hidden",
        placeholder: "false",
        useCustomLayout: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: "radioGroup-style-direction",
        labelName: i18n.t("editor.inspect.setter_label.group_layout"),
        setterType: "RADIO_GROUP_SETTER",
        attrName: "direction",
        options: [
          {
            label: "horizontal",
            value: "horizontal",
          },
          {
            label: "vertical",
            value: "vertical",
          },
        ],
      },
    ],
  },
  {
    id: `radioGroup-styles`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: "radioGroup-style",
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "radioGroup-style-color",
            labelName: i18n.t("editor.inspect.setter_label.theme_color"),
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
