import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { DRIVE_PICKER_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/DrivePickerWidget/eventHandlerConfig"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"

const baseWidgetName = "drivePicker"
export const DRIVE_PICKER_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-label-text`,
        labelName: i18n.t(
          "editor.inspect.setter_label.drive_builder.button_text",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.drive_builder.button_text",
        ),
        attrName: "text",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
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
      {
        id: `${baseWidgetName}-label-ILLADriveFolder`,
        labelName: i18n.t(
          "editor.inspect.setter_label.drive_builder.illa_drive_folder",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.drive_builder.illa_drive_folder",
        ),
        attrName: "ILLADriveFolder",
        isSetterSingleRow: true,
        placeholder: "/root/folder/folder",
        bindAttrName: ["allowAnonymousUse"],
        shown: (value) => !value,
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-label-expiredTimeSelect`,
        labelName: i18n.t(
          "editor.inspect.setter_label.drive_builder.expired_time",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.drive_builder.expired_time",
        ),
        attrName: "expirationType",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: i18n.t(
              "editor.inspect.setter_option.drive_builder.expired_time.never",
            ),
            value: "persistent",
          },
          {
            label: i18n.t(
              "editor.inspect.setter_option.drive_builder.expired_time.customer",
            ),
            value: "custom",
          },
        ],
      },
      {
        id: `${baseWidgetName}-label-expiredTime`,
        labelName: i18n.t("editor.inspect.setter_label.drive_builder.time"),
        labelDesc: i18n.t("editor.inspect.setter_tips.drive_builder.time"),
        attrName: "expiredTime",
        bindAttrName: ["expirationType"],
        isSetterSingleRow: true,
        shown: (value) => value === "custom",
        expectedType: VALIDATION_TYPES.NUMBER,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-label-Hotlink`,
        labelName: i18n.t(
          "editor.inspect.setter_label.drive_builder.turn_on_hotlink",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.drive_builder.turn_on_hotlink",
        ),
        attrName: "useHotlink",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
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
        id: `${baseWidgetName}-label-minFileNum`,
        labelName: i18n.t(
          "editor.inspect.setter_label.drive_builder.min_file_num",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.drive_builder.min_file_num",
        ),
        attrName: "minFileNum",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${baseWidgetName}-label-maxFileNum`,
        labelName: i18n.t(
          "editor.inspect.setter_label.drive_builder.max_file_num",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.drive_builder.max_file_num",
        ),
        attrName: "maxFileNum",
        setterType: "INPUT_SETTER",
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
          DRIVE_PICKER_EVENT_HANDLER_CONFIG.events,
        ),
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
    id: `${baseWidgetName}-Adornments`,
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
