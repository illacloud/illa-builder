import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalFullIcon,
  HorizontalStartIcon,
} from "@illa-design/react"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import i18n from "@/i18n/config"

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
      },
    ],
  },
  {
    id: "button-interaction",
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        id: "button-interaction-type",
        labelName: i18n.t("editor.inspect.setter_label.type"),
        labelDesc: "xxxxx",
        attrName: "submit",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Default", value: false },
          { label: "Submit", value: true },
        ],
      },
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
