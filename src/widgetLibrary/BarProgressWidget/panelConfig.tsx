import { HorizontalEndIcon, HorizontalStartIcon } from "@illa-design/icon"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import i18n from "@/i18n/config"
import { EditableInputIconType } from "@/page/App/components/PanelSetters/InputSetter/interface"

export const BAR_PROGRESS_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "bar-progress-basic",
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: "bar-progress-basic-Value",
        labelName: i18n.t("editor.inspect.setter_label.value"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.progress_percentage"),
        attrName: "value",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "bar-progress-label",
    groupName: i18n.t("editor.inspect.setter_group.label"),
    children: [
      {
        id: "bar-progress-label-label",
        labelName: i18n.t("editor.inspect.setter_label.label"),
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "bar-progress-label-caption",
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
        id: "bar-progress-label-position",
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
        id: "bar-progress-label-alignment",
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
        id: "bar-progress-label-labelWidth",
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
    id: "bar-progress-adornments",
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: "bar-progress-adornments-showText",
        labelName: i18n.t("editor.inspect.setter_label.hide_value_label"),
        attrName: "showText",
        setterType: "SWITCH_SETTER",
      },
      {
        id: "bar-progress-adornments-tooltip",
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "bar-progress-layout",
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: "bar-progress-layout-hidden",
        setterType: "DYNAMIC_SWITCH_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        attrName: "hidden",
        useCustomLayout: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "bar-progress-style",
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: "bar-progress-color-list",
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "bar-progress-color",
            labelName: i18n.t("editor.inspect.setter_label.styles"),
            setterType: "COLOR_PICKER_SETTER",
            attrName: "color",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
          {
            id: "bar-progress-trailColor",
            labelName: i18n.t("editor.inspect.setter_label.trail_color"),
            setterType: "COLOR_PICKER_SETTER",
            attrName: "trailColor",
            defaultValue: "gray",
            options: colorSchemeOptions,
          },
        ],
      },
      {
        id: "bar-progress-style-list",
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.styles"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "bar-progress-strokeWidth",
            labelName: i18n.t("editor.inspect.setter_label.stroke_width"),
            setterType: "EDITABLE_INPUT_SETTER",
            iconName: EditableInputIconType.STROKE_WIDTH,
            attrName: "strokeWidth",
            defaultValue: "4px",
            expectedType: VALIDATION_TYPES.STRING,
          },
        ],
      },
    ],
  },
]
