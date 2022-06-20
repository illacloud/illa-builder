import { HorizontalEnd, HorizontalStart } from "@/wrappedComponents/svg"
import { colorSchemeOptions } from "@/wrappedComponents/colorSchemeOptions"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"

const OptionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const DATE_RANGE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "date-range-basic",
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: "date-range-basic-start-date",
        attrName: "value",
        setterType: "DATE_RANGE_VALUE_SETTER",
        useCustomLayout: true,
      },
      {
        id: "date-basic-Format",
        labelName: i18n.t("editor.inspect.setter_label.format"),
        attrName: "dateFormat",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-basic-start-placeholder",
        labelName: i18n.t("editor.inspect.setter_label.start_placeholder"),
        isSetterSingleRow: true,
        attrName: "startPlaceholder",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-basic-end-placeholder",
        labelName: i18n.t("editor.inspect.setter_label.end_placeholder"),
        isSetterSingleRow: true,
        attrName: "endPlaceholder",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-basic-max-date",
        labelName: i18n.t("editor.inspect.setter_label.max_date"),
        attrName: "maxDate",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-basic-min-date",
        labelName: i18n.t("editor.inspect.setter_label.min_date"),
        attrName: "minDate",
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
      },
      {
        id: "date-range-label-caption",
        labelName: i18n.t("editor.inspect.setter_label.caption"),
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
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
            label: (
              <div style={OptionsStyle}>
                <HorizontalStart />
              </div>
            ),
            value: "left",
          },
          {
            label: (
              <div style={OptionsStyle}>
                <HorizontalEnd />
              </div>
            ),
            value: "right",
          },
        ],
      },
      {
        id: "date-range-label-labelWidth",
        labelName: i18n.t("editor.inspect.setter_label.label_width"),
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "date-range-interaction",
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      // eventHandle @aoao
      {
        id: "date-range-interaction-loading",
        labelName: i18n.t("editor.inspect.setter_label.loading"),
        labelDesc: "xxxxx",
        attrName: "loading",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-interaction-disabled",
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        labelDesc: "xxxxx",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-interaction-readonly",
        labelName: i18n.t("editor.inspect.setter_label.read_only"),
        labelDesc: "xxxxx",
        attrName: "readonly",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "date-range-adornments",
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: "date-range-adornments-showClear",
        labelName: i18n.t("editor.inspect.setter_label.show_clear_button"),
        attrName: "showClear",
        useCustomLayout: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
      },
      {
        id: "date-range-adornments-tooltip",
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
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
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        attrName: "required",
      },
      {
        id: "date-range-validation-custom",
        labelName: i18n.t("editor.inspect.setter_label.custom_rule"),
        setterType: "INPUT_SETTER",
        attrName: "customRule",
      },
      {
        id: "date-range-validation-hide-message",
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
    id: "date-range-layout",
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: "date-range-layout-hidden",
        setterType: "INPUT_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        attrName: "hidden",
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
        labelName: i18n.t("editor.inspect.setter_label.color"),
        attrName: "color",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "date-range-style",
            labelName: i18n.t("editor.inspect.setter_label.theme_color"),
            setterType: "COLOR_SELECT_SETTER",
            attrName: "colorScheme",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
        ],
      },
    ],
  },
]
