import { HorizontalStartIcon, HorizontalEndIcon } from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import i18n from "@/i18n/config"

export const SWITCH_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "switch-basic",
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: "switch-basic-defaultValue",
        labelName: i18n.t("editor.inspect.setter_label.default_value"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.switch_default_value"),
        attrName: "value",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        placeholder: "{{false}}",
      },
    ],
  },
  {
    id: "switch-label",
    groupName: i18n.t("editor.inspect.setter_group.label"),
    children: [
      {
        id: "switch-label-label",
        labelName: i18n.t("editor.inspect.setter_label.label"),
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "switch-label-caption",
        labelName: i18n.t("editor.inspect.setter_label.caption"),
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "switch-label-position",
        labelName: i18n.t("editor.inspect.setter_label.label_position"),
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      },
      {
        id: "switch-label-alignment",
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
    ],
  },
  {
    id: "switch-interaction",
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        id: "switch-interaction-event-handler",
        attrName: "events",
        labelName: i18n.t("editor.inspect.setter_label.event_handler"),
        setterType: "EVENT_HANDLER_SETTER",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "event",
            labelName: i18n.t("editor.inspect.setter_label.event"),
            setterType: "BASE_SELECT_SETTER",
            attrName: "eventType",
            options: [{ label: "Change", value: "onChange" }],
          },
          {
            id: "action",
            labelName: i18n.t("editor.inspect.setter_label.action"),
            labelDesc: i18n.t("editor.inspect.setter_tooltip.action"),
            setterType: "EVENT_ACTION_SELECT_SETTER",
            attrName: "actionType",
            options: [
              {
                label: i18n.t("editor.inspect.setter_label.trigger_query"),
                value: "datasource",
              },
              {
                label: i18n.t("editor.inspect.setter_label.control_component"),
                value: "widget",
              },
              {
                label: i18n.t("editor.inspect.setter_label.run_script"),
                value: "script",
              },
              {
                label: i18n.t("editor.inspect.setter_label.go_to_url"),
                value: "openUrl",
              },
              {
                label: i18n.t("editor.inspect.setter_label.show_notification"),
                value: "showNotification",
              },
            ],
          },
          {
            id: "query",
            labelName: i18n.t("Query"),
            setterType: "EVENT_TARGET_ACTION_SELECT_SETTER",
            attrName: "queryID",
            bindAttrName: "actionType",
            shown: (type) => type === "datasource",
          },
          {
            id: "actionMethod",
            labelName: i18n.t("Action Method"),
            setterType: "BASE_SELECT_SETTER",
            attrName: "widgetMethod",
            bindAttrName: "queryID",
            shown: (type) => type === "datasource",
            // TODO: value should as same as action run method name that mounted on `globalData`
            options: [{ label: "run", value: "executeAction" }],
          },
          {
            id: "component",
            labelName: i18n.t("Component"),
            setterType: "EVENT_TARGET_SELECT_SETTER",
            attrName: "widgetID",
            bindAttrName: "actionType",
            shown: (type) => type === "widget",
          },
          {
            id: "Method",
            labelName: i18n.t("Method"),
            setterType: "EVENT_WIDGET_METHOD_SELECT_SETTER",
            attrName: "widgetMethod",
            bindAttrName: "widgetID",
            shown: (widgetID) => !!widgetID,
          },
          {
            id: "Value",
            labelName: i18n.t("Value"),
            setterType: "INPUT_SETTER",
            attrName: "widgetTargetValue",
            bindAttrName: "widgetMethod",
            shown: (widgetMethod) => widgetMethod === "setValue",
          },
          {
            id: "disabled",
            labelName: i18n.t("editor.inspect.setter_label.disabled"),
            setterType: "DYNAMIC_SWITCH_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
            attrName: "disabled",
            bindAttrName: "type",
            useCustomLayout: true,
            shown: (type) => type === "widget",
          },
          {
            id: "script",
            setterType: "INPUT_SETTER",
            attrName: "script",
            bindAttrName: "actionType",
            expectedType: VALIDATION_TYPES.STRING,
            shown: (type) => type === "script",
          },
          {
            id: "URL",
            labelName: i18n.t("URL"),
            setterType: "INPUT_SETTER",
            attrName: "url",
            bindAttrName: "actionType",
            expectedType: VALIDATION_TYPES.STRING,
            shown: (type) => type === "openUrl",
          },
          {
            id: "newTab",
            labelName: i18n.t("New Tab"),
            setterType: "DYNAMIC_SWITCH_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
            attrName: "newTab",
            bindAttrName: "actionType",
            useCustomLayout: true,
            shown: (type) => type === "openUrl",
          },
          {
            id: "title",
            labelName: i18n.t("Title"),
            setterType: "INPUT_SETTER",
            attrName: "title",
            bindAttrName: "actionType",
            expectedType: VALIDATION_TYPES.STRING,
            shown: (type) => type === "showNotification",
          },
          {
            id: "description",
            labelName: i18n.t("Description"),
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
            attrName: "description",
            bindAttrName: "actionType",
            shown: (type) => type === "showNotification",
          },
          {
            id: "notification-type",
            labelName: i18n.t("Type"),
            setterType: "BASE_SELECT_SETTER",
            attrName: "notificationType",
            bindAttrName: "actionType",
            shown: (type) => type === "showNotification",
            options: [
              { label: "Success", value: "success" },
              { label: "Error", value: "error" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" },
            ],
          },
          {
            id: "duration",
            labelName: i18n.t("Duration"),
            setterType: "INPUT_SETTER",
            attrName: "duration",
            bindAttrName: "actionType",
            expectedType: VALIDATION_TYPES.NUMBER,
            shown: (type) => type === "showNotification",
          },
          {
            id: "enabled",
            labelName: i18n.t("Only run when"),
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
            attrName: "enabled",
          },
        ],
      },
      {
        id: "switch-interaction-disabled",
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.disabled"),
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "switch-Adornments",
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: "switch-adornments-tooltip",
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "switch-layout",
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: "switch-layout-hidden",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "hidden",
        placeholder: "false",
        useCustomLayout: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `switch-style`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: "switch-style",
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "switch-style-radius",
            labelName: i18n.t("editor.inspect.setter_label.theme_color"),
            attrName: "colorScheme",
            setterType: "COLOR_PICKER_SETTER",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
        ],
      },
    ],
  },
]
