import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalStartIcon,
} from "@illa-design/react"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"
import { STATISTICS_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/StatisticsWidget/eventHandlerConfig"

const baseWidgetName = "statistic"
export const STATISTICS_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-label-label`,
        labelName: i18n.t("editor.inspect.setter_label.statistics.label"),
        attrName: "label",
        setterType: "INPUT_SETTER",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-label-primaryValue`,
        labelName: i18n.t(
          "editor.inspect.setter_label.statistics.primary_value",
        ),
        attrName: "primaryValue",
        expectedType: VALIDATION_TYPES.NUMBER,
        isSetterSingleRow: true,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-label-secondaryValue`,
        labelName: i18n.t("editor.inspect.setter_label.statistics.secValue"),
        attrName: "secondaryValue",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.NUMBER,
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: `${baseWidgetName}-primaryValue`,
    groupName: i18n.t("editor.inspect.setter_group.primary_value"),
    children: [
      {
        id: `${baseWidgetName}-label-decimalPlace`,
        labelName: i18n.t("editor.inspect.setter_label.statistics.decimal"),
        attrName: "decimalPlace",
        setterType: "INPUT_SETTER",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.NUMBER,
        placeholder: i18n.t(
          "editor.inspect.setter_placeholder.statistics.decimal",
        ),
      },
      {
        id: `${baseWidgetName}-label-showTrendSign`,
        labelName: i18n.t("editor.inspect.setter_label.statistics.trend_sign"),
        attrName: "showTrendSign",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-label-positiveSign`,
        labelName: i18n.t(
          "editor.inspect.setter_label.statistics.positive_sign",
        ),
        attrName: "positiveSign",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "ICON_SETTER",
        bindAttrName: ["showTrendSign"],
        shown: (value) => value,
      },
      {
        id: `${baseWidgetName}-label-negativeSign`,
        labelName: i18n.t(
          "editor.inspect.setter_label.statistics.negative_sign",
        ),
        attrName: "negativeSign",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "ICON_SETTER",
        bindAttrName: ["showTrendSign"],
        shown: (value) => value,
      },
      {
        id: `${baseWidgetName}-label-showSeparator`,
        labelName: i18n.t(
          "editor.inspect.setter_label.statistics.thousand_separator",
        ),
        attrName: "showSeparator",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-label-enableTrendColor`,
        labelName: i18n.t("editor.inspect.setter_label.statistics.trend_color"),
        attrName: "enableTrendColor",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-label-prefixText`,
        labelName: i18n.t("editor.inspect.setter_label.statistics.prefix_text"),
        attrName: "prefixText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        placeholder: i18n.t(
          "editor.inspect.setter_placeholder.statistics.prefix_text",
        ),
      },
      {
        id: `${baseWidgetName}-label-suffixText`,
        labelName: i18n.t("editor.inspect.setter_label.statistics.suffix_text"),
        attrName: "suffixText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        placeholder: i18n.t(
          "editor.inspect.setter_placeholder.statistics.suffix_text",
        ),
      },
    ],
  },
  {
    id: `${baseWidgetName}-secondaryValue`,
    groupName: i18n.t("editor.inspect.setter_group.secondary_value"),
    children: [
      {
        id: `${baseWidgetName}-label-secondaryDecimalPlace`,
        labelName: i18n.t("editor.inspect.setter_label.statistics.decimal"),
        attrName: "secondaryDecimalPlace",
        setterType: "INPUT_SETTER",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.NUMBER,
        placeholder: i18n.t(
          "editor.inspect.setter_placeholder.statistics.decimal",
        ),
      },
      {
        id: `${baseWidgetName}-label-secondaryShowTrendSign`,
        labelName: i18n.t("editor.inspect.setter_label.statistics.trend_sign"),
        attrName: "secondaryShowTrendSign",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-label-secondaryPositiveSign`,
        labelName: i18n.t(
          "editor.inspect.setter_label.statistics.positive_sign",
        ),
        attrName: "secondaryPositiveSign",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "ICON_SETTER",
        bindAttrName: ["secondaryShowTrendSign"],
        shown: (value) => value,
      },
      {
        id: `${baseWidgetName}-label-secondaryNegativeSign`,
        labelName: i18n.t(
          "editor.inspect.setter_label.statistics.negative_sign",
        ),
        attrName: "secondaryNegativeSign",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "ICON_SETTER",
        bindAttrName: ["secondaryShowTrendSign"],
        shown: (value) => value,
      },
      {
        id: `${baseWidgetName}-label-secondaryShowSeparator`,
        labelName: i18n.t(
          "editor.inspect.setter_label.statistics.thousand_separator",
        ),
        attrName: "secondaryShowSeparator",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-label-secondaryEnableTrendColor`,
        labelName: i18n.t("editor.inspect.setter_label.statistics.trend_color"),
        attrName: "secondaryEnableTrendColor",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-label-secondaryPrefixText`,
        labelName: i18n.t("editor.inspect.setter_label.statistics.prefix_text"),
        attrName: "secondaryPrefixText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        placeholder: "US$",
      },
      {
        id: `${baseWidgetName}-label-secondarySuffixText`,
        labelName: i18n.t("editor.inspect.setter_label.statistics.suffix_text"),
        attrName: "secondarySuffixText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        placeholder: "%",
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
          STATISTICS_EVENT_HANDLER_CONFIG.events,
        ),
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
      {
        id: `${baseWidgetName}-basic-text-align`,
        labelName: i18n.t("editor.inspect.setter_label.label_alignment"),
        attrName: "textAlign",
        setterType: "RADIO_GROUP_SETTER",
        defaultValue: "start",
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
        ],
      },
    ],
  },
  {
    id: `${baseWidgetName}-style`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: `${baseWidgetName}-style-list`,
        setterType: "STYLE_CONTAINER_SETTER",
        isSetterSingleRow: true,
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-colorScheme`,
            labelName: i18n.t("editor.inspect.setter_label.theme_color"),
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            attrName: "colorScheme",
            defaultValue: "grayBlue",
          },
          {
            id: `${baseWidgetName}-style-positiveColorScheme`,
            labelName: i18n.t(
              "editor.inspect.setter_placeholder.statistics.positive_color",
            ),
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            attrName: "positiveColorScheme",
            defaultValue: "green",
          },
          {
            id: `${baseWidgetName}-style-negativeColorScheme`,
            labelName: i18n.t(
              "editor.inspect.setter_placeholder.statistics.negative_color",
            ),
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            attrName: "negativeColorScheme",
            defaultValue: "red",
          },
        ],
      },
    ],
  },
]
