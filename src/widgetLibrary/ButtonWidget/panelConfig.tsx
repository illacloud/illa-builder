import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalFullIcon,
  HorizontalStartIcon,
} from "@illa-design/react"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import i18n from "@/i18n/config"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const BUTTON_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "button-basic",
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: "button-basic-Text",
        labelName: i18n.t("editor.inspect.setter_label.text"),
        attrName: "text",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "button-interaction",
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        id: "button-interaction-event-handler",
        attrName: "events",
        labelName: i18n.t("editor.inspect.setter_label.event_handler"),
        labelDesc: "xxxxx",
        setterType: "EVENT_HANDLER_SETTER",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "event",
            labelName: i18n.t("editor.inspect.setter_label.event"),
            setterType: "BASE_SELECT_SETTER",
            attrName: "eventType",
            options: [{ label: "Click", value: "onClick" }],
          },
          {
            id: "action",
            labelName: i18n.t("editor.inspect.setter_label.action"),
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
            labelName: "Query",
            setterType: "BASE_SELECT_SETTER",
            attrName: "queryID",
            bindAttrName: "actionType",
            shown: (type) => type === "datasource",
          },
          {
            id: "component",
            labelName: "Component",
            setterType: "EVENT_TARGET_SELECT_SETTER",
            attrName: "widgetID",
            bindAttrName: "actionType",
            shown: (type) => type === "widget",
          },
          {
            id: "Method",
            labelName: "Method",
            setterType: "EVENT_WIDGET_METHOD_SELECT_SETTER",
            attrName: "widgetMethod",
            bindAttrName: "widgetID",
            shown: (widgetID) => !!widgetID,
          },
          {
            id: "Value",
            labelName: "Value",
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
            labelName: "URL",
            setterType: "INPUT_SETTER",
            attrName: "url",
            bindAttrName: "actionType",
            expectedType: VALIDATION_TYPES.STRING,
            shown: (type) => type === "openUrl",
          },
          {
            id: "newTab",
            labelName: "New Tab",
            setterType: "DYNAMIC_SWITCH_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
            attrName: "newTab",
            bindAttrName: "actionType",
            useCustomLayout: true,
            shown: (type) => type === "openUrl",
          },
          {
            id: "title",
            labelName: "Title",
            setterType: "INPUT_SETTER",
            attrName: "title",
            bindAttrName: "actionType",
            expectedType: VALIDATION_TYPES.STRING,
            shown: (type) => type === "showNotification",
          },
          {
            id: "description",
            labelName: "Description",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
            attrName: "description",
            bindAttrName: "actionType",
            shown: (type) => type === "showNotification",
          },
          {
            id: "notification-type",
            labelName: "Type",
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
            labelName: "Duration",
            setterType: "INPUT_SETTER",
            attrName: "duration",
            bindAttrName: "actionType",
            expectedType: VALIDATION_TYPES.NUMBER,
            shown: (type) => type === "showNotification",
          },
          {
            id: "enabled",
            labelName: "Only run when",
            labelDesc: "xxxxx",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
            attrName: "enabled",
          },
        ],
      },
      // TODO: wait form container
      // {
      //   id: "button-interaction-type",
      //   labelName: i18n.t("editor.inspect.setter_label.type"),
      //   labelDesc: "xxxxx",
      //   attrName: "submit",
      //   setterType: "RADIO_GROUP_SETTER",
      //   options: [
      //     { label: "Default", value: false },
      //     { label: "Submit", value: true },
      //   ],
      // },
      {
        id: "button-interaction-formId",
        labelName: i18n.t("editor.inspect.setter_label.submit_form"),
        labelDesc: "xxxxx",
        attrName: "formId",
        setterType: "INPUT_SETTER",
        bindAttrName: "submit",
        shown: (value) => value === true,
      },
      {
        id: "button-interaction-loading",
        labelName: i18n.t("editor.inspect.setter_label.loading"),
        labelDesc: "xxxxx",
        attrName: "loading",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        bindAttrName: "submit",
        shown: (value) => {
          return value === false
        },
      },
      {
        id: "button-interaction-disabled",
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        labelDesc: "xxxxx",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        bindAttrName: "submit",
        shown: (value) => value === false,
      },
    ],
  },
  {
    id: "button-adornments",
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: "button-adornments-tooltip",
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        attrName: "tooltipText",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "button-layout",
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: "button-layout-alignment",
        setterType: "RADIO_GROUP_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.align"),
        attrName: "alignment",
        options: [
          {
            label: <HorizontalStartIcon />,
            value: "start",
          },
          {
            label: <HorizontalCenterIcon />,
            value: "center",
          },
          {
            label: <HorizontalEndIcon />,
            value: "end",
          },
          {
            label: <HorizontalFullIcon />,
            value: "fullWidth",
          },
        ],
      },
      {
        id: "button-layout-hidden",
        setterType: "INPUT_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        attrName: "hidden",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "button-style",
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: "button-style-variant",
        setterType: "RADIO_GROUP_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.variant"),
        attrName: "variant",
        options: [
          {
            label: i18n.t("editor.inspect.setter_default_value.solid"),
            value: "fill",
          },
          {
            label: i18n.t("editor.inspect.setter_default_value.outline"),
            value: "outline",
          },
        ],
      },
      {
        id: "button-style-list",
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.styles"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "button-style-bg",
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
