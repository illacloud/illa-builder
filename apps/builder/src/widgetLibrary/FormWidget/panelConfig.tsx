import { ReactComponent as RadioIcon } from "@/assets/radius-icon.svg"
import { ReactComponent as StrokeWidthIcon } from "@/assets/stroke-width-icon.svg"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"
import { FORM_EVENT_HANDLER_CONFIG } from "./eventHandlerConfig"

const baseWidgetName = "form"
export const FORM_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-interaction`,
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        ...generatorEventHandlerConfig(
          baseWidgetName,
          FORM_EVENT_HANDLER_CONFIG.events,
        ),
      },
      {
        id: `${baseWidgetName}-interaction-disabled`,
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.disabled"),
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        placeholder: "{{false}}",
      },
      {
        id: `${baseWidgetName}-interaction-disabled-submit`,
        labelName: i18n.t("editor.inspect.setter_label.disable_submit"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.disabled_submit"),
        attrName: "disabledSubmit",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
      },
      {
        id: `${baseWidgetName}-interaction-validate-input-on-submit`,
        labelName: i18n.t(
          "editor.inspect.setter_label.validate_inputs_on_submit",
        ),
        attrName: "validateInputsOnSubmit",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
      },
      {
        id: `${baseWidgetName}-interaction-reset-after-successful-submit`,
        labelName: i18n.t(
          "editor.inspect.setter_label.reset_after_successful_submit",
        ),
        attrName: "resetAfterSuccessful",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
      },
    ],
  },
  {
    id: `${baseWidgetName}-adornments`,
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: `${baseWidgetName}-adornments-tooltip`,
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.tooltip"),
        attrName: "tooltipText",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: `${baseWidgetName}-layout`,
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: `${baseWidgetName}-layout-show-header`,
        labelName: i18n.t("editor.inspect.setter_label.show_header"),
        attrName: "showHeader",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
      },
      {
        id: `${baseWidgetName}-layout-show-footer`,
        labelName: i18n.t("editor.inspect.setter_label.show_footer"),
        attrName: "showFooter",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
      },
      {
        id: `${baseWidgetName}-layout-hidden`,
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        attrName: "hidden",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
      },
    ],
  },
  {
    id: `${baseWidgetName}-styles`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: `${baseWidgetName}-styles-color`,
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.border"),
        attrName: "border",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-border`,
            labelName: i18n.t("editor.inspect.setter_label.color"),
            attrName: "borderColor",
            setterType: "COLOR_PICKER_SETTER",
            defaultValue: "#ffffffff",
          },
          {
            id: `${baseWidgetName}-style-radius`,
            labelName: i18n.t("editor.inspect.setter_label.radius"),
            attrName: "radius",
            setterType: "EDITABLE_INPUT_WITH_MEASURE_SETTER",
            icon: <RadioIcon />,
            defaultValue: "4px",
          },
          {
            id: `${baseWidgetName}-style-border-width`,
            labelName: i18n.t("editor.inspect.setter_label.width"),
            attrName: "borderWidth",
            icon: <StrokeWidthIcon />,
            setterType: "EDITABLE_INPUT_WITH_MEASURE_SETTER",
            defaultValue: "4px",
          },
        ],
      },
      {
        id: `${baseWidgetName}-styles-style`,
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.style"),
        attrName: "style",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-background`,
            labelName: i18n.t("editor.inspect.setter_label.background"),
            attrName: "backgroundColor",
            setterType: "COLOR_PICKER_SETTER",
            defaultValue: "#ffffffff",
          },
          // {
          //   id: `${baseWidgetName}-style-shadow`,
          //   labelName: i18n.t("editor.inspect.setter_label.shadow"),
          //   attrName: "shadow",
          //   icon: <ShadowIcon />,
          //   setterType: "EDITABLE_INPUT_SETTER",
          //   defaultValue: "small",
          // },
        ],
      },
    ],
  },
]
