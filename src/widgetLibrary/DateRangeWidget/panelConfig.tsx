import { HorizontalEndIcon, HorizontalStartIcon } from "@illa-design/icon"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import i18n from "@/i18n/config"

export const DATE_RANGE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "date-range-basic",
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: "date-range-basic-start-date",
        labelName: i18n.t("editor.inspect.setter_label.start_date"),
        attrName: "startValue",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-basic-end-date",
        labelName: i18n.t("editor.inspect.setter_label.end_data"),
        attrName: "endValue",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-basic-Format",
        labelName: i18n.t("editor.inspect.setter_label.format"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.date_format"),
        transComponents: {
          DayJS: <a href="https://day.js.org/docs/en/parse/string-format"></a>,
        },
        attrName: "dateFormat",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-basic-start-placeholder",
        labelName: i18n.t("editor.inspect.setter_label.start_placeholder"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.placeholder"),
        isSetterSingleRow: true,
        attrName: "startPlaceholder",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-basic-end-placeholder",
        labelName: i18n.t("editor.inspect.setter_label.end_placeholder"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.placeholder"),
        isSetterSingleRow: true,
        attrName: "endPlaceholder",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-basic-max-date",
        labelName: i18n.t("editor.inspect.setter_label.max_date"),
        attrName: "maxDate",
        placeholder: "2022-05-30",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-basic-min-date",
        labelName: i18n.t("editor.inspect.setter_label.min_date"),
        attrName: "minDate",
        placeholder: "2022-05-01",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "date-range-label",
    groupName: i18n.t("editor.inspect.setter_group.label"),
    children: [
      {
        id: "date-range-label-label",
        labelName: i18n.t("editor.inspect.setter_label.label"),
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "date-range-label-caption",
        labelName: i18n.t("editor.inspect.setter_label.caption"),
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "date-range-label-position",
        labelName: i18n.t("editor.inspect.setter_label.label_position"),
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: "date-range-label-alignment",
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
        id: "date-range-label-labelWidth",
        labelName: i18n.t("editor.inspect.setter_label.label_width"),
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
    ],
  },
  {
    id: "date-range-interaction",
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      // eventHandle @aoao
      {
        id: "date-range-interaction-disabled",
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.disabled"),
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: "date-range-interaction-readonly",
        labelName: i18n.t("editor.inspect.setter_label.read_only"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.read_only"),
        attrName: "readonly",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "date-range-adornments",
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: "date-range-adornments-tooltip",
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-adornments-showClear",
        labelName: i18n.t("editor.inspect.setter_label.show_clear_button"),
        attrName: "showClear",
        useCustomLayout: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: "date-range-interaction-loading",
        labelName: i18n.t("editor.inspect.setter_label.loading"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.loading"),
        attrName: "loading",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "date-range-validation",
    groupName: i18n.t("editor.inspect.setter_group.validation"),
    children: [
      {
        id: "date-range-validation-required",
        labelName: i18n.t("editor.inspect.setter_label.required_field"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.required_field"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "required",
      },
      {
        id: "date-range-validation-hide-message",
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
    id: "date-range-layout",
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: "date-range-layout-hidden",
        setterType: "DYNAMIC_SWITCH_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        labelDescOption: { name: "dateRangeName" },
        attrName: "hidden",
        useCustomLayout: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "date-range-style",
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: "date-range-style-list",
        setterType: "LIST_SETTER",
        isSetterSingleRow: true,
        labelName: i18n.t("editor.inspect.setter_label.styles"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "date-range-styles-colorScheme",
            labelName: i18n.t("editor.inspect.setter_label.theme_color"),
            setterType: "COLOR_PICKER_SETTER",
            attrName: "colorScheme",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
        ],
      },
    ],
  },
]
