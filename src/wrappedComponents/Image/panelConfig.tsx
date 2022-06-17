import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"

export const IMAGE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "image-basic",
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: "image-basic-source",
        attrName: "fallbackSrc",
        expectedType: "String",
        labelName: i18n.t("editor.inspect.setter_label.image_source"),
        setterType: "INPUT_SETTER",
        defaultValue: "https://placekitten.com/400/300",
      },
      {
        id: "image-basic-alt-text",
        labelName: i18n.t("editor.inspect.setter_label.alt_text"),
        labelDesc: i18n.t("editor.inspect.setter_label.alt_text_desc"),
        expectedType: "String",
        attrName: "alt",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  // {
  //   id: "image-Interaction",
  //   groupName: i18n.t("editor.inspect.setter_group.interaction")
  //   children: [
  //     {
  //       id: "image-interaction-event",
  //       attrName: "events",
  //       setterType: "EVENT_HANDLER_SETTER",
  //       useCustomLabel: true,
  //       isFullWidth: true,
  //     },
  //   ],
  // },
  {
    id: "image-adornments",
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: "image-adornments-tooltip",
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        attrName: "tooltipText",
        expectedType: "String",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "image-layout",
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: "image-layout-height",
        labelName: i18n.t("editor.inspect.setter_label.img_height"),
        attrName: "height",
        expectedType: "String",
        setterType: "INPUT_SETTER",
      },
      {
        id: "image-layout-width",
        labelName: i18n.t("editor.inspect.setter_label.img_width"),
        attrName: "width",
        expectedType: "String",
        setterType: "INPUT_SETTER",
      },
      {
        id: "image-layout-hidden",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        attrName: "hidden",
        expectedType: "Boolean",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "image-style",
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: "image-style-radius",
        labelName: i18n.t("editor.inspect.setter_label.radius"),
        expectedType: "String",
        attrName: "radius",
        setterType: "INPUT_SETTER",
      },
    ],
  },
]
