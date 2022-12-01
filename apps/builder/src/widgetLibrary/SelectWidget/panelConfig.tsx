import { HorizontalEndIcon, HorizontalStartIcon } from "@illa-design/react"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"
import { SELECT_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/SelectWidget/eventHandlerConfig"

const baseWidgetName = "select"
export const SELECT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-options`,
    groupName: i18n.t("editor.inspect.setter_group.options"),
    children: [
      {
        id: `${baseWidgetName}-options-mode`,
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
        id: `${baseWidgetName}-basic-options`,
        useCustomLayout: true,
        attrName: "manualOptions",
        setterType: "OPTION_LIST_SETTER",
        bindAttrName: ["optionConfigureMode"],
        shown: (value) => !value || value === "static",
        childrenSetter: [
          {
            id: `${baseWidgetName}-options-label`,
            labelName: i18n.t("editor.inspect.setter_label.label"),
            attrName: "label",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-options-value`,
            labelName: i18n.t("editor.inspect.setter_label.value"),
            attrName: "value",
            setterType: "INPUT_SETTER",
          },
          {
            id: `${baseWidgetName}-options-disabled`,
            labelName: i18n.t("editor.inspect.setter_label.disabled"),
            attrName: "disabled",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
          },
        ],
      },
      {
        id: `${baseWidgetName}-option-data-sources`,
        labelName: i18n.t("editor.inspect.setter_label.data_sources"),
        attrName: "dataSources",
        setterType: "INPUT_SETTER",
        bindAttrName: ["optionConfigureMode"],
        expectedType: VALIDATION_TYPES.ARRAY,
        shown: (value) => value === "dynamic",
        isSetterSingleRow: true,
      },
      {
        id: `${baseWidgetName}-option-mapped`,
        labelName: i18n.t("editor.inspect.setter_label.mapped_option"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.map_data_option"),
        useCustomLayout: true,
        attrName: "mappedOption",
        setterType: "OPTION_MAPPED_SETTER",
        bindAttrName: ["optionConfigureMode"],
        shown: (value) => value === "dynamic",
        childrenSetter: [
          {
            id: `${baseWidgetName}-mappedOption-labels`,
            labelName: i18n.t("editor.inspect.setter_label.label"),
            attrName: "labels",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            placeholder: "{{item}}",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-values`,
            labelName: i18n.t("editor.inspect.setter_label.value"),
            attrName: "values",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            placeholder: "{{item}}",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-disables`,
            labelName: i18n.t("editor.inspect.setter_label.disabled"),
            attrName: "disables",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            placeholder: "{{false}}",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
        ],
      },
      {
        id: `${baseWidgetName}-basic-defaultValue`,
        labelName: i18n.t("editor.inspect.setter_label.default_value"),
        labelDesc: i18n.t(
          "editor.inspect.setter_tooltip.component_default_value",
        ),
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-basic-placeholder`,
        labelName: i18n.t("editor.inspect.setter_label.placeholder"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.placeholder"),
        attrName: "placeholder",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
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
        id: `${baseWidgetName}-label-hidden`,
        labelName: i18n.t("editor.inspect.setter_label.hidden_label"),
        attrName: "labelHidden",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-label-position`,
        labelName: i18n.t("editor.inspect.setter_label.label_position"),
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        bindAttrName: ["labelHidden"],
        shown: (value) => !value,
        options: [
          { label: i18n.t("widget.public.left"), value: "left" },
          { label: i18n.t("widget.public.top"), value: "top" },
        ],
      },
      {
        id: `${baseWidgetName}-label-alignment`,
        labelName: i18n.t("editor.inspect.setter_label.label_alignment"),
        attrName: "labelAlign",
        setterType: "RADIO_GROUP_SETTER",
        bindAttrName: ["labelHidden"],
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
        id: `${baseWidgetName}-label-labelWidth`,
        labelName: i18n.t("editor.inspect.setter_label.label_width"),
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
        bindAttrName: ["labelHidden"],
        shown: (value) => !value,
        expectedType: VALIDATION_TYPES.NUMBER,
      },
    ],
  },
  {
    id: `${baseWidgetName}-interaction`,
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        ...generatorEventHandlerConfig(
          baseWidgetName,
          SELECT_EVENT_HANDLER_CONFIG.events,
        ),
      },
      {
        id: `${baseWidgetName}-interaction-disabled`,
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.disabled"),
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-interaction-readonly`,
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
    id: `${baseWidgetName}-Adornments`,
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: `${baseWidgetName}-adornments-showClear`,
        labelName: i18n.t("editor.inspect.setter_label.show_clear_button"),
        attrName: "showClear",
        useCustomLayout: true,
        openDynamic: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      //  [TODO] Not need it for now
      // {
      //   id: `${baseWidgetName}-adornments-prefixText`,
      //   labelName: i18n.t("editor.inspect.setter_label.prefix_text"),
      //   attrName: "prefixText",
      //   setterType: "INPUT_SETTER",
      //   expectedType: VALIDATION_TYPES.STRING,
      // },
      // {
      //   id: `${baseWidgetName}-adornments-suffixText`,
      //   labelName: i18n.t("editor.inspect.setter_label.suffix_text"),
      //   attrName: "suffixText",
      //   setterType: "INPUT_SETTER",
      //   expectedType: VALIDATION_TYPES.STRING,
      // },
      {
        id: `${baseWidgetName}-adornments-tooltip`,
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
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
        labelDesc: i18n.t("editor.inspect.setter_tooltip.required_field"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        openDynamic: true,
        attrName: "required",
      },
      {
        id: `${baseWidgetName}-validation-custom`,
        labelName: i18n.t("editor.inspect.setter_label.custom_rule"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.custom_rule"),
        setterType: "INPUT_SETTER",
        attrName: "customRule",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-validation-hide-message`,
        labelName: i18n.t(
          "editor.inspect.setter_label.hide_validation_message",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tooltip.hide_validation_message",
        ),
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        openDynamic: true,
        attrName: "hideValidationMessage",
      },
      {
        id: `${baseWidgetName}-validation-form-data-key`,
        labelName: i18n.t("editor.inspect.setter_label.form_data_key"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.form_data_key"),
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        attrName: "formDataKey",
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
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "hidden",
        useCustomLayout: true,
        openDynamic: true,
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
        id: `${baseWidgetName}-style-colors`,
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-colors-theme-color`,
            labelName: i18n.t("editor.inspect.setter_label.theme_color"),
            attrName: "colorScheme",
            setterType: "COLOR_PICKER_SETTER",
            defaultValue: "blue",
          },
        ],
      },
    ],
  },
]
