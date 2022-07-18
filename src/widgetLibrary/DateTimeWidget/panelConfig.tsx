import { HorizontalEndIcon, HorizontalStartIcon } from "@illa-design/icon"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"

import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const DATE_TIME_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "date_time-basic",
    groupName: "editor.inspect.setter_group.basic",
    children: [
      {
        id: "date_time-basic-DefaultValue",
        labelName: "editor.inspect.setter_label.default_value",
        labelDesc: "editor.inspect.setter_tooltip.default_value",
        attrName: "value",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "date_time-basic-date-format",
        labelName: "editor.inspect.setter_label.format",
        labelDesc: "editor.inspect.setter_tooltip.date_format",
        transComponents: {
          DayJS: <a href="https://day.js.org/docs/en/parse/string-format"></a>,
        },
        attrName: "dateFormat",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "date_time-basic-placeholder",
        labelName: "editor.inspect.setter_label.placeholder",
        labelDesc: "editor.inspect.setter_tooltip.placeholder",
        attrName: "placeholder",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "date_time-basic-max-date",
        labelName: "editor.inspect.setter_label.max_date",
        attrName: "maxDate",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "date_time-basic-min-date",
        labelName: "editor.inspect.setter_label.min_date",
        attrName: "minDate",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "date_time-basic-time-format",
        labelName: "editor.inspect.setter_label.time_format",
        attrName: "timeFormat",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "date_time-basic-minute-step",
        labelName: "editor.inspect.setter_label.step_size",
        attrName: "minuteStep",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
    ],
  },
  {
    id: "date_time-label",
    groupName: "editor.inspect.setter_group.label",
    children: [
      {
        id: "date_time-label-label",
        labelName: "editor.inspect.setter_label.label",
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "date_time-label-caption",
        labelName: "editor.inspect.setter_label.caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "date_time-label-position",
        labelName: "editor.inspect.setter_label.label_position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: "date_time-label-alignment",
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
        id: "select-label-labelWidth",
        labelName: "editor.inspect.setter_label.label_width",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
    ],
  },
  {
    id: "date_time-interaction",
    groupName: "editor.inspect.setter_group.interaction",
    children: [
      // eventHandle @aoao
      {
        id: "date_time-interaction-loading",
        labelName: "editor.inspect.setter_label.loading",
        labelDesc: "editor.inspect.setter_tooltip.loading",
        attrName: "loading",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: "date_time-interaction-disabled",
        labelName: "editor.inspect.setter_label.disabled",
        labelDesc: "editor.inspect.setter_tooltip.disabled",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: "date_time-interaction-readonly",
        labelName: "editor.inspect.setter_label.read_only",
        labelDesc: "editor.inspect.setter_tooltip.read_only",
        attrName: "readonly",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "date_time-adornments",
    groupName: "editor.inspect.setter_group.adornments",
    children: [
      {
        id: "date_time-adornments-showClear",
        labelName: "editor.inspect.setter_label.show_clear_button",
        attrName: "showClear",
        useCustomLayout: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: "date_time-adornments-tooltip",
        labelName: "editor.inspect.setter_label.tooltip",
        labelDesc: "editor.inspect.setter_tooltip.tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "date-time-validation",
    groupName: "editor.inspect.setter_group.validation",
    children: [
      {
        id: "date-time-validation-required",
        labelName: "editor.inspect.setter_label.required_field",
        labelDesc: "editor.inspect.setter_tooltip.required_field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "required",
      },
      {
        id: "date-time-validation-custom",
        labelName: "editor.inspect.setter_label.custom_rule",
        labelDesc: "editor.inspect.setter_tooltip.custom_rule",
        setterType: "INPUT_SETTER",
        attrName: "customRule",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "date-time-validation-hide-message",
        labelName: "editor.inspect.setter_label.hide_validation_message",
        labelDesc: "editor.inspect.setter_tooltip.hide_validation_message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "date_time-layout",
    groupName: "editor.inspect.setter_group.layout",
    children: [
      {
        id: "date_time-layout-hidden",
        setterType: "DYNAMIC_SWITCH_SETTER",
        labelName: "editor.inspect.setter_label.hidden",
        labelDesc: "editor.inspect.setter_tooltip.hidden",
        labelDescOption: { name: "dateTimeName" },
        attrName: "hidden",
        useCustomLayout: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "date_time-style",
    groupName: "editor.inspect.setter_group.style",
    children: [
      {
        id: "date_time-style-list",
        setterType: "LIST_SETTER",
        isSetterSingleRow: true,
        labelName: "editor.inspect.setter_label.styles",
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "date_time-style-bg",
            labelName: "editor.inspect.setter_label.theme_color",
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
