import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalStartIcon,
} from "@illa-design/react"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  MAIN_MENU_EVENT_HANDLER_CONFIG,
  MENU_EVENT_HANDLER_CONFIG,
} from "@/widgetLibrary/MenuWidget/eventHandlerConfig"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"

const baseWidgetName = "menu"

export const MENU_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-menu`,
    groupName: i18n.t("editor.inspect.setter_group.menu"),
    children: [
      {
        id: `${baseWidgetName}-options-mode`,
        attrName: "optionConfigureMode",
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
        id: `${baseWidgetName}-items`,
        useCustomLayout: true,
        attrName: "items",
        setterType: "MENU_OPTION_SETTER",
        bindAttrName: ["optionConfigureMode"],
        openDynamic: true,
        shown: (value) => !value || value === "static",
        childrenSetter: [
          {
            id: `${baseWidgetName}-menu-label`,
            labelName: i18n.t("editor.inspect.setter_label.label"),
            attrName: "label",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-menu-value`,
            labelName: i18n.t("editor.inspect.setter_label.value"),
            attrName: "value",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-menu-disabled`,
            labelName: i18n.t("editor.inspect.setter_label.disabled"),
            attrName: "disabled",
            setterType: "DYNAMIC_SWITCH_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
            openDynamic: true,
            useCustomLayout: true,
          },
          {
            id: `${baseWidgetName}-menu-hidden`,
            labelName: i18n.t("editor.inspect.setter_label.hidden"),
            attrName: "hidden",
            setterType: "DYNAMIC_SWITCH_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
            openDynamic: true,
            useCustomLayout: true,
          },
          {
            ...generatorEventHandlerConfig(
              baseWidgetName,
              MENU_EVENT_HANDLER_CONFIG.events,
            ),
          },
        ],
      },
      {
        id: `${baseWidgetName}-options-data-sources`,
        labelName: i18n.t("editor.inspect.setter_label.data_sources"),
        attrName: "dataSources",
        setterType: "INPUT_SETTER",
        bindAttrName: ["optionConfigureMode"],
        expectedType: VALIDATION_TYPES.ARRAY,
        shown: (value) => value === "dynamic",
        isSetterSingleRow: true,
      },
      {
        id: `${baseWidgetName}-options-mapped`,
        labelName: i18n.t("editor.inspect.setter_label.mapped_option"),
        useCustomLayout: true,
        attrName: "mappedOption",
        setterType: "OPTION_MAPPED_SETTER",
        bindAttrName: ["optionConfigureMode"],
        shown: (value) => value === "dynamic",
        childrenSetter: [
          {
            id: `${baseWidgetName}-mappedOption-labels`,
            labelName: i18n.t("editor.inspect.setter_label.label"),
            attrName: "labels",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            placeholder: "{{item}}",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-values`,
            labelName: i18n.t("editor.inspect.setter_label.value"),
            attrName: "values",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            placeholder: "{{item}}",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-disables`,
            labelName: i18n.t("editor.inspect.setter_label.disabled"),
            attrName: "disables",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            placeholder: "{{false}}",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-hidden`,
            labelName: i18n.t("editor.inspect.setter_label.hidden"),
            attrName: "hidden",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            placeholder: "{{false}}",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
          {
            id: `${baseWidgetName}-mappedOption-groupLabels`,
            labelName: i18n.t("editor.inspect.setter_label.menu.groupLabels"),
            attrName: "groupLabels",
            setterType: "OPTION_MAPPED_INPUT_SETTER",
            placeholder: "{{false}}",
            expectedType: VALIDATION_TYPES.ARRAY,
          },
        ],
      },
      {
        id: `${baseWidgetName}-options-default-value`,
        bindAttrName: ["optionConfigureMode"],
        labelName: i18n.t("editor.inspect.setter_label.default_value"),
        labelDesc: i18n.t(
          "editor.inspect.setter_tooltip.component_default_value",
        ),
        attrName: "selectedValues",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.ARRAY,
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
          MAIN_MENU_EVENT_HANDLER_CONFIG.events,
        ),
      },
    ],
  },
  {
    id: `${baseWidgetName}-adornments`,
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: `${baseWidgetName}-adornments-logo`,
        labelName: i18n.t("editor.inspect.setter_label.menu.logo"),
        labelDesc: i18n.t("editor.inspect.setter_tips.menu.logo"),
        setterType: "INPUT_SETTER",
        attrName: "menuLogo",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-adornments-title`,
        labelName: i18n.t("editor.inspect.setter_label.menu.title"),
        labelDesc: i18n.t("editor.inspect.setter_tips.menu.title"),
        setterType: "INPUT_SETTER",
        attrName: "menuTitle",
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
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-layout-direction`,
        labelName: i18n.t("editor.inspect.setter_label.direction"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.timeline_direction"),
        setterType: "RADIO_GROUP_SETTER",
        attrName: "mode",
        options: [
          { label: i18n.t("widget.timeline.vertical"), value: "vertical" },
          {
            label: i18n.t("widget.timeline.horizontal"),
            value: "horizontal",
          },
        ],
      },
      {
        id: `${baseWidgetName}-layout-align`,
        labelName: i18n.t("editor.inspect.setter_label.align"),
        attrName: "horizontalAlign",
        setterType: "RADIO_GROUP_SETTER",
        bindAttrName: ["mode"],
        shown: (mode) => mode === "horizontal",
        options: [
          {
            label: <HorizontalStartIcon />,
            value: "flex-start",
          },
          {
            label: <HorizontalCenterIcon />,
            value: "center",
          },
          {
            label: <HorizontalEndIcon />,
            value: "flex-end",
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
        id: `${baseWidgetName}-colors`,
        setterType: "STYLE_CONTAINER_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-colors-color`,
            labelName: i18n.t("editor.inspect.setter_label.theme_color"),
            attrName: "colorScheme",
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            defaultValue: "blue",
          },
          {
            id: `${baseWidgetName}-colors-hoverBackgroundColor`,
            labelName: i18n.t("editor.inspect.setter_label.hover_bg_color"),
            attrName: "hoverColorScheme",
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            defaultValue: "gray",
          },
          {
            id: `${baseWidgetName}-colors-backgroundColor`,
            labelName: i18n.t("editor.inspect.setter_label.background_color"),
            attrName: "bgColor",
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            defaultValue: "transparent",
          },
        ],
      },
    ],
  },
]
