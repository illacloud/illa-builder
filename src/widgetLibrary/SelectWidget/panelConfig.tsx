import { HorizontalStartIcon, HorizontalEndIcon } from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"

export const SELECT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "select-options",
    groupName: i18n.t("editor.inspect.setter_group.options"),
    children: [
      {
        id: "select-options-mode",
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
        id: "select-basic-options",
        useCustomLayout: true,
        attrName: "options",
        setterType: "OPTION_LIST_SETTER",
        bindAttrName: "optionMode",
        shown: (value) => !value || value === "manual",
      },
      {
        id: "select-option-data-sources",
        labelName: i18n.t("editor.inspect.setter_label.data_sources"),
        attrName: "dataSources",
        setterType: "INPUT_SETTER",
        bindAttrName: "optionMode",
        expectedType: "Array",
        shown: (value) => value === "mapped",
      },
      {
        id: "select-option-mapped",
        labelName: i18n.t("editor.inspect.setter_label.mapped_option"),
        useCustomLayout: true,
        attrName: "mappedOption",
        setterType: "OPTION_MAPPED_SETTER",
        bindAttrName: "optionMode",
        shown: (value) => value === "mapped",
      },
      {
        id: "select-basic-defaultValue",
        labelName: i18n.t("editor.inspect.setter_label.default_value"),
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
      {
        id: "select-basic-placeholder",
        labelName: i18n.t("editor.inspect.setter_label.placeholder"),
        attrName: "placeholder",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "select-label",
    groupName: i18n.t("editor.inspect.setter_group.label"),
    children: [
      {
        id: "select-label-label",
        labelName: i18n.t("editor.inspect.setter_label.label"),
        attrName: "label",
        setterType: "INPUT_SETTER",
      },
      {
        id: "select-label-caption",
        labelName: i18n.t("editor.inspect.setter_label.caption"),
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
      },
      {
        id: "select-label-position",
        labelName: i18n.t("editor.inspect.setter_label.label_position"),
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      },
      {
        id: "select-label-alignment",
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
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "select-validation",
    groupName: i18n.t("editor.inspect.setter_group.validation"),
    children: [
      {
        id: "select-validation-required",
        labelName: i18n.t("editor.inspect.setter_label.required_field"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        attrName: "required",
      },
      {
        id: "select-validation-hide-message",
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
    id: "select-interaction",
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        id: "select-interaction-disabled",
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
      },
      {
        id: "select-interaction-readonly",
        labelName: i18n.t("editor.inspect.setter_label.read_only"),
        attrName: "readOnly",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
      },
    ],
  },
  {
    id: "select-Adornments",
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: "select-adornments-showClear",
        labelName: i18n.t("editor.inspect.setter_label.show_clear_button"),
        attrName: "showClear",
        useCustomLayout: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
      },
      {
        id: "select-adornments-prefixText",
        labelName: i18n.t("editor.inspect.setter_label.prefix_text"),
        attrName: "prefixText",
        setterType: "INPUT_SETTER",
      },
      {
        id: "select-adornments-suffixText",
        labelName: i18n.t("editor.inspect.setter_label.suffix_text"),
        attrName: "suffixText",
        setterType: "INPUT_SETTER",
      },
      {
        id: "select-adornments-tooltip",
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "select-layout",
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: "select-layout-hidden",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        placeholder: "false",
      },
    ],
  },
  {
    id: `select-style`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: `select-style-styles`,
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.styles"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `select-style-color`,
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
