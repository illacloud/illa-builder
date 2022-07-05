import { HorizontalStartIcon, HorizontalEndIcon } from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const INPUT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "input-basic",
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: "input-basic-defaultValue",
        labelName: i18n.t("editor.inspect.setter_label.default_value"),
        attrName: "value",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: "input-basic-placeholder",
        labelName: i18n.t("editor.inspect.setter_label.placeholder"),
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
        id: "input-label-position",
        labelName: i18n.t("editor.inspect.setter_label.label_position"),
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
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
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        placeholder: "{{false}}",
      },
      {
        id: "input-interaction-readonly",
        labelName: i18n.t("editor.inspect.setter_label.read_only"),
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
        setterType: "INPUT_SETTER",
        attrName: "customRule",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "input-validation-hide-message",
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
    id: "input-layout",
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: "input-layout-hidden",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        placeholder: "false",
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
        labelName: i18n.t("editor.inspect.setter_label.styles"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "input-style-color",
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
