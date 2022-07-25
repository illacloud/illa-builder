import { HorizontalStartIcon, HorizontalEndIcon } from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import i18n from "@/i18n/config"

export const INPUT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "input-basic",
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: "input-basic-defaultValue",
        labelName: i18n.t("editor.inspect.setter_label.default_value"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.input_default_value"),
        attrName: "value",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: "input-basic-placeholder",
        labelName: i18n.t("editor.inspect.setter_label.placeholder"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.placeholder"),
        attrName: "placeholder",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "input-label",
    groupName: i18n.t("editor.inspect.setter_group.label"),
    children: [
      {
        id: "input-label-label",
        labelName: i18n.t("editor.inspect.setter_label.label"),
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "input-label-caption",
        labelName: i18n.t("editor.inspect.setter_label.caption"),
        attrName: "labelCaption",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: "select-label-hidden",
        labelName: i18n.t("editor.inspect.setter_label.hidden_label"),
        attrName: "labelHidden",
        setterType: "SWITCH_SETTER",
      },
      {
        id: "input-label-position",
        labelName: i18n.t("editor.inspect.setter_label.label_position"),
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        bindAttrName: "labelHidden",
        shown: (value) => !value,
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: "input-label-alignment",
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
        id: "select-label-labelWidth",
        labelName: i18n.t("editor.inspect.setter_label.label_width"),
        attrName: "labelWidth",
        expectedType: VALIDATION_TYPES.NUMBER,
        setterType: "INPUT_SETTER",
        bindAttrName: "labelHidden",
        shown: (value) => !value,
      },
    ],
  },
  {
    id: "input-interaction",
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        id: "input-interaction-disabled",
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.disabled"),
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        placeholder: "{{false}}",
      },
      {
        id: "input-interaction-readonly",
        labelName: i18n.t("editor.inspect.setter_label.read_only"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.read_only"),
        attrName: "readOnly",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "input-Adornments",
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: "input-adornments-showClear",
        labelName: i18n.t("editor.inspect.setter_label.show_clear_button"),
        attrName: "allowClear",
        useCustomLayout: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: "input-adornments-showChartCount",
        labelName: i18n.t("editor.inspect.setter_label.show_character_count"),
        attrName: "showCharacterCount",
        useCustomLayout: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: "input-adornments-prefixText",
        labelName: i18n.t("editor.inspect.setter_label.prefix_text"),
        attrName: "prefixText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "input-adornments-suffixText",
        labelName: i18n.t("editor.inspect.setter_label.suffix_text"),
        attrName: "suffixText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "input-adornments-tooltip",
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "input-validation",
    groupName: i18n.t("editor.inspect.setter_group.validation"),
    children: [
      {
        id: "input-validation-required",
        labelName: i18n.t("editor.inspect.setter_label.required_field"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.required_field"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "required",
      },
      {
        id: "input-validation-pattern",
        labelName: i18n.t("editor.inspect.setter_label.pattern"),
        setterType: "SEARCH_SELECT_SETTER",
        attrName: "pattern",
        options: ["Email", "URL", "Regex"],
      },
      {
        id: "input-validation-regex",
        labelName: i18n.t("editor.inspect.setter_label.regex"),
        setterType: "INPUT_SETTER",
        attrName: "regex",
        bindAttrName: "pattern",
        expectedType: VALIDATION_TYPES.STRING,
        shown: (value) => value === "Regex",
      },
      {
        id: "input-validation-max",
        labelName: i18n.t("editor.inspect.setter_label.max_length"),
        setterType: "INPUT_SETTER",
        attrName: "maxLength",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: "input-validation-min",
        labelName: i18n.t("editor.inspect.setter_label.min_length"),
        setterType: "INPUT_SETTER",
        attrName: "minLength",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: "input-validation-custom",
        labelName: i18n.t("editor.inspect.setter_label.custom_rule"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.custom_rule"),
        setterType: "INPUT_SETTER",
        attrName: "customRule",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "input-validation-hide-message",
        labelName: i18n.t(
          "editor.inspect.setter_label.hide_validation_message",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tooltip.hide_validation_message",
        ),
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "input-layout",
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: "input-layout-hidden",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "hidden",
        placeholder: "false",
        useCustomLayout: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `input-styles`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: "input-style",
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "input-style-color",
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
