import { ReactComponent as RadioIcon } from "@/assets/radius-icon.svg"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  CAROUSEL_EVENT_HANDLER_CONFIG,
  generatorMappedCarouselEventHandlerConfig,
} from "@/widgetLibrary/CarouselWidget/eventHandlerConfig"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"

const baseWidgetName = "carousel"
export const CAROUSEL_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-options-mode`,
        attrName: "configureMode",
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
        id: `${baseWidgetName}-basic-options`,
        useCustomLayout: true,
        attrName: "manualData",
        setterType: "CAROUSEL_LIST_SETTER",
        bindAttrName: ["configureMode"],
        shown: (value) => !value || value === "static",
        childrenSetter: [
          {
            id: `${baseWidgetName}-options-label`,
            labelName: i18n.t("editor.inspect.setter_label.label"),
            attrName: "label",
            setterType: "INPUT_SETTER",
          },
          {
            id: `${baseWidgetName}-options-url`,
            labelName: i18n.t(
              "editor.inspect.setter_content.image_list.config.image_url",
            ),
            labelDesc: i18n.t("editor.inspect.setter_tips.img_url_array"),
            attrName: "url",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-options-alt`,
            labelName: i18n.t("editor.inspect.setter_label.alt_text"),
            labelDesc: i18n.t("editor.inspect.setter_label.alt_text_desc"),
            attrName: "alt",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-options-disabled`,
            labelName: i18n.t("editor.inspect.setter_label.disabled"),
            attrName: "disabled",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
          },
          {
            id: `${baseWidgetName}-options-hidden`,
            setterType: "DYNAMIC_SWITCH_SETTER",
            openDynamic: true,
            labelName: i18n.t("editor.inspect.setter_label.hidden"),
            labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
            useCustomLayout: true,
            attrName: "hidden",
            expectedType: VALIDATION_TYPES.BOOLEAN,
          },
          {
            ...generatorEventHandlerConfig(
              baseWidgetName,
              CAROUSEL_EVENT_HANDLER_CONFIG.events,
              i18n.t("editor.inspect.setter_label.event_handler"),
              "events",
            ),
          },
        ],
      },
      {
        id: `${baseWidgetName}-option-data-sources`,
        labelName: i18n.t("editor.inspect.setter_label.data_sources"),
        labelDesc: i18n.t("editor.inspect.setter_tips.carousel.data_source"),
        attrName: "dataSources",
        setterType: "INPUT_SETTER",
        bindAttrName: ["configureMode"],
        expectedType: VALIDATION_TYPES.ARRAY,
        shown: (value) => value === "dynamic",
        isSetterSingleRow: true,
      },
      {
        id: `${baseWidgetName}-options-mapped`,
        labelName: i18n.t("editor.inspect.setter_label.mapped_option"),
        useCustomLayout: true,
        attrName: "mappedData",
        setterType: "OPTION_MAPPED_SETTER",
        bindAttrName: ["configureMode"],
        shown: (value) => value === "dynamic",
        childrenSetter: [
          {
            id: `${baseWidgetName}-mappedOption-labels`,
            labelName: i18n.t("editor.inspect.setter_label.label"),
            attrName: "labels",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            placeholder: "{{item.label}}",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-urls`,
            labelName: i18n.t(
              "editor.inspect.setter_content.image_list.config.image_url",
            ),
            attrName: "urls",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            placeholder: "{{item.url}}",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-alts`,
            labelName: i18n.t("editor.inspect.setter_label.alt_text"),
            labelDesc: i18n.t("editor.inspect.setter_label.alt_text_desc"),
            placeholder: "{{item.alt}}",
            attrName: "alts",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-isHidden`,
            labelName: i18n.t("editor.inspect.setter_label.hidden"),
            attrName: "isHidden",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            placeholder: "{{false}}",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            ...generatorMappedCarouselEventHandlerConfig(
              baseWidgetName,
              CAROUSEL_EVENT_HANDLER_CONFIG.events,
              i18n.t("editor.inspect.setter_label.event_handler"),
              "events",
              undefined,
              i18n.t("editor.inspect.setter_tips.carousel_tips"),
            ),
          },
          {
            id: `${baseWidgetName}-mappedOption-disables`,
            labelName: i18n.t("editor.inspect.setter_label.disabled"),
            attrName: "disables",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            placeholder: "{{false}}",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
        ],
      },
      {
        id: `${baseWidgetName}-layout-auto-play`,
        setterType: "DYNAMIC_SWITCH_SETTER",
        openDynamic: true,
        labelName: i18n.t("editor.inspect.setter_label.auto_play"),
        useCustomLayout: true,
        attrName: "autoPlay",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-interaction-disabled`,
        labelName: i18n.t("editor.inspect.setter_label.interval"),
        placeholder: "{{3000}}",
        attrName: "interval",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
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
        id: `${baseWidgetName}-layout-show-dots`,
        setterType: "DYNAMIC_SWITCH_SETTER",
        openDynamic: true,
        labelName: i18n.t("editor.inspect.setter_label.show_dot"),
        useCustomLayout: true,
        attrName: "showDots",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-layout-show-arrows`,
        setterType: "DYNAMIC_SWITCH_SETTER",
        openDynamic: true,
        labelName: i18n.t("editor.inspect.setter_label.show_button"),
        useCustomLayout: true,
        attrName: "showArrows",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
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
        id: `${baseWidgetName}-styles-list`,
        setterType: "LIST_SETTER",
        isSetterSingleRow: true,
        labelName: i18n.t("editor.inspect.setter_label.styles"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-radius`,
            labelName: i18n.t("editor.inspect.setter_label.radius"),
            setterType: "EDITABLE_INPUT_WITH_MEASURE_SETTER",
            attrName: "radius",
            icon: <RadioIcon />,
            defaultValue: "0px",
            expectedType: VALIDATION_TYPES.STRING,
          },
        ],
      },
    ],
  },
]
