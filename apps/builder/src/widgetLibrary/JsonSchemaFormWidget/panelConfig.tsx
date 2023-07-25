import { ReactComponent as RadioIcon } from "@/assets/radius-icon.svg"
import { ReactComponent as StrokeWidthIcon } from "@/assets/stroke-width-icon.svg"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { JSON_SCHEMA_FORM_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/JsonSchemaFormWidget/eventHandlerConfig"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"

const baseWidgetName = "icon"
export const JSON_SCHEMA_FORM_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-label-JSONSchema`,
        labelName: i18n.t(
          "editor.inspect.setter_label.jsonSchemaForm.JSONSchema",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_placeholder.jsonSchemaForm.JSONSchema",
        ),
        attrName: "JSONSchema",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.OBJECT,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-label-UISchema`,
        labelName: i18n.t(
          "editor.inspect.setter_label.jsonSchemaForm.UISchema",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_placeholder.jsonSchemaForm.UISchema",
        ),
        attrName: "UISchema",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.OBJECT,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-label-defaultFormData`,
        labelName: i18n.t(
          "editor.inspect.setter_label.jsonSchemaForm.default_form_data",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_placeholder.jsonSchemaForm.default_form_data",
        ),
        attrName: "formData",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.OBJECT,
        setterType: "INPUT_SETTER",
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
          JSON_SCHEMA_FORM_EVENT_HANDLER_CONFIG.events,
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
    ],
  },
  {
    id: `${baseWidgetName}-layout`,
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: `${baseWidgetName}-layout-submitButtonText`,
        labelName: i18n.t(
          "editor.inspect.setter_label.jsonSchemaForm.submit_button_text",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_placeholder.jsonSchemaForm.submit_button_text",
        ),
        setterType: "INPUT_SETTER",
        attrName: "submitButtonText",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-layout-hiddenSubmitButton`,
        labelName: i18n.t(
          "editor.inspect.setter_label.jsonSchemaForm.hidden_submit_button",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_placeholder.jsonSchemaForm.hidden_submit_button",
        ),
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "hiddenSubmitButton",
        placeholder: "false",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-layout-submitButtonFullWidth`,
        labelName: i18n.t(
          "editor.inspect.setter_label.jsonSchemaForm.submit_button_full_w",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_placeholder.jsonSchemaForm.submit_button_full_w",
        ),
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "submitButtonFullWidth",
        placeholder: "false",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-layout-height`,
        labelName: i18n.t("editor.inspect.setter_label.height"),
        attrName: "dynamicHeight",
        setterType: "HEIGHT_MODE_SELECT",
        options: [
          {
            label: i18n.t("editor.inspect.setter_option.fixed"),
            value: "fixed",
          },
          {
            label: i18n.t("editor.inspect.setter_option.auto_limited"),
            value: "limited",
          },
          {
            label: i18n.t("editor.inspect.setter_option.auto_height"),
            value: "auto",
          },
        ],
      },
      {
        id: `${baseWidgetName}-layout-hidden`,
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "hidden",
        placeholder: "false",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `${baseWidgetName}-style`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: `${baseWidgetName}-colors`,
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-colors-color`,
            labelName: i18n.t("editor.inspect.setter_label.theme_color"),
            attrName: "themeColor",
            setterType: "COLOR_PICKER_SETTER",
            defaultValue: "blue",
          },
        ],
      },
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
            defaultValue: "1px",
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
            id: `${baseWidgetName}-style-shadow`,
            labelName: i18n.t("editor.inspect.setter_label.shadow.shadow"),
            attrName: "shadow",
            setterType: "SHADOW_SELECT_SETTER",
            defaultValue: "small",
            options: [
              {
                label: i18n.t("editor.inspect.setter_option.shadow.none"),
                value: "none",
              },
              {
                label: i18n.t("editor.inspect.setter_option.shadow.large"),
                value: "large",
              },
              {
                label: i18n.t("editor.inspect.setter_option.shadow.medium"),
                value: "medium",
              },
              {
                label: i18n.t("editor.inspect.setter_option.shadow.small"),
                value: "small",
              },
            ],
          },
        ],
      },
    ],
  },
]
