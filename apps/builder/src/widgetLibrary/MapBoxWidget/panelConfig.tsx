import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { MAP_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/MapBoxWidget/eventHandlerConfig"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"

const baseWidgetName = "map"
export const MAP_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-basic-initial-location`,
        labelName: i18n.t("editor.inspect.setter_label.map.initial_location"),
        labelDesc: i18n.t("editor.inspect.setter_tips.map.initial_location"),
        attrName: "center",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.OBJECT,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-basic-default-markers`,
        labelName: i18n.t("editor.inspect.setter_label.map.default_markers"),
        labelDesc: i18n.t("editor.inspect.setter_tips.map.default_markers"),
        attrName: "markers",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.ARRAY,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-basic-default-latitude-field-name`,
        labelName: i18n.t(
          "editor.inspect.setter_label.map.latitude_field_name",
        ),
        labelDesc: i18n.t("editor.inspect.setter_tips.map.latitude_field_name"),
        isSetterSingleRow: true,
        attrName: "latitudeFieldName",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-basic-default-longitude-field-name`,
        labelName: i18n.t(
          "editor.inspect.setter_label.map.longitude_field_name",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.map.longitude_field_name",
        ),
        isSetterSingleRow: true,
        attrName: "longitudeFieldName",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-basic-default-zoom`,
        labelName: i18n.t("editor.inspect.setter_label.map.zoom"),
        labelDesc: i18n.t("editor.inspect.setter_tips.map.zoom"),
        attrName: "zoom",
        expectedType: VALIDATION_TYPES.NUMBER,
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
          MAP_EVENT_HANDLER_CONFIG.events,
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
        shown: (value) => {
          return !value
        },
      },
      {
        id: `${baseWidgetName}-interaction-enableAddMark`,
        labelName: i18n.t("editor.inspect.setter_label.map.enable_add_markers"),
        labelDesc: i18n.t("editor.inspect.setter_tips.map.enable_add_markers"),
        attrName: "enableAddMark",
        placeholder: "{{true}}",
        useCustomLayout: true,
        openDynamic: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-interaction-enableSearch`,
        labelName: i18n.t(
          "editor.inspect.setter_label.map.enable_search_locati",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.map.enable_search_locati",
        ),
        attrName: "enableSearch",
        placeholder: "{{true}}",
        useCustomLayout: true,
        openDynamic: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-interaction-enableClustering`,
        labelName: i18n.t("editor.inspect.setter_label.map.enable_clustering"),
        labelDesc: i18n.t("editor.inspect.setter_tips.map.enable_clustering"),
        attrName: "enableClustering",
        placeholder: "{{false}}",
        useCustomLayout: true,
        openDynamic: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
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
]
