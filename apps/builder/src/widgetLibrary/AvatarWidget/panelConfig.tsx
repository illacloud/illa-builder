import { HorizontalEndIcon, HorizontalStartIcon } from "@illa-design/react"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"
import { AVATAR_EVENT_HANDLER_CONFIG } from "./eventHandlerConfig"
import { AvatarType } from "./interface"

const baseWidgetName = "avatar"
export const AVATAR_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-label-avatar-type`,
        labelName: i18n.t("editor.inspect.setter_label.avatar_type"),
        attrName: "avatarType",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "DYNAMIC_SELECT_SETTER",
        isSetterSingleRow: true,
        useCustomLayout: true,
        openDynamic: true,
        defaultValue: "image",
        options: [
          {
            label: i18n.t(
              "editor.inspect.setter_label.avatar_type_options.image",
            ),
            value: "image",
          },
          {
            label: i18n.t(
              "editor.inspect.setter_label.avatar_type_options.icon",
            ),
            value: "icon",
          },
          {
            label: i18n.t(
              "editor.inspect.setter_label.avatar_type_options.text",
            ),
            value: "text",
          },
        ],
      },
      {
        id: `${baseWidgetName}-label-image`,
        labelName: i18n.t("editor.inspect.setter_label.imageSrc"),
        attrName: "imageSrc",
        isSetterSingleRow: true,
        bindAttrName: ["avatarType"],
        shown: (avatarType: AvatarType) => avatarType === "image",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-label-text`,
        labelName: i18n.t("editor.inspect.setter_label.text"),
        attrName: "text",
        bindAttrName: ["avatarType"],
        shown: (avatarType: AvatarType) => avatarType === "text",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-label-icon`,
        labelName: i18n.t("editor.inspect.setter_label.icon"),
        attrName: "icon",
        bindAttrName: ["avatarType"],
        shown: (avatarType: AvatarType) => avatarType === "icon",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "ICON_SETTER",
      },
    ],
  },
  {
    id: `${baseWidgetName}-label`,
    groupName: i18n.t("editor.inspect.setter_group.label"),
    children: [
      {
        id: `${baseWidgetName}-label-label`,
        labelName: i18n.t("editor.inspect.setter_label.label"),
        labelDesc: i18n.t("editor.inspect.setter_tips.slider.label"),
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-label-caption`,
        labelName: i18n.t("editor.inspect.setter_label.caption"),
        labelDesc: i18n.t("editor.inspect.setter_tips.slider.caption"),
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-label-hidden`,
        labelName: i18n.t("editor.inspect.setter_label.hidden_label"),
        labelDesc: i18n.t("editor.inspect.setter_tips.slider.hide_label"),
        attrName: "labelHidden",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-label-allow-wrapping`,
        labelName: i18n.t("editor.inspect.setter_label.slider.allow_wrapping"),
        labelDesc: i18n.t("editor.inspect.setter_tips.slider.allow_wrapping"),
        attrName: "allowWrap",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-label-position`,
        labelName: i18n.t("editor.inspect.setter_label.label_position"),
        labelDesc: i18n.t("editor.inspect.setter_tips.slider.position"),
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        bindAttrName: ["labelHidden"],
        shown: (value) => !value,
        options: [
          { label: i18n.t("widget.public.left"), value: "left" },
          { label: i18n.t("widget.public.right"), value: "right" },
        ],
      },
      {
        id: `${baseWidgetName}-label-alignment`,
        labelName: i18n.t("editor.inspect.setter_label.label_alignment"),
        labelDesc: i18n.t("editor.inspect.setter_tips.slider.alignment"),
        attrName: "labelAlign",
        setterType: "RADIO_GROUP_SETTER",
        bindAttrName: ["labelHidden"],
        shown: (value) => !value,
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
    id: `${baseWidgetName}-interaction`,
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        ...generatorEventHandlerConfig(
          baseWidgetName,
          AVATAR_EVENT_HANDLER_CONFIG.events,
        ),
      },
      {
        id: `${baseWidgetName}-interaction-disabled`,
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
    id: `${baseWidgetName}-layout`,
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: `${baseWidgetName}-adornments-tooltip`,
        labelName: i18n.t("editor.inspect.setter_label.avatar_size"),
        attrName: "avatarSize",
        setterType: "BASE_SELECT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        options: [
          {
            label: i18n.t("editor.inspect.setter_option.shadow.large"),
            value: "large",
          },
          {
            label: i18n.t("editor.inspect.setter_option.shadow.medium"),
            value: "medium",
          },
          {
            label: i18n.t("editor.inspect.setter_option.shadow.small"),
            value: "small",
          },
        ],
      },
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
            useCustomLayout: true,
            setterType: "CUSTOM_BG_SELECT_SETTER",
          },
        ],
      },
    ],
  },
]
