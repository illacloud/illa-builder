import { HorizontalStartIcon, HorizontalEndIcon } from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const widgetBaseName = "number-input"

export const NUMBER_INPUT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${widgetBaseName}-BASIC`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${widgetBaseName}-basic-default-value`,
        labelName: i18n.t("editor.inspect.setter_label.default_value"),
        attrName: "value",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${widgetBaseName}-basic-placeholder`,
        labelName: i18n.t("editor.inspect.setter_label.placeholder"),
        attrName: "placeholder",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${widgetBaseName}-basic-decimal-place`,
        labelName: i18n.t("editor.inspect.setter_label.decimal_place"),
        labelDesc: "xxxx",
        attrName: "precision",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${widgetBaseName}-basic-minimum`,
        labelName: i18n.t("editor.inspect.setter_label.minimum"),
        attrName: "min",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${widgetBaseName}-basic-maximum  `,
        labelName: i18n.t("editor.inspect.setter_label.maximum"),
        attrName: "max",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${widgetBaseName}-separator`,
        labelName: i18n.t("editor.inspect.setter_label.thousand_separator"),
        attrName: "openThousandSeparator",
        useCustomLayout: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `${widgetBaseName}-label`,
    groupName: i18n.t("editor.inspect.setter_group.label"),
    children: [
      {
        id: `${widgetBaseName}-label-label`,
        labelName: i18n.t("editor.inspect.setter_label.label"),
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${widgetBaseName}-label-caption`,
        labelName: i18n.t("editor.inspect.setter_label.caption"),
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${widgetBaseName}-label-position`,
        labelName: i18n.t("editor.inspect.setter_label.label_position"),
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: `${widgetBaseName}-label-alignment`,
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
        id: `${widgetBaseName}-label-width`,
        labelName: i18n.t("editor.inspect.setter_label.label_width"),
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
    ],
  },
  {
    id: `${widgetBaseName}-interaction`,
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        id: `${widgetBaseName}-interaction-disabled`,
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${widgetBaseName}-interaction-readonly`,
        labelName: i18n.t("editor.inspect.setter_label.read_only"),
        attrName: "readOnly",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `${widgetBaseName}-adornments`,
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: `${widgetBaseName}-adornments-tooltip`,
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${widgetBaseName}-adornments-loading`,
        labelName: i18n.t("editor.inspect.setter_label.loading"),
        attrName: "loading",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${widgetBaseName}-adornments-prefix`,
        labelName: i18n.t("editor.inspect.setter_label.prefix_text"),
        attrName: "prefix",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${widgetBaseName}-adornments-suffix`,
        labelName: i18n.t("editor.inspect.setter_label.suffix_text"),
        attrName: "suffix",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: `${widgetBaseName}-validation`,
    groupName: i18n.t("editor.inspect.setter_group.validation"),
    children: [
      {
        id: `${widgetBaseName}-validation-required`,
        labelName: i18n.t("editor.inspect.setter_label.required_field"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        attrName: "required",
      },
      {
        id: `${widgetBaseName}-validation-custom`,
        labelName: i18n.t("editor.inspect.setter_label.custom_rule"),
        setterType: "INPUT_SETTER",
        attrName: "customRule",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${widgetBaseName}-validation-hide-message`,
        labelName: i18n.t(
          "editor.inspect.setter_label.hide_validation_message",
        ),
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: `${widgetBaseName}-layout`,
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: `${widgetBaseName}-layout-hidden`,
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        placeholder: "false",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `${widgetBaseName}-styles`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: `${widgetBaseName}-styles-styles`,
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.styles"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${widgetBaseName}-styles-color`,
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
