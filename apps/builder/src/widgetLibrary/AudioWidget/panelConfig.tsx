import { isCloudVersion } from "@illa-public/utils"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { AUDIO_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/AudioWidget/eventHandlerConfig"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"

const baseWidgetName = "audio"
export const AUDIO_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-basic-source-self-host`,
        attrName: "url",
        expectedType: VALIDATION_TYPES.STRING,
        labelName: i18n.t("editor.inspect.setter_label.audio.audio_url"),
        labelDesc: i18n.t("editor.inspect.setter_tips.audio.audio_url"),
        isSetterSingleRow: true,
        bindAttrName: [],
        shown: () => !isCloudVersion,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-basic-source-cloud-version`,
        attrName: "url",
        expectedType: VALIDATION_TYPES.STRING,
        labelName: i18n.t("editor.inspect.setter_label.audio.audio_url"),
        labelDesc: i18n.t("editor.inspect.setter_tips.audio.audio_url"),
        isSetterSingleRow: true,
        bindAttrName: [],
        shown: () => isCloudVersion,
        setterType: "DRIVE_SOURCE_GROUP_SETTER",
      },
      {
        id: `${baseWidgetName}-basic-autoPlay`,
        setterType: "DYNAMIC_SWITCH_SETTER",
        openDynamic: true,
        labelName: i18n.t("editor.inspect.setter_label.autoplay"),
        useCustomLayout: true,
        attrName: "autoPlay",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-basic-loop`,
        setterType: "DYNAMIC_SWITCH_SETTER",
        openDynamic: true,
        labelName: i18n.t("editor.inspect.setter_label.loop"),
        useCustomLayout: true,
        attrName: "loop",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-basic-mute`,
        setterType: "DYNAMIC_SWITCH_SETTER",
        openDynamic: true,
        labelName: i18n.t("editor.inspect.setter_label.mute"),
        useCustomLayout: true,
        attrName: "muted",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-basic-volume`,
        labelName: i18n.t("editor.inspect.setter_label.volume"),
        labelDesc: i18n.t("editor.inspect.setter_tootip.volume"),
        placeholder: "{{ 0.5 }}",
        attrName: "volume",
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
          AUDIO_EVENT_HANDLER_CONFIG.events,
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
]
