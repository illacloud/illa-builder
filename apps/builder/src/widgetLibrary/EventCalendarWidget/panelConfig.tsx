import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { EVENT_CALENDAR_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/EventCalendarWidget/eventHandlerConfig"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"

const baseWidgetName = "eventCalendar"
export const EVENT_CALENDAR_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-options-event`,
    groupName: i18n.t("editor.inspect.setter_group.event"),
    children: [
      {
        id: `${baseWidgetName}-options-mode-event`,
        attrName: "eventConfigureMode",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: i18n.t("widget.public.select_options.manual"),
            value: "static",
          },
          {
            label: i18n.t("widget.public.select_options.mapped"),
            value: "dynamic",
          },
        ],
      },
      {
        id: `${baseWidgetName}-basic-options-event`,
        useCustomLayout: true,
        attrName: "manualOptions",
        setterType: "CALENDAR_EVENT_LIST_SETTER",
        bindAttrName: ["eventConfigureMode"],
        shown: (value) => !value || value === "static",
        childrenSetter: [
          {
            id: `${baseWidgetName}-options-event-id`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.event_id",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.event_id",
            ),
            attrName: "value",
            placeholder: "{{id}}",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-options-event-title`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.title",
            ),
            labelDesc: i18n.t("editor.inspect.setter_tips.eventCalendar.title"),
            attrName: "title",
            placeholder: "{{title}}",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-options-event-description`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.description",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.description",
            ),
            attrName: "description",
            placeholder: "{{description}}",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-options-event-start`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.start",
            ),
            labelDesc: i18n.t("editor.inspect.setter_tips.eventCalendar.start"),
            attrName: "start",
            placeholder: "{{2032-1-1 00:00}}",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-options-event-end`,
            labelName: i18n.t("editor.inspect.setter_label.eventCalendar.end"),
            labelDesc: i18n.t("editor.inspect.setter_tips.eventCalendar.end"),
            attrName: "end",
            placeholder: "{{2032-1-1 00:00}}",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-options-event-resourceID`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.resource_id",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.resource_id",
            ),
            attrName: "resourceID",
            placeholder: "{{resourceID}}",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-options-resource-resourceTitle`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.resource_title",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.resource_title",
            ),
            attrName: "resourceTitle",
            placeholder: "{{resourceTitle}}",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-options-event-allDay`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.all_day",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.all_day",
            ),
            attrName: "allDay",
            placeholder: "{{false}}",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
          },
          {
            id: `${baseWidgetName}-options-event-Draggable`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.draggable",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.draggable",
            ),
            setterType: "INPUT_SETTER",
            attrName: "draggable",
            placeholder: "{{false}}",
            expectedType: VALIDATION_TYPES.BOOLEAN,
          },
          {
            id: `${baseWidgetName}-options-event-Resizable`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.resizable",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.resizable",
            ),
            setterType: "INPUT_SETTER",
            attrName: "resizable",
            placeholder: "{{false}}",
            expectedType: VALIDATION_TYPES.BOOLEAN,
          },
        ],
      },
      {
        id: `${baseWidgetName}-option-data-sources-event`,
        labelName: i18n.t(
          "editor.inspect.setter_label.eventCalendar.data_source",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.eventCalendar.data_source",
        ),
        attrName: "dataSources",
        setterType: "INPUT_SETTER",
        bindAttrName: ["eventConfigureMode"],
        expectedType: VALIDATION_TYPES.ARRAY,
        shown: (value) => value === "dynamic",
        isSetterSingleRow: true,
      },
      {
        id: `${baseWidgetName}-option-mapped-event`,
        labelName: i18n.t("editor.inspect.setter_label.mapped_option"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.map_data_option"),
        useCustomLayout: true,
        attrName: "mappedOption",
        setterType: "OPTION_MAPPED_SETTER",
        bindAttrName: ["eventConfigureMode"],
        shown: (value) => value === "dynamic",
        childrenSetter: [
          {
            id: `${baseWidgetName}-mappedOption-event-id`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.event_id",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.event_id",
            ),
            attrName: "values",
            placeholder: "{{item.event}}",
            isSetterSingleRow: true,
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-event-title`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.title",
            ),
            labelDesc: i18n.t("editor.inspect.setter_tips.eventCalendar.title"),
            attrName: "titles",
            placeholder: "{{item.title}}",
            isSetterSingleRow: true,
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-event-description`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.description",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.description",
            ),
            attrName: "descriptions",
            placeholder: "{{item.description}}",
            isSetterSingleRow: true,
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-event-start`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.start",
            ),
            labelDesc: i18n.t("editor.inspect.setter_tips.eventCalendar.start"),
            attrName: "starts",
            placeholder: "{{item.start}}",
            isSetterSingleRow: true,
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-event-end`,
            labelName: i18n.t("editor.inspect.setter_label.eventCalendar.end"),
            labelDesc: i18n.t("editor.inspect.setter_tips.eventCalendar.end"),
            attrName: "ends",
            placeholder: "{{item.end}}",
            isSetterSingleRow: true,
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-event-resourceID`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.resource_id",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.resource_id",
            ),
            attrName: "resourceIDs",
            placeholder: "{{item.resourceID}}",
            isSetterSingleRow: true,
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-resource-resourceTitle`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.resource_title",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.resource_title",
            ),
            attrName: "resourceTitles",
            placeholder: "{{item.resourceTitle}}",
            isSetterSingleRow: true,
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-event-allDay`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.all_day",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.all_day",
            ),
            attrName: "allDays",
            placeholder: "{{item.allDay}}",
            isSetterSingleRow: true,
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-event-draggable`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.draggable",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.draggable",
            ),
            attrName: "draggables",
            placeholder: "{{false}}",
            isSetterSingleRow: true,
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-event-resizable`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.resizable",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.resizable",
            ),
            attrName: "resizables",
            placeholder: "{{false}}",
            isSetterSingleRow: true,
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
        ],
      },
    ],
  },
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-basic-default-date`,
        labelName: i18n.t(
          "editor.inspect.setter_label.eventCalendar.default_date",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.eventCalendar.default_date",
        ),
        attrName: "defaultDate",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        placeholder: "2032-01-01",
      },
      {
        id: `${baseWidgetName}-basic-default-showResource`,
        labelName: i18n.t(
          "editor.inspect.setter_label.eventCalendar.resource_grid",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.eventCalendar.resource_grid",
        ),
        attrName: "showResource",
        setterType: "DYNAMIC_SWITCH_SETTER",
        placeholder: "false",
        defaultValue: false,
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-basic-default-view`,
        labelName: i18n.t(
          "editor.inspect.setter_label.eventCalendar.default_view",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.eventCalendar.default_view",
        ),
        attrName: "defaultView",
        expectedType: VALIDATION_TYPES.STRING,
        isSetterSingleRow: true,
        bindAttrName: ["showResource"],
        setterType: "EVENT_CALENDAR_SELECT",
        options: [
          {
            label: i18n.t("editor.inspect.setter_option.eventCalendar.month"),
            value: "month",
          },
          {
            label: i18n.t("editor.inspect.setter_option.eventCalendar.week"),
            value: "week",
          },
          {
            label: i18n.t("editor.inspect.setter_option.eventCalendar.day"),
            value: "day",
          },
          {
            label: i18n.t("editor.inspect.setter_option.eventCalendar.agenda"),
            value: "agenda",
          },
        ],
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
          EVENT_CALENDAR_EVENT_HANDLER_CONFIG.events,
        ),
      },
      {
        id: `${baseWidgetName}-custom_message_draggable`,
        labelName: i18n.t(
          "editor.inspect.setter_label.eventCalendar.custom_message_draggable",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.eventCalendar.custom_message_draggable",
        ),
        attrName: "dragMsg",
        isSetterSingleRow: true,
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-custom_message_resizable`,
        labelName: i18n.t(
          "editor.inspect.setter_label.eventCalendar.custom_message_resizable",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.eventCalendar.custom_message_resizable",
        ),
        attrName: "resizeMsg",
        isSetterSingleRow: true,
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
        defaultValue: false,
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-layout-showCurrentTime`,
        labelName: i18n.t(
          "editor.inspect.setter_label.eventCalendar.show_current_time",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.eventCalendar.show_current_time",
        ),
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "showCurrentTime",
        placeholder: "true",
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
        id: `${baseWidgetName}-style-color`,
        setterType: "STYLE_CONTAINER_SETTER",
        labelName: i18n.t("editor.inspect.setter_group.event"),
        attrName: "event",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-bg`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.calendar_background",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.calendar_background",
            ),
            attrName: "slotBackground",
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            defaultValue: "white",
          },
          {
            id: `${baseWidgetName}-style-cal-text`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.calendar_text",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.calendar_text",
            ),
            attrName: "titleColor",
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            defaultValue: "gray",
          },
          {
            id: `${baseWidgetName}-style-event-bg`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.event_background",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.event_background",
            ),
            attrName: "eventBackground",
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            defaultValue: "blue",
          },
          {
            id: `${baseWidgetName}-style-event-text`,
            labelName: i18n.t(
              "editor.inspect.setter_label.eventCalendar.event_text",
            ),
            labelDesc: i18n.t(
              "editor.inspect.setter_tips.eventCalendar.event_text",
            ),
            attrName: "eventTextColor",
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            defaultValue: "blue",
          },
        ],
      },
    ],
  },
]
