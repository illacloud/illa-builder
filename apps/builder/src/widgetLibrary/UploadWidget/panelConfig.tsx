import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"
import { UPLOAD_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/UploadWidget"

const baseWidgetName = "upload"
export const UPLOAD_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-basic-type`,
        labelName: i18n.t("editor.inspect.setter_label.type"),
        attrName: "type",
        setterType: "SEARCH_SELECT_SETTER",
        options: [
          {
            label: i18n.t(
              "editor.inspect.setter_default_value.upload_type.button",
            ),
            value: "button",
          },
          {
            label: i18n.t(
              "editor.inspect.setter_default_value.upload_type.dropzone",
            ),
            value: "dropzone",
          },
        ],
      },
      {
        id: `${baseWidgetName}-basic-buttonText`,
        labelName: i18n.t("editor.inspect.setter_label.text"),
        attrName: "buttonText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        bindAttrName: ["type"],
        shown: (value) => value === "button",
      },
      {
        id: `${baseWidgetName}-basic-dropText`,
        labelName: i18n.t("editor.inspect.setter_label.text"),
        attrName: "dropText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        bindAttrName: ["type"],
        shown: (value) => value === "dropzone",
      },
      {
        id: `${baseWidgetName}-basic-selectionType`,
        labelName: i18n.t("editor.inspect.setter_label.selection_types"),
        attrName: "selectionType",
        isSetterSingleRow: true,
        setterType: "SEARCH_SELECT_SETTER",
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
          {
            label: i18n.t(
              "editor.inspect.setter_default_value.selection_types.directory",
            ),
            value: "directory",
          },
        ],
      },
      {
        id: `${baseWidgetName}-basic-fileTypes`,
        labelName: i18n.t("editor.inspect.setter_label.file_type"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.file_types"),
        placeholder: '{{[".png",".jpg"]}}',
        attrName: "fileType",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.ARRAY,
      },

      {
        id: `${baseWidgetName}-basic-appendNewFiles`,
        labelName: i18n.t("editor.inspect.setter_label.append_newly_files"),
        attrName: "appendFiles",
        setterType: "SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        bindAttrName: ["selectionType"],
        shown: (value) => value !== "single",
      },
      {
        id: `${baseWidgetName}-basic-fileList`,
        labelName: i18n.t("editor.inspect.setter_label.file_list"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.file_list"),
        attrName: "showFileList",
        useCustomLayout: true,
        openDynamic: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-basic-parseValue`,
        labelName: i18n.t("editor.inspect.setter_label.parse_value"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.parse_value"),
        attrName: "parseValue",
        useCustomLayout: true,
        openDynamic: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
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
          UPLOAD_EVENT_HANDLER_CONFIG.events,
        ),
      },
      {
        id: `${baseWidgetName}-interaction-loading`,
        labelName: i18n.t("editor.inspect.setter_label.loading"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.loading"),
        attrName: "loading",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        bindAttrName: ["type"],
        shown: (value) => value === "button",
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
    id: `${baseWidgetName}-adornments`,
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
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
        id: `${baseWidgetName}-validation-maxFiles`,
        labelName: i18n.t("editor.inspect.setter_label.max_files"),
        setterType: "INPUT_SETTER",
        attrName: "maxFiles",
        expectedType: VALIDATION_TYPES.NUMBER,
        bindAttrName: ["selectionType"],
        shown: (value) => value !== "single",
      },
      {
        id: `${baseWidgetName}-validation-minFiles`,
        labelName: i18n.t("editor.inspect.setter_label.min_files"),
        setterType: "INPUT_SETTER",
        attrName: "minFiles",
        expectedType: VALIDATION_TYPES.NUMBER,
        bindAttrName: ["selectionType"],
        shown: (value) => value !== "single",
      },
      {
        id: `${baseWidgetName}-validation-fileSize`,
        labelName: i18n.t("editor.inspect.setter_label.min_max_size"),
        placeholder: i18n.t("editor.inspect.setter_placeholder.min_max_size"),
        setterType: "FILE_MIN_MAX_SETTER",
        attrName: "",
        useCustomLayout: true,
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
    bindAttrName: ["type"],
    shown: (value) => value === "button",
    children: [
      {
        id: `${baseWidgetName}-style-variant`,
        setterType: "RADIO_GROUP_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.variant"),
        attrName: "variant",
        bindAttrName: ["type"],
        shown: (value) => value === "button",
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
        bindAttrName: ["type"],
        shown: (value) => value === "button",
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
