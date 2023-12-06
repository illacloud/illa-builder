import { isCloudVersion } from "@illa-public/utils"
import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalStartIcon,
} from "@illa-design/react"
import RadioIcon from "@/assets/radius-icon.svg?react"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { IMAGE_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/ImageWidget/eventHandlerConfig"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"
import { ObjectFit } from "./interface"

const baseWidgetName = "input"
export const IMAGE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-basic-source-self-host`,
        attrName: "imageSrc",
        expectedType: VALIDATION_TYPES.STRING,
        labelName: i18n.t("editor.inspect.setter_label.image_source"),
        isSetterSingleRow: true,
        bindAttrName: [],
        shown: () => !isCloudVersion,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-basic-source-cloud-version`,
        attrName: "imageSrc",
        expectedType: VALIDATION_TYPES.STRING,
        labelName: i18n.t("editor.inspect.setter_label.image_source"),
        isSetterSingleRow: true,
        bindAttrName: [],
        shown: () => isCloudVersion,
        setterType: "DRIVE_SOURCE_GROUP_SETTER",
      },
      {
        id: `${baseWidgetName}-basic-alt-text`,
        labelName: i18n.t("editor.inspect.setter_label.alt_text"),
        labelDesc: i18n.t("editor.inspect.setter_label.alt_text_desc"),
        expectedType: VALIDATION_TYPES.STRING,
        attrName: "altText",
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
          IMAGE_EVENT_HANDLER_CONFIG.events,
        ),
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
        id: `${baseWidgetName}-layout-hidden`,
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        attrName: "hidden",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
      },
      {
        id: `${baseWidgetName}-layout-height`,
        labelName: i18n.t("editor.inspect.setter_label.height"),
        attrName: "dynamicHeight",
        setterType: "HEIGHT_MODE_SELECT",
        options: [
          {
            label: i18n.t("editor.inspect.setter_option.fixed"),
            value: "fixed",
          },
          {
            label: i18n.t("editor.inspect.setter_option.auto_height"),
            value: "auto",
          },
        ],
      },
      {
        id: `${baseWidgetName}-basic-aspect-ratio`,
        labelName: i18n.t("aspect-ratio"),
        attrName: "aspectRatio",
        bindAttrName: ["dynamicHeight"],
        shown: (dynamicHeight: "fixed" | "auto") => dynamicHeight === "auto",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${baseWidgetName}-basic-scale-type`,
        labelName: i18n.t("editor.inspect.setter_label.scale_type"),
        attrName: "objectFit",
        bindAttrName: ["dynamicHeight"],
        shown: (dynamicHeight: "fixed" | "auto") => dynamicHeight === "fixed",
        setterType: "SEARCH_SELECT_SETTER",
        options: ["cover", "contain"],
      },
      {
        id: `${baseWidgetName}-layout-col`,
        labelName: i18n.t("editor.inspect.setter_label.horizontal_alignment"),
        attrName: "horizontalAlign",
        bindAttrName: ["dynamicHeight", "objectFit"],
        shown: (dynamicHeight: "fixed" | "auto", objectFit: ObjectFit) =>
          dynamicHeight === "fixed" && objectFit !== "cover",
        setterType: "RADIO_GROUP_SETTER",
        isSetterSingleRow: true,
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
        id: `${baseWidgetName}-styles-list`,
        setterType: "STYLE_CONTAINER_SETTER",
        isSetterSingleRow: true,
        labelName: i18n.t("editor.inspect.setter_label.styles"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-radius`,
            labelName: i18n.t("editor.inspect.setter_label.radius"),
            setterType: "MEASURE_CHECK_INPUT_SETTER",
            useCustomLayout: true,
            attrName: "imageRadius",
            icon: <RadioIcon />,
            defaultValue: "0px",
            expectedType: VALIDATION_TYPES.STRING,
          },
        ],
      },
    ],
  },
]
