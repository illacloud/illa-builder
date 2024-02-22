import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PC/PublicSector/utils/generatorEventHandlerConfig"
import { CAMERA_EVENT_HANDLER_CONFIG } from "./eventHandlerConfig"
import { CAMERA_MODE, FACING_MODE } from "./interface"

const baseWidgetName = "camera"
export const CAMERA_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-basic-buttonText`,
        labelName: i18n.t("editor.inspect.setter_label.text"),
        attrName: "buttonText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-basic-inputMethod`,
        labelName: i18n.t("editor.inspect.setter_label.camera.input_method"),
        attrName: "inputMethod",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: i18n.t("editor.inspect.setter_option.camera.camera"),
            value: CAMERA_MODE.PHOTO,
          },
          {
            label: i18n.t("editor.inspect.setter_option.camera.video"),
            value: CAMERA_MODE.VIDEO,
          },
        ],
      },
      {
        id: `${baseWidgetName}-basic-defaultCamera`,
        labelName: i18n.t("editor.inspect.setter_label.camera.default_camera"),
        attrName: "facingMode",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: i18n.t("editor.inspect.setter_option.camera.Back"),
            value: FACING_MODE.ENVIRONMENT,
          },
          {
            label: i18n.t("editor.inspect.setter_option.camera.Front"),
            value: FACING_MODE.USER,
          },
        ],
      },
      {
        id: `${baseWidgetName}-basic-selectionType`,
        labelName: i18n.t("editor.inspect.setter_label.selection_types"),
        attrName: "selectionType",
        setterType: "BASE_SELECT_SETTER",
        options: [
          {
            label: i18n.t(
              "editor.inspect.setter_default_value.selection_types.single_file",
            ),
            value: "single",
          },
          {
            label: i18n.t(
              "editor.inspect.setter_default_value.selection_types.multiple_files",
            ),
            value: "multiple",
          },
        ],
      },
      {
        id: `${baseWidgetName}-label-allowAnonymousUse`,
        labelName: i18n.t(
          "editor.inspect.setter_label.drive_builder.allow_public_use",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.drive_builder.allow_public_use",
        ),
        attrName: "allowAnonymousUse",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        setterType: "DRIVE_WITH_STATUS_SWITCH_SETTER",
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
    ],
  },
  {
    id: `${baseWidgetName}-interaction`,
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        ...generatorEventHandlerConfig(
          baseWidgetName,
          CAMERA_EVENT_HANDLER_CONFIG.events,
        ),
      },
      {
        id: `${baseWidgetName}-interaction-loading`,
        labelName: i18n.t("editor.inspect.setter_label.loading"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.loading"),
        attrName: "loading",
        placeholder: "{{false}}",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        bindAttrName: ["submit"],
        shown: (value) => !value,
      },
      {
        id: `${baseWidgetName}-interaction-disabled`,
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.disabled"),
        placeholder: "{{false}}",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
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
        id: `${baseWidgetName}-validation-min-minFiles`,
        labelName: i18n.t("editor.inspect.setter_label.min_files"),
        isSetterSingleRow: true,
        attrName: "minFiles",
        bindAttrName: ["selectionType"],
        shown: (value) => value === "multiple",
        setterType: "INPUT_SETTER",
        placeholder: "{{0}}",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${baseWidgetName}-validation-min-maxFiles`,
        labelName: i18n.t("editor.inspect.setter_label.max_files"),
        isSetterSingleRow: true,
        attrName: "maxFiles",
        bindAttrName: ["selectionType"],
        shown: (value) => value === "multiple",
        setterType: "INPUT_SETTER",
        placeholder: "{{0}}",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${baseWidgetName}-validation-min-duration`,
        labelName: i18n.t("editor.inspect.setter_label.recording.min_duration"),
        labelDesc: i18n.t("editor.inspect.setter_tips.recording.min_duration"),
        isSetterSingleRow: true,
        attrName: "minDuration",
        bindAttrName: ["inputMethod"],
        shown: (value) => value === CAMERA_MODE.VIDEO,
        setterType: "INPUT_SETTER",
        placeholder: "{{0}}",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${baseWidgetName}-validation-max-duration`,
        labelName: i18n.t("editor.inspect.setter_label.recording.max_duration"),
        labelDesc: i18n.t("editor.inspect.setter_tips.recording.max_duration"),
        isSetterSingleRow: true,
        attrName: "maxDuration",
        bindAttrName: ["inputMethod"],
        shown: (value) => value === CAMERA_MODE.VIDEO,
        setterType: "INPUT_SETTER",
        placeholder: "{{10000}}",
        expectedType: VALIDATION_TYPES.NUMBER,
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
        isSetterSingleRow: true,
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
        setterType: "DYNAMIC_SWITCH_SETTER",
        openDynamic: true,
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        useCustomLayout: true,
        attrName: "hidden",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `${baseWidgetName}-style`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: `${baseWidgetName}-style-variant`,
        setterType: "RADIO_GROUP_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.variant"),
        attrName: "variant",
        options: [
          {
            label: i18n.t("editor.inspect.setter_default_value.fill"),
            value: "fill",
          },
          {
            label: i18n.t("editor.inspect.setter_default_value.outline"),
            value: "outline",
          },
        ],
      },
      {
        id: `${baseWidgetName}-style-list`,
        setterType: "STYLE_CONTAINER_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-bg`,
            labelName: i18n.t("editor.inspect.setter_label.theme_color"),
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            attrName: "colorScheme",
            defaultValue: "blue",
          },
        ],
      },
    ],
  },
]
